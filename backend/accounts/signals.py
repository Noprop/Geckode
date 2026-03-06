from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from .models import User

@receiver(pre_save, sender=User)
def delete_old_avatar_on_user_change(sender, instance: User, **kwargs) -> None:
    """
    Delete the old avatar file from storage when a new one is uploaded.
    """
    if not instance.pk:
        # New user, no previous avatar to delete
        return

    try:
        old_user = sender.objects.get(pk=instance.pk)
    except sender.DoesNotExist:
        return

    old_avatar = old_user.avatar
    new_avatar = instance.avatar

    # If avatar changed and old file exists, delete the old file
    if old_avatar and old_avatar != new_avatar:
        old_avatar.delete(save=False)

@receiver(post_delete, sender=User)
def delete_avatar_on_user_delete(sender, instance: User, **kwargs) -> None:
    """
    Delete avatar file from storage when the user is deleted.
    """
    avatar = instance.avatar
    if avatar:
        avatar.delete(save=False)