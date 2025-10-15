from rest_framework.serializers import ModelSerializer, SerializerMethodField, ValidationError
from accounts.fields import ReadNestedWriteIDUserField
from accounts.models import User
from accounts.serializers import PublicUserSerializer
from .models import Organization, OrganizationInvitation, OrganizationMember

class OrganizationSerializer(ModelSerializer):
    owner = PublicUserSerializer(read_only=True)
    members_count = SerializerMethodField()

    class Meta:
        model = Organization
        fields = ['id', 'created_at', 'owner', 'name', 'slug', 'description', 'members_count']
        read_only_fields = ['created_at']

    def get_members_count(self, instance):
        return instance.members.count()

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['owner'] = PublicUserSerializer(instance.owner).data
        return data

class OrganizationInvitationSerializer(ModelSerializer):
    invitee = ReadNestedWriteIDUserField(queryset=User.objects.all())
    inviter = PublicUserSerializer(read_only=True)

    class Meta:
        model = OrganizationInvitation
        fields = ['id', 'organization', 'invited_at', 'invitee', 'inviter', 'permission']
        read_only_fields = ['organization', 'invited_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['invitee'] = PublicUserSerializer(instance.invitee).data
        return data

    def validate(self, attrs):
        try:
            if 'view' in self.context and hasattr(self.context['view'], 'kwargs'):
                organization = Organization.objects.get(id=self.context['view'].kwargs.get('organization_pk'))

                if organization.has_member(attrs['invitee']):
                    raise ValidationError('Cannot invite an already-existing member to the organization.')

                if 'request' in self.context:
                    user = self.context['request'].user

                    if not user.is_superuser and not organization.has_permission(user, attrs['permission']):
                        raise ValidationError('Cannot give an invited member a higher permission class.')
        except Organization.DoesNotExist:
            pass

        return attrs

class OrganizationMemberSerializer(ModelSerializer):
    class Meta:
        model = OrganizationMember
        fields = ['organization', 'member', 'invited_by', 'permission']
        read_only_fields = ['organization', 'member', 'invited_by']

    def to_representation(self, instance):
        data = super().to_representation(instance)

        if self.context.get('request'):
            user = self.context['request'].user

            if not user.is_superuser and instance.member != user and not instance.organization.has_permission(user, 'manage'):
                data.pop('invited_by', None)
                data.pop('permission', None)

            data['member'] = PublicUserSerializer(instance.member).data

        return data

    def validate(self, attrs):
        try:
            if 'view' in self.context and hasattr(self.context['view'], 'kwargs'):
                organization = Organization.objects.get(id=self.context['view'].kwargs.get('organization_pk'))
                member = User.objects.get(id=self.context['view'].kwargs.get('pk'))
                organization_member = OrganizationMember.objects.get(organization=organization, member=member)

                if 'request' in self.context:
                    user = self.context['request'].user

                    if not user.is_superuser:
                        if user != organization_member.member and not organization.has_permission(user, 'manage'):
                            raise ValidationError('You do not have permission to perform this action.')

                        if not organization.has_permission(user, attrs['permission']):
                            raise ValidationError('You cannot give a member a higher permission class than yourself.')
        except (Organization.DoesNotExist, User.DoesNotExist, OrganizationMember.DoesNotExist):
            pass

        return attrs