from rest_framework.serializers import CharField, ModelSerializer, ValidationError, SerializerMethodField
from django.contrib.auth.password_validation import validate_password
from .models import User
from rest_framework.views import APIView
from projects.models import ProjectInvitation, Project
from organizations.models import OrganizationInvitation, Organization

# for listing pending invitations to users (located here to prevent cyclic import errors)
class OrganizationLiteSerializer(ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'name', 'slug', 'thumbnail']

class ProjectLiteSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'thumbnail']

class OrgInviteListSerializer(ModelSerializer):  
    organization = OrganizationLiteSerializer(read_only=True)

    class Meta:
        model = OrganizationInvitation
        fields = ['id', 'organization', 'inviter', 'permission', 'invitee']
        
    # invitee is already known, remove it
    def to_representation(self, instance: OrganizationInvitation):
        representation = super().to_representation(instance)
        representation.pop("invitee")
        return representation

class PrjInviteListSerializer(ModelSerializer):
    project = ProjectLiteSerializer(read_only=True)
    class Meta:
        model = ProjectInvitation
        fields = ['id', 'project', 'inviter', 'permission', 'invitee']
    
    # invitee is already known, remove it
    def to_representation(self, instance: OrganizationInvitation):
        representation = super().to_representation(instance)
        representation.pop("invitee")
        return representation


class UserSerializer(ModelSerializer):
    password = CharField(write_only=True, required=False, validators=[validate_password])
    password2 = CharField(write_only=True, required=False)
    organization_invitations = SerializerMethodField(read_only=True)
    project_invitations = SerializerMethodField(read_only=True)

    # get all invitations directed
    def get_organization_invitations(self, instance : User):
        return OrgInviteListSerializer(
            OrganizationInvitation.objects.filter(invitee__id=instance.pk).distinct(),
            many=True
        ).data

    def get_project_invitations(self, instance : User):
        return PrjInviteListSerializer(
            ProjectInvitation.objects.filter(invitee__id=instance.pk).distinct(),
            many=True
        ).data


    class Meta:
        model = User
        fields = ['id', 'created_at', 'username', 'email', 'first_name', 'last_name',
                  'password', 'password2', 'is_staff', 'is_superuser', 'avatar', 'organization_invitations', 'project_invitations'
                 ]
        read_only_fields = ['created_at', 'is_staff', 'is_superuser']

    def validate(self, attrs : dict[str, any]) -> dict[str, any]:
        view = self.context.get('view')
        action : str|None = view.action if view else None

        if action == 'create' and 'password' not in attrs:
            raise ValidationError({'password': 'A password is required.'})

        if 'password' in attrs:
            if not 'password2' in attrs:
                raise ValidationError({'password': 'The re-typed password is required.'})

            if attrs['password'] != attrs['password2']:
                raise ValidationError({'password2': 'Passwords must match.'})

        return attrs

    def to_representation(self, instance : User) -> dict:
        data : dict = super().to_representation(instance)

        view : APIView = self.context.get('view')
        action : str|None = view.action if view else None

        if action in ['retrieve', 'list'] and instance != self.context.get('request').user:
            data.pop('created_at', None)
            data.pop('email', None)
            data.pop('is_staff', None)
            data.pop('is_superuser', None)

        return data

    def create(self, validated_data : dict[str,any]) -> User:
        validated_data.pop('password2', None)

        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            avatar=validated_data.get('avatar', ''),
        )

    def update(self, instance, validated_data : dict[str, any]) -> User:
        validated_data.pop('username', None)
        return super().update(instance, validated_data)

class PublicUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'avatar']