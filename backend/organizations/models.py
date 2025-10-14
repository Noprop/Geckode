from django.db.models import Model, DateTimeField, ForeignKey, PROTECT, SlugField, CharField, TextField, ManyToManyField, CASCADE, SET_NULL
from accounts.models import User

class Organization(Model):
    created_at = DateTimeField(auto_now_add=True)
    owner = ForeignKey(User, on_delete=PROTECT)
    slug = SlugField(max_length=100, unique=True)
    name = CharField(max_length=200)
    description = TextField(blank=True)
    members = ManyToManyField(User, through='OrganizationMember', through_fields=('organization', 'member'), related_name='organizations')

    def has_permission(self, user, required_permission):
        if user == self.owner:
            return True

        try:
            user_permission = OrganizationMember.objects.get(organization=self, member=user).permission
        except OrganizationMember.DoesNotExist:
            return False

        permission_index = lambda x : next((i for i, (permission, _) in enumerate(OrganizationMember.PERMISSION_CHOICES) if permission == x), -1)

        try:
            return permission_index(required_permission) <= permission_index(user_permission)
        except ValueError:
            return False

    def has_member(self, user, include_owner=True):
        if include_owner and user == self.owner:
            return True
        return self.members.filter(pk=user.pk).exists()

class OrganizationMember(Model):
    PERMISSION_CHOICES = [
        ('view', 'Can view projects'),
        ('contribute', 'Can contribute projects'),
        ('invite', 'Can invite members'),
        ('manage', 'Can remove members'),
        ('admin', 'Can modify details'),
    ]

    organization = ForeignKey(Organization, on_delete=CASCADE)
    member = ForeignKey(User, related_name='joined_organizations', on_delete=CASCADE)
    invited_by = ForeignKey(User, related_name='organization_inviters', null=True, on_delete=SET_NULL)
    permission = CharField(max_length=10, choices=PERMISSION_CHOICES)

    class Meta:
        unique_together = ('organization', 'member')

class OrganizationInvitation(Model):
    invited_at = DateTimeField(auto_now_add=True)
    organization = ForeignKey(Organization, on_delete=CASCADE)
    invitee = ForeignKey(User, related_name='invitee_organizations', on_delete=CASCADE)
    inviter = ForeignKey(User, related_name='inviter_organizations', on_delete=CASCADE)
    permission = CharField(max_length=10, choices=OrganizationMember.PERMISSION_CHOICES)

    class Meta:
        unique_together = ('organization', 'invitee', 'inviter')