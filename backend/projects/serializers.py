from rest_framework.serializers import ModelSerializer, ImageField, PrimaryKeyRelatedField, BooleanField, SerializerMethodField, ValidationError
from accounts.serializers import PublicUserSerializer
from django.utils import timezone
from .models import ProjectGroup, Project, ProjectCollaborator, OrganizationProject, ProjectInvitation, Asset
from accounts.models import User
from organizations.serializers import PublicOrganizationSerializer
import base64

# confirm provided string is a base64-encoded file
def is_base64(s : str) -> bool:
    try:
        # If it’s a data URL, strip the prefix
        if s.startswith("data:"):
            s = s.split(",", 1)[1]

        base64.b64decode(s, validate=True)
        return True
    except:
        return False

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
    asset_count = SerializerMethodField()
    permission = SerializerMethodField()

    class Meta:
        model = Project
        fields = ['id', 'owner', 'created_at', 'updated_at', 'name', 'description', 'published_at',
                    'is_published', 'fork_count', 'asset_count', 'thumbnail', 'permission', 'yjs_blob']
        read_only_fields = ['created_at', 'updated_at', 'published_at']

    def get_fork_count(self, instance):
        return instance.forked_by.count()
    
    def get_asset_count(self, instance : Project) -> int:
        return Asset.objects.filter(project=instance).count()

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

        # Handle yjs_blob explicitly so we can accept base64-encoded strings
        # coming from JSON (e.g. frontend or Postman), and store real bytes
        # in the BinaryField. In some cases DRF may not include the field in
        # validated_data, so we also look at initial_data (raw request data).
        raw_yjs_blob = getattr(self, "initial_data", {}).get("yjs_blob", None)
        yjs_blob = validated_data.pop("yjs_blob", raw_yjs_blob)

        if yjs_blob is not None:
            # If the incoming value is a string, treat it as base64
            if isinstance(yjs_blob, str):
                try:
                    instance.yjs_blob = base64.b64decode(yjs_blob)
                except Exception:
                    raise ValidationError({"yjs_blob": "Invalid base64-encoded yjs_blob."})
            else:
                # Allow passing raw bytes (e.g. from non-JSON clients)
                instance.yjs_blob = yjs_blob

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


class ProjectInvitationSerializer(ModelSerializer):
    invitee = PublicUserSerializer(read_only=True)
    invitee_id = PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True, source='invitee')
    inviter = PublicUserSerializer(read_only=True)

    class Meta:
        model = ProjectInvitation
        fields = ['id', 'invited_at', 'invitee', 'invitee_id', 'inviter', 'permission']
        read_only_fields = ['invited_at']

    def validate(self, attrs : dict[str, any]) -> dict[str, any]:
        try:
            if 'view' in self.context and hasattr(self.context['view'], 'kwargs'):
                project = Project.objects.get(id=self.context['view'].kwargs.get('project_pk'))

                if project.has_member(attrs['invitee']):
                    raise ValidationError('Cannot invite an already-existing member to the project.')

                if 'request' in self.context:
                    user = self.context['request'].user

                    if not project.has_permission(user, attrs['permission']):
                        raise ValidationError('Cannot give an invited member a higher permission class.')
        except Project.DoesNotExist:
            pass

        return attrs

class AssetSerializer(ModelSerializer):
    asset_file = ImageField(write_only=True, allow_null=True, required=False)

    class Meta:
        model = Asset
        fields = ["id", "name", "asset", "asset_file", "asset_type"]

    def get_permission(self, instance):
        return instance.get_permission(self.context['request'].user)
    
    # convert image to base64
    def create(self, validated_data):
        if (validated_data.get("asset") and validated_data.get("asset_file")):
            raise ValidationError("Either submit a file object in the 'asset_file' field or a base64 image string in the 'asset' field. Not both!")
        
        # convert image file to base64
        elif (validated_data.get("asset_file")):
            image = validated_data.pop("asset_file")
            encoded = "data:image/png;base64," + base64.b64encode(image.read()).decode()

            return Asset.objects.create(
                asset=encoded,
                **validated_data
            )
        
        # verify the provided string is a base64 file, assign to asset
        elif (validated_data.get("asset")):
            file_data : str = validated_data.pop("asset")
            
            if (file_data.startswith("data:image/png;base64,") and is_base64(file_data[22:])):
                return Asset.objects.create(
                    asset=file_data,
                    **validated_data
                )
            
            else: raise ValidationError("Provided 'asset' is not a base64 string!")

        else:
            raise ValidationError("Either 'asset_file' or 'asset' needed!")

    
    def update(self, instance : Asset, validated_data):
        if (validated_data.get("asset") and validated_data.get("asset_file")):
            raise ValidationError("Either submit a file object in the 'asset_file' field or a base64 image string in the 'asset' field. Not both!")
        
        # convert image file to base64
        elif (validated_data.get("asset_file")):
            image = validated_data.pop("asset_file")
            instance.asset = "data:image/png;base64," + base64.b64encode(image.read()).decode()
         
        # verify the provided string is a base64 file, assign to asset
        elif (validated_data.get("asset")):
            file_data : str = validated_data.pop("asset")

            if (file_data.startswith("data:image/png;base64,") and is_base64(file_data[22:])):
                instance.asset = file_data
            
            else: raise ValidationError("Provided 'asset' is not a base64 string!")

        else:
            raise ValidationError("Either 'asset_file' or 'asset' needed!")
            
        return super().update(instance, validated_data)
    
    def validate(self, attrs):
        try:
            if 'view' in self.context and hasattr(self.context['view'], 'kwargs'):
                if 'request' in self.context:
                    user = self.context['request'].user
                    asset = Asset.objects.get(id=self.context['view'].kwargs.get('pk'))

                    if (asset.project == None):
                        raise ValidationError({'permission': 'Cannot modify public assets!'})
                    
                    if not asset.has_permission(user, 'code'):
                        raise ValidationError({'permission': 'You do not have permission to perform this action'})
        except Asset.DoesNotExist:
            pass

        return attrs