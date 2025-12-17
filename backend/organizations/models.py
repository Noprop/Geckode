from django.db.models import Model, ImageField, DateTimeField, ForeignKey, PROTECT, SlugField, CharField, TextField, ManyToManyField, BooleanField, CASCADE, SET_NULL
from accounts.models import User
from rest_framework.exceptions import ValidationError
from utils.permissions import create_permissions_allowed_hierarchy
import string
import random

def org_thumbnail_path(_instance, filename : str):
    characters = string.ascii_letters + string.digits + string.punctuation
    random_string = ''.join(random.choices(characters, k=20))
    file_ext = filename.split('.')[-1]
    return f"org-thumbnails/{random_string}.{file_ext}"

class Organization(Model):
    PERMISSION_CHOICES = [
        ('view', 'Can view projects'),
        ('contribute', 'Can contribute projects'),
        ('invite', 'Can invite members'),
        ('manage', 'Can remove members'),
        ('admin', 'Can modify details'),
    ]

    created_at = DateTimeField(auto_now_add=True)
    owner = ForeignKey(User, on_delete=PROTECT)
    slug = SlugField(max_length=100, unique=True)
    name = CharField(max_length=200)
    description = TextField(blank=True)
    is_public = BooleanField(blank=True, default=False)
    members = ManyToManyField(User, through='OrganizationMember', through_fields=('organization', 'member'), related_name='organizations')
    default_member_permission = CharField(max_length=10, choices=PERMISSION_CHOICES, default=PERMISSION_CHOICES[0][0])
    project_containment = BooleanField(blank=True, default=False)
    thumbnail = ImageField(upload_to=org_thumbnail_path, blank=True, null=True)

    def has_permission(self, user : User, required_permission : str) -> bool:
        if user == self.owner:
            return True
        if self.is_user_banned(user):
            return False

        return OrganizationMember.objects.filter(
            organization=self,
            member=user,
            permission__in=create_permissions_allowed_hierarchy(self.PERMISSION_CHOICES).get(required_permission, [])
        ).exists()

    def has_member(self, user : User, include_owner=True) -> bool:
        if include_owner and user == self.owner:
            return True
        if self.is_user_banned(user):
            return False
        return self.members.filter(pk=user.pk).exists()

    def add_member(self, user : User, permission : str | None = None, invited_by : User | None = None) -> None:
        if not permission:
            permission = self.default_member_permission

        if self.is_user_banned(user):
            raise ValidationError("Cannot add a banned user to organization.")

        OrganizationMember.objects.create(
            organization=self,
            member=user,
            invited_by=invited_by,
            permission=permission,
        )

        OrganizationInvitation.objects.filter(
            organization=self,
            invitee=user,
        ).delete()

    def ban_user(self, user : User, banned_by : User | None, days : int | None =None, reason : str | None = None) -> OrganizationBannedMember:
        return OrganizationBannedMember.objects.create(
            organization=self,
            user=user,
            banned_by=banned_by,
            ban_reason=reason,
        )

    def is_user_banned(self, user : User) -> bool:
        return OrganizationBannedMember.objects.filter(
            organization=self,
            user=user
        ).exists()

class OrganizationMember(Model):
    organization = ForeignKey(Organization, related_name='organization_members', on_delete=CASCADE)
    member = ForeignKey(User, related_name='organization_members', on_delete=CASCADE)
    joined_at = DateTimeField(auto_now_add=True)
    invited_by = ForeignKey(User, related_name='inviter_organization_members', null=True, on_delete=SET_NULL)
    permission = CharField(max_length=10, choices=Organization.PERMISSION_CHOICES)

    class Meta:
        unique_together = ('organization', 'member')
    

class OrganizationInvitation(Model):
    invited_at = DateTimeField(auto_now_add=True)
    organization = ForeignKey(Organization, related_name='invitations', on_delete=CASCADE)
    invitee = ForeignKey(User, related_name='invitee_organization_invitations', on_delete=CASCADE)
    inviter = ForeignKey(User, related_name='inviter_organization_invitations', on_delete=CASCADE)
    permission = CharField(max_length=10, choices=Organization.PERMISSION_CHOICES)

    class Meta:
        unique_together = ('organization', 'invitee', 'inviter')

    def has_permission(self, user, required_permission):
        return self.organization.has_permission(user, required_permission)

class OrganizationBannedMember(Model):
    organization = ForeignKey(Organization, related_name='banned_users', on_delete=CASCADE)
    user = ForeignKey(User, related_name='banned_from', on_delete=CASCADE)
    banned_by = ForeignKey(User, related_name='has_banned', null=True, on_delete=SET_NULL)
    banned_at = DateTimeField(auto_now_add=True)
    ban_reason = TextField(blank=True)

    class Meta:
        ordering = ["-banned_at"] # newest first