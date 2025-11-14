from django.db.models import Model, ImageField, ForeignKey, CASCADE, DateTimeField, CharField, TextField, SET_NULL, ManyToManyField, JSONField
from accounts.models import User
from organizations.models import Organization
from utils.permissions import create_permissions_allowed_hierarchy
import random
import string

def project_thumbnail_path(_instance, filename):
    characters = string.ascii_letters + string.digits + string.punctuation
    random_string = ''.join(random.choices(characters, k=20))
    file_ext = filename.split('.')[-1]
    return f"proj-thumbnails/{random_string}.{file_ext}"

class ProjectGroup(Model):
    owner = ForeignKey(User, related_name='project_groups', on_delete=CASCADE)
    created_at = DateTimeField(auto_now_add=True)
    name = CharField(max_length=200)

class Project(Model):
    PERMISSION_CHOICES = [
        ('view', 'Can view'),
        ('code', 'Can modify code'),
        ('invite', 'Can invite and code'),
        ('admin', 'Can change project details'),
    ]

    owner = ForeignKey(User, related_name='projects', on_delete=CASCADE)
    group = ForeignKey(ProjectGroup, related_name='projects', null=True, blank=True, on_delete=SET_NULL)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    name = CharField(max_length=200)
    description = TextField(blank=True)
    collaborators = ManyToManyField(User, through='ProjectCollaborator', related_name='shared_projects')
    organizations = ManyToManyField(Organization, through='OrganizationProject', related_name='projects')
    published_at = DateTimeField(null=True, blank=True)
    forked_by = ManyToManyField(User, related_name='forked_projects', blank=True)
    blocks = JSONField(default=dict, blank=True)
    game_state = JSONField(default=dict, blank=True)
    thumbnail = ImageField(upload_to=project_thumbnail_path, blank=True, null=True)

    def has_permission(self, user, required_permission, published_gives_permission=True):
        if user == self.owner:
            return True

        permissions_allowed = create_permissions_allowed_hierarchy(self.PERMISSION_CHOICES)

        return (published_gives_permission and self.published_at is not None) or ProjectCollaborator.objects.filter(
            project=self,
            collaborator=user,
            permission__in=permissions_allowed.get(required_permission, [])
        ).exists() or Organization.objects.filter(
            projects=self,
            organization_projects__permission__in=permissions_allowed.get(required_permission, []),
            members=user
        ).exists()

class ProjectCollaborator(Model):
    project = ForeignKey(Project, related_name='project_collaborators', on_delete=CASCADE)
    collaborator = ForeignKey(User, related_name='project_collaborators', on_delete=CASCADE)
    permission = CharField(max_length=10, choices=Project.PERMISSION_CHOICES)

    class Meta:
        unique_together = ('project', 'collaborator')

    def has_permission(self, user, required_permission):
        return self.project.has_permission(user, required_permission)

class OrganizationProject(Model):
    organization = ForeignKey(Organization, related_name='organization_projects', on_delete=CASCADE)
    project = ForeignKey(Project, related_name='organization_projects', on_delete=CASCADE)
    permission = CharField(max_length=10, choices=Project.PERMISSION_CHOICES)

    class Meta:
        unique_together = ('organization', 'project')

    def has_permission(self, user, required_permission):
        return self.project.has_permission(user, required_permission)