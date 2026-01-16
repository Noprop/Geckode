from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, BooleanField, SerializerMethodField, ValidationError
from accounts.serializers import PublicUserSerializer
from django.utils import timezone
from .models import ProjectGroup, Project, ProjectCollaborator, OrganizationProject
from accounts.models import User
from organizations.serializers import PublicOrganizationSerializer

class ProjectGroupSerializer(ModelSerializer):
    owner = PublicUserSerializer(read_only=True)
    projects = PrimaryKeyRelatedField(many=True, queryset=Project.objects.all())

    class Meta:
        model = ProjectGroup
        fields = ['id', 'owner', 'created_at', 'name', 'projects']
        read_only_fields = ['created_at']

    def update(self, instance, validated_data):
        projects = validated_data.pop('projects', None)

        if projects is not None:
            for project in projects:
                serializer = ProjectSerializer(project, context=self.context)
                serializer.validate({'group': instance})

        instance = super().update(instance, validated_data)

        if projects is not None:
            Project.objects.filter(group=instance).exclude(id__in=[p.id for p in projects]).update(group=None)

            for project in projects:
                project.group = instance
                project.save()

        return instance

class ProjectSerializer(ModelSerializer):
    owner = PublicUserSerializer(read_only=True)
    is_published = BooleanField(write_only=True, required=False)
    fork_count = SerializerMethodField()
    permission = SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'owner', 'created_at', 'updated_at', 'name', 'description', 'published_at',
                    'is_published', 'fork_count', 'blocks', 'game_state', 'thumbnail', 'sprites', 'permission']
        read_only_fields = ['created_at', 'updated_at', 'published_at']

    def get_fork_count(self, instance):
        return instance.forked_by.count()

    def get_permission(self, instance):
        return instance.get_permission(self.context['request'].user)

    def to_representation(self, instance):
        data = super().to_representation(instance)

        view = self.context.get('view')
        action = view.action if view else None

        if action == 'list':
            for field in Project.PROJECT_STATE_FIELDS:
                data.pop(field, None)

        return data

    def update(self, instance, validated_data):
        is_published = validated_data.pop('is_published', None)

        instance = super().update(instance, validated_data)

        if is_published and instance.published_at is None:
            instance.published_at = timezone.now()
            instance.save(update_fields=['published_at'])
        elif not is_published and instance.published_at is not None:
            instance.published_at = None
            instance.save(update_fields=['published_at'])

        return instance

    def validate(self, attrs):
        group = attrs.get('group')
        owner = self.instance.owner if self.instance else self.context['request'].user

        if group and group.owner != owner:
            raise ValidationError('You can only assign your own projects to your own project groups.')

        return attrs

class ProjectCollaboratorSerializer(ModelSerializer):
    collaborator = PublicUserSerializer(read_only=True)
    collaborator_id = PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True, source='collaborator')

    class Meta:
        model = ProjectCollaborator
        fields = ['id', 'collaborator', 'collaborator_id', 'permission']

    def update(self, instance, validated_data):
        validated_data.pop('collaborator_id', None)
        return super().update(instance, validated_data)

class OrganizationProjectSerializer(ModelSerializer):
    project = ProjectSerializer(read_only=True)
    project_id = PrimaryKeyRelatedField(queryset=Project.objects.all(), write_only=True, source='project')

    class Meta:
        model = OrganizationProject
        fields = ['id', 'project', 'project_id', 'permission']

    def validate(self, attrs):
        try:
            if 'view' in self.context and hasattr(self.context['view'], 'kwargs'):
                if 'request' in self.context:
                    user = self.context['request'].user
                    project = Project.objects.get(id=self.context['view'].kwargs.get('pk'))

                    if not project.has_permission(user, attrs['permission']):
                        raise ValidationError({'permission': 'Cannot give an organization a higher permission class to the project than yourself.'})
        except Project.DoesNotExist:
            pass

        return attrs

    def update(self, instance, validated_data):
        validated_data.pop('project_id', None)
        return super().update(instance, validated_data)

class ProjectOrganizationSerializer(ModelSerializer):
    organization = PublicOrganizationSerializer(read_only=True)

    class Meta:
        model = OrganizationProject
        fields = ['id', 'organization', 'permission']