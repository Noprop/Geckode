from rest_framework.serializers import ModelSerializer, SerializerMethodField, PrimaryKeyRelatedField, ValidationError
from accounts.models import User
from accounts.serializers import PublicUserSerializer
from .models import Organization, OrganizationInvitation, OrganizationMember, OrganizationBannedMember

class OrganizationSerializer(ModelSerializer):
    owner = PublicUserSerializer(read_only=True)
    members_count = SerializerMethodField()
    projects_count = SerializerMethodField()

    class Meta:
        model = Organization
        fields = ['id', 'created_at', 'owner', 'name', 'slug', 'description', 'is_public',
                  'default_member_permission', 'members_count', 'projects_count', 'thumbnail']
        read_only_fields = ['created_at']

    def get_members_count(self, instance):
        return instance.members.count()

    def get_projects_count(self, instance):
        return instance.projects.count()

class OrganizationInvitationSerializer(ModelSerializer):
    invitee = PublicUserSerializer(read_only=True)
    invitee_id = PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True, source='invitee')
    inviter = PublicUserSerializer(read_only=True)

    class Meta:
        model = OrganizationInvitation
        fields = ['id', 'invited_at', 'invitee', 'invitee_id', 'inviter', 'permission']
        read_only_fields = ['invited_at']

    def validate(self, attrs):
        try:
            if 'view' in self.context and hasattr(self.context['view'], 'kwargs'):
                organization = Organization.objects.get(id=self.context['view'].kwargs.get('organization_pk'))

                if organization.has_member(attrs['invitee']):
                    raise ValidationError('Cannot invite an already-existing member to the organization.')

                if 'request' in self.context:
                    user = self.context['request'].user

                    if not organization.has_permission(user, attrs['permission']):
                        raise ValidationError('Cannot give an invited member a higher permission class.')
        except Organization.DoesNotExist:
            pass

        return attrs

class OrganizationMemberSerializer(ModelSerializer):
    member = PublicUserSerializer(read_only=True)

    class Meta:
        model = OrganizationMember
        fields = ['member', 'invited_by', 'joined_at', 'permission']
        read_only_fields = ['invited_by', 'joined_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)

        if self.context.get('request'):
            user = self.context['request'].user

            if instance.member != user and not instance.organization.has_permission(user, 'manage'):
                data.pop('invited_by', None)
                data.pop('permission', None)

        return data

    def validate(self, attrs):
        try:
            if 'view' in self.context and hasattr(self.context['view'], 'kwargs'):
                organization = Organization.objects.get(id=self.context['view'].kwargs.get('organization_pk'))

                if 'request' in self.context:
                    user = self.context['request'].user

                    if not organization.has_permission(user, attrs['permission']):
                        raise ValidationError('You cannot give a member a higher permission class than yourself.')
        except Organization.DoesNotExist:
            pass

        return attrs

class OrganizationBannedMemberSerializer(ModelSerializer):
    user = PublicUserSerializer(read_only=True)
    user_id = PrimaryKeyRelatedField(queryset=User.objects.all(), write_only=True, source='user')
    banned_by = PublicUserSerializer(read_only=True)

    class Meta:
        model = OrganizationBannedMember
        fields = ['organization', 'user', 'user_id', 'banned_by', 'banned_at', 'ban_reason']
        read_only_fields = ['organization', 'user', 'banned_by', 'banned_at']
    
    def validate(self, attrs):
        try:
            if 'view' in self.context and hasattr(self.context['view'], 'kwargs'):
                organization = Organization.objects.get(id=self.context['view'].kwargs.get('organization_pk'))

                # can't ban organization admin
                if organization.has_permission(attrs['user'], 'admin'):
                    raise ValidationError('You cannot ban the organization admin.')
                
                # managers can't ban other manager
                if organization.has_permission(attrs['user'], 'manage') and organization.has_permission(self.context['request'].user, 'manage'):
                    raise ValidationError('Organization managers cannot ban other managers.')
                

        except Organization.DoesNotExist:
            pass
        
        return attrs