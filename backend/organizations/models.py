from django.db.models import Model, DateTimeField, ForeignKey, PROTECT, SlugField, CharField, TextField, ManyToManyField, CASCADE, SET_NULL
from accounts.models import User

class Organization(Model):
    created_at = DateTimeField(auto_now_add=True)
    owner = ForeignKey(User, on_delete=PROTECT)
    slug = SlugField(max_length=100, unique=True)
    name = CharField(max_length=200)
    description = TextField(blank=True)
    members = ManyToManyField(User, through='OrganizationPermission', through_fields=('organization', 'user'), related_name='organizations')

    def has_permission(self, user, required_permission):
        if user == self.owner:
            return True

        try:
            user_permission = OrganizationPermission.objects.get(organization=self, user=user).permission
        except OrganizationPermission.DoesNotExist:
            return False

        permission_index = lambda x : next((i for i, (permission, _) in enumerate(OrganizationPermission.PERMISSION_CHOICES) if permission == x), -1)

        try:
            return permission_index(required_permission) <= permission_index(user_permission)
        except ValueError:
            return False

class OrganizationPermission(Model):
    PERMISSION_CHOICES = [
        ('view', 'Can view projects'),
        ('contribute', 'Can contribute projects'),
        ('invite', 'Can invite members'),
        ('manage', 'Can remove members'),
        ('admin', 'Can modify details'),
    ]

    organization = ForeignKey(Organization, on_delete=CASCADE)
    user = ForeignKey(User, related_name='joined_organizations', on_delete=CASCADE)
    invited_by = ForeignKey(User, related_name='organization_inviters', null=True, on_delete=SET_NULL)
    permission = CharField(max_length=10, choices=PERMISSION_CHOICES)

    class Meta:
        unique_together = ('organization', 'user')

class OrganizationInvitation(Model):
    invited_at = DateTimeField(auto_now_add=True)
    organization = ForeignKey(Organization, on_delete=CASCADE)
    invitee = ForeignKey(User, related_name='invitee_organizations', on_delete=CASCADE)
    inviter = ForeignKey(User, related_name='inviter_organizations', on_delete=CASCADE)
    permission = CharField(max_length=10, choices=OrganizationPermission.PERMISSION_CHOICES)

    class Meta:
        unique_together = ('organization', 'invitee', 'inviter')