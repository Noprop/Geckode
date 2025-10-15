from django.db.models import Model, ForeignKey, CASCADE, DateTimeField, CharField, TextField, SET_NULL, ManyToManyField, JSONField
from accounts.models import User
from organizations.models import Organization

class ProjectGroup(Model):
    owner = ForeignKey(User, related_name='project_groups', on_delete=CASCADE)
    created_at = DateTimeField(auto_now_add=True)
    name = CharField(max_length=200)

class Project(Model):
    owner = ForeignKey(User, related_name='projects', on_delete=CASCADE)
    group = ForeignKey(ProjectGroup, related_name='projects', null=True, blank=True, default=None, on_delete=SET_NULL)
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    name = CharField(max_length=200)
    description = TextField(blank=True)
    shared_users = ManyToManyField(User, through='ProjectCollaborator', related_name='shared_projects')
    shared_organizations = ManyToManyField(Organization, related_name='projects', blank=True)
    published_at = DateTimeField(null=True, blank=True)
    blocks = JSONField(default=dict, blank=True)

    def has_permission(self, user, required_permission):
        if user == self.owner:
            return True

        permissions_allowed = {
            choice[0]: [choice[0] for choice in ProjectCollaborator.PERMISSION_CHOICES[i:]]
            for i, choice in enumerate(ProjectCollaborator.PERMISSION_CHOICES)
        }

        return ProjectCollaborator.objects.filter(
            project=self,
            collaborator=user,
            permission__in=permissions_allowed.get(required_permission, [])
        ).exists() or (required_permission == 'view' and Organization.objects.filter(
            projects=self,
            members=user
        ).exists())

class ProjectCollaborator(Model):
    PERMISSION_CHOICES = [
        ('view', 'Can view'),
        ('edit', 'Can modify code'),
        ('invite', 'Can invite and code'),
        ('admin', 'Can change project details'),
    ]

    project = ForeignKey(Project, related_name='collaborators', on_delete=CASCADE)
    collaborator = ForeignKey(User, related_name='collaborator_projects', on_delete=CASCADE)
    permission = CharField(max_length=10, choices=PERMISSION_CHOICES)

    class Meta:
        unique_together = ('project', 'collaborator')