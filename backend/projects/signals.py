import base64
import json
from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from redis import Redis
from accounts.models import User
from .models import OrganizationProject, Project, ProjectCollaborator, ProjectShareLink
from .serializers import ProjectCollaboratorSerializer, ProjectOrganizationSerializer, ProjectShareLinkSerializer

### Thumbnail deletion signals

@receiver(pre_save, sender=Project)
def delete_old_thumbnail_on_project_change(sender, instance: Project, **kwargs) -> None:
    """
    Delete the old thumbnail file from storage when a new one is uploaded.
    """
    if not instance.pk:
        # New project, no previous thumbnail to delete
        return

    try:
        old_project = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        return

    old_thumbnail = old_project.thumbnail
    new_thumbnail = instance.thumbnail

    # If thumbnail changed and old file exists, delete the old file
    if old_thumbnail and old_thumbnail != new_thumbnail:
        old_thumbnail.delete(save=False)

@receiver(post_delete, sender=Project)
def delete_thumbnail_on_project_delete(sender, instance: Project, **kwargs) -> None:
    """
    Delete thumbnail file from storage when the project is deleted.
    """
    thumbnail = instance.thumbnail
    if thumbnail:
        thumbnail.delete(save=False)

### Yjs project update signals

redis_client = Redis(host="localhost", port=6379, db=0)
CLIENT_MAP_PREFIX = "yjs:clients"
PROJECT_UPDATE_CHANNEL = "yjs:project_updates"
PROJECT_COLLABORATOR_UPDATE_CHANNEL = "yjs:project_collaborator_updates"
PROJECT_SHARE_LINK_UPDATE_CHANNEL = "yjs:project_share_link_updates"

def get_project_connected_users(project_id: int) -> list[int]:
    """
    Return a list of user IDs that currently have at least one client
    connected to the given document/project.
    """
    key = f"{CLIENT_MAP_PREFIX}:{project_id}"
    # Field names are user IDs; we don't need the client lists if we only care
    # about which users are present.
    user_id_bytes = redis_client.hkeys(key)
    print("users obtained from get_project_connected_users", [int(uid.decode("utf-8")) for uid in user_id_bytes])
    return [int(uid.decode("utf-8")) for uid in user_id_bytes]

@receiver(pre_save, sender=Project)
def store_previous_project_name(sender, instance: Project, **kwargs) -> None:
    """
    Cache the previous project name / yjs_blob / default_share_link on the instance
    so we can compare in post_save.
    """
    # New instances don't have a previous name
    if not instance.pk:
        return

    # If another part of the code explicitly wants to skip notifications, respect that
    if getattr(instance, "_skip_hocuspocus_notify", False):
        return

    try:
        previous = Project.objects.get(pk=instance.pk)
        instance._old_name = previous.name
        instance._old_yjs_blob = previous.yjs_blob
        instance._old_default_share_link_id = getattr(previous, "default_share_link_id", None)
    except Project.DoesNotExist:
        instance._old_name = None
        instance._old_yjs_blob = None
        instance._old_default_share_link_id = None

@receiver(post_save, sender=Project)
def publish_project_change(sender, instance: Project, created: bool, **kwargs) -> None:
    """
    When a project's name changes (and the change doesn't originate from Yjs),
    publish an update so the Hocuspocus server can update the in-memory Yjs doc.
    """

    old_name = getattr(instance, "_old_name", None)
    old_yjs_blob = getattr(instance, "_old_yjs_blob", None)
    old_default_share_link_id = getattr(instance, "_old_default_share_link_id", None)
    skip_hocuspocus_notify = getattr(instance, "_skip_hocuspocus_notify", False)

    # Skip new projects – only propagate updates to existing docs
    # Allow callers (like the Yjs sync worker) to bypass notifications entirely
    # If we couldn't determine the previous state, don't publish
    # No actual relevant change (name, yjs_blob, or default_share_link)
    if (
        created
        or skip_hocuspocus_notify
        or (
            old_name == instance.name
            and old_yjs_blob == instance.yjs_blob
            and old_default_share_link_id == getattr(instance, "default_share_link_id", None)
        )
    ):
        return

    try:
        encoded_blob: str | None
        if instance.yjs_blob is not None and old_yjs_blob != instance.yjs_blob:
            # Encode binary blob as base64 so it can be transported via JSON/Redis
            encoded_blob = base64.b64encode(instance.yjs_blob).decode("ascii")
        else:
            encoded_blob = None

        payload = {
            "project_id": instance.pk,
            "name": instance.name,
            "yjs_blob": encoded_blob,
        }

        # Only include default_share_link_id when it changed
        if old_default_share_link_id != getattr(instance, "default_share_link_id", None):
            payload["default_share_link_id"] = getattr(instance, "default_share_link_id", None)

        redis_client.publish(
            PROJECT_UPDATE_CHANNEL,
            json.dumps(payload),
        )
    except Exception as exc:
        print(
            "post_save(Project): error publishing name change for project "
            f"{instance.pk} to Redis: {exc}"
        )

def publish_project_collaborator_permission(
    instance: ProjectCollaborator,
    source: str,
    *,
    event: str,
    project_collaborator: dict | None = None,
) -> None:
    effective_permission = instance.project.get_permission(instance.collaborator)

    try:
        redis_client.publish(
            PROJECT_COLLABORATOR_UPDATE_CHANNEL,
            json.dumps(
                {
                    "project_id": instance.project_id,
                    "event": event,
                    "collaborator_id": instance.collaborator_id,
                    "permission": instance.permission,
                    "project_collaborator": project_collaborator,
                    "collaborators": {
                        instance.collaborator_id: effective_permission,
                    },
                }
            )
        )
    except Exception as exc:
        print(
            f"{source}(ProjectCollaborator): error publishing permission change for project collaborator "
            f"{instance.project_id} to Redis: {exc}"
        )

@receiver(post_save, sender=ProjectCollaborator)
def publish_project_collaborator_change(sender, instance: ProjectCollaborator, created: bool, **kwargs) -> None:
    publish_project_collaborator_permission(
        instance,
        "post_save",
        event="collaborator_added" if created else "collaborator_permission_updated",
        project_collaborator=ProjectCollaboratorSerializer(instance).data if created else None,
    )

@receiver(post_delete, sender=ProjectCollaborator)
def publish_project_collaborator_delete(sender, instance: ProjectCollaborator, **kwargs) -> None:
    publish_project_collaborator_permission(
        instance,
        "post_delete",
        event="collaborator_removed",
    )

def publish_organization_project_permission(
    instance: OrganizationProject,
    source: str,
    *,
    event: str,
    project_organization: dict | None = None,
) -> None:
    try:
        redis_client.publish(
            PROJECT_COLLABORATOR_UPDATE_CHANNEL,
            json.dumps(
                {
                    "project_id": instance.project_id,
                    "event": event,
                    "project_organization_id": instance.pk,
                    "organization_id": instance.organization_id,
                    "permission": instance.permission,
                    "project_organization": project_organization,
                    "collaborators": {
                        id: instance.project.get_permission(User.objects.get(pk=id))
                        for id in get_project_connected_users(instance.project_id)
                    }
                }
            )
        )
    except Exception as exc:
        print(
            f"{source}(ProjectOrganization): error publishing permission change for project/organization "
            f"{instance.project_id}/{instance.organization_id} to Redis: {exc}"
        )

@receiver(post_save, sender=OrganizationProject)
def publish_organization_project_change(sender, instance: OrganizationProject, created: bool, **kwargs) -> None:
    publish_organization_project_permission(
        instance,
        "post_save",
        event="organization_added" if created else "organization_permission_updated",
        project_organization=ProjectOrganizationSerializer(instance).data if created else None,
    )

@receiver(post_delete, sender=OrganizationProject)
def publish_organization_project_delete(sender, instance: OrganizationProject, **kwargs) -> None:
    publish_organization_project_permission(
        instance,
        "post_delete",
        event="organization_removed",
    )


def publish_project_share_link_change(
    instance: ProjectShareLink,
    source: str,
    *,
    event: str,
) -> None:
    """
    Publish share-link changes (create/update/delete) for a project.
    """
    try:
        redis_client.publish(
            PROJECT_SHARE_LINK_UPDATE_CHANNEL,
            json.dumps(
                {
                    "project_id": instance.project_id,
                    "event": event,
                    "share_link": ProjectShareLinkSerializer(instance).data if event != "share_link_deleted" else {
                        "id": instance.pk,
                        "project": instance.project_id,
                    },
                }
            ),
        )
    except Exception as exc:
        print(
            f"{source}(ProjectShareLink): error publishing change for project share link "
            f"{instance.project_id}/{instance.pk} to Redis: {exc}"
        )


@receiver(post_save, sender=ProjectShareLink)
def publish_project_share_link_save(sender, instance: ProjectShareLink, created: bool, **kwargs) -> None:
    publish_project_share_link_change(
        instance,
        "post_save",
        event="share_link_created" if created else "share_link_updated",
    )


@receiver(post_delete, sender=ProjectShareLink)
def publish_project_share_link_delete(sender, instance: ProjectShareLink, **kwargs) -> None:
    publish_project_share_link_change(
        instance,
        "post_delete",
        event="share_link_deleted",
    )
