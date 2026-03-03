import base64
import json
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from redis import Redis
from .models import Project

redis_client = Redis(host="localhost", port=6379, db=0)
PROJECT_UPDATE_CHANNEL = "yjs:project_updates"

@receiver(pre_save, sender=Project)
def store_previous_project_name(sender, instance: Project, **kwargs) -> None:
    """
    Cache the previous project name on the instance so we can compare it in post_save.
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
    except Project.DoesNotExist:
        instance._old_name = None
        instance._old_yjs_blob = None

@receiver(post_save, sender=Project)
def publish_project_change(sender, instance: Project, created: bool, **kwargs) -> None:
    """
    When a project's name changes (and the change doesn't originate from Yjs),
    publish an update so the Hocuspocus server can update the in-memory Yjs doc.
    """

    old_name = getattr(instance, "_old_name", None)
    old_yjs_blob = getattr(instance, "_old_yjs_blob", None)
    skip_hocuspocus_notify = getattr(instance, "_skip_hocuspocus_notify", False)

    # Skip new projects – only propagate updates to existing docs
    # Allow callers (like the Yjs sync worker) to bypass notifications entirely
    # If we couldn't determine the previous name, don't publish
    # No actual name change
    if created or skip_hocuspocus_notify or (old_name == instance.name and old_yjs_blob == instance.yjs_blob):
        return

    try:
        encoded_blob: str | None
        if instance.yjs_blob is not None and old_yjs_blob != instance.yjs_blob:
            # Encode binary blob as base64 so it can be transported via JSON/Redis
            encoded_blob = base64.b64encode(instance.yjs_blob).decode("ascii")
        else:
            encoded_blob = None

        payload = json.dumps(
            {
                "id": str(instance.pk),
                "name": instance.name,
                "yjs_blob": encoded_blob,
            }
        )

        redis_client.publish(PROJECT_UPDATE_CHANNEL, payload)
    except Exception as exc:  # pragma: no cover - defensive logging
        # Redis errors shouldn't break the main request flow
        print(
            "post_save(Project): error publishing name change for project "
            f"{instance.pk} to Redis: {exc}"
        )

