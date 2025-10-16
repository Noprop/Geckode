from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, Serializer, CharField, IntegerField, BooleanField, ChoiceField, SerializerMethodField, ValidationError
from accounts.serializers import PublicUserSerializer
from geckode.utils import create_order_by_choices, NullableBooleanField
from django.utils import timezone
from .models import ProjectGroup, Project, ProjectCollaborator
from accounts.fields import ReadNestedWriteIDUserField
from accounts.models import User

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

class ProjectSearchSerializer(Serializer):
    ORDER_BY_CHOICES = create_order_by_choices(['created_at', 'updated_at', 'name'])

    search = CharField(required=False)
    is_published = NullableBooleanField(required=False)
    owner = IntegerField(required=False)
    group = IntegerField(required=False)
    organization = IntegerField(required=False)
    order_by = ChoiceField(required=False, choices=ORDER_BY_CHOICES, default='-updated_at')

class ProjectSerializer(ModelSerializer):
    owner = PublicUserSerializer(read_only=True)
    is_published = BooleanField(write_only=True, required=False)
    fork_count = SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'owner', 'created_at', 'updated_at', 'name', 'description', 'shared_users',
                  'shared_organizations', 'published_at', 'is_published', 'fork_count', 'blocks',
                 ]
        read_only_fields = ['owner', 'created_at', 'updated_at', 'shared_users', 'published_at']

    def get_fork_count(self, instance):
        return instance.forked_by.count()

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['owner'] = PublicUserSerializer(instance.owner).data

        view = self.context.get('view')
        action = view.action if view else None

        if action == 'list':
            data.pop('shared_users', None)
            data.pop('shared_organizations', None)
            data.pop('blocks', None)

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
    collaborator = ReadNestedWriteIDUserField(queryset=User.objects.all())

    class Meta:
        model = ProjectCollaborator
        fields = ['project', 'collaborator', 'permission']
        read_only_fields = ['project', 'collaborator']

    def validate(self, attrs):
        try:
            if 'view' in self.context and hasattr(self.context['view'], 'kwargs'):
                project = Project.objects.get(id=self.context['view'].kwargs.get('project_pk'))

                if 'request' in self.context:
                    user = self.context['request'].user

                    if not user.is_superuser and not project.has_permission(user, 'admin'):
                        raise ValidationError('You do not have permission to perform this action.')
        except (Project.DoesNotExist, ProjectCollaborator.DoesNotExist):
            pass

        return attrs