from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from .models import Organization

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


@receiver(post_delete, sender=Organization)
def delete_thumbnail_on_organization_delete(sender, instance: Organization, **kwargs) -> None:
    """
    Delete thumbnail file from storage when the organization is deleted.
    """
    thumbnail = instance.thumbnail
    if thumbnail:
        thumbnail.delete(save=False)