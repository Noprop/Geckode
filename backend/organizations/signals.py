from django.db.models.signals import pre_save, post_delete, post_save
from django.dispatch import receiver
from .models import Organization, OrganizationMember, OrganizationInvitation

@receiver(pre_save, sender=Organization)
def delete_old_thumbnail_on_organization_change(sender, instance: Organization, **kwargs) -> None:
    """
    Delete the old thumbnail file from storage when a new one is uploaded.
    """
    if not instance.pk:
        # New organization, no previous thumbnail to delete
        return

    try:
        old_organization = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        return

    old_thumbnail = old_organization.thumbnail
    new_thumbnail = instance.thumbnail

    # If thumbnail changed and old file exists, delete the old file
    if old_thumbnail and old_thumbnail != new_thumbnail:
        old_thumbnail.delete(save=False)


@receiver(pre_save, sender=Organization)
def clear_invitations_when_user_becomes_owner(sender, instance: Organization, **kwargs) -> None:
    """
    When a user becomes the owner of an organization, remove any outstanding
    invitations for that user in that organization.
    """
    if not instance.pk:
        # New organization, nothing to compare
        return

    try:
        old_organization = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        return

    # Owner changed; clear invitations for the new owner
    if old_organization.owner_id != instance.owner_id:
        OrganizationInvitation.objects.filter(
            organization=instance,
            invitee=instance.owner,
        ).delete()


@receiver(post_save, sender=OrganizationMember)
def clear_invitations_on_member_creation(sender, instance: OrganizationMember, created: bool, **kwargs) -> None:
    """
    When an organization member is created, remove any outstanding invitations
    for that user in that organization.
    """
    if not created:
        return

    OrganizationInvitation.objects.filter(
        organization=instance.organization,
        invitee=instance.member,
    ).delete()


@receiver(post_delete, sender=Organization)
def delete_thumbnail_on_organization_delete(sender, instance: Organization, **kwargs) -> None:
    """
    Delete thumbnail file from storage when the organization is deleted.
    """
    thumbnail = instance.thumbnail
    if thumbnail:
        thumbnail.delete(save=False)