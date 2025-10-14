from rest_framework.serializers import ModelSerializer, SerializerMethodField, ValidationError
from accounts.fields import ReadNestedWriteIDUserField
from accounts.models import User
from accounts.serializers import PublicUserSerializer
from .models import Organization, OrganizationInvitation

class OrganizationSerializer(ModelSerializer):
    owner = ReadNestedWriteIDUserField(queryset=User.objects.all())
    members = PublicUserSerializer(many=True, read_only=True)
    members_count = SerializerMethodField()

    class Meta:
        model = Organization
        fields = ['id', 'created_at', 'owner', 'name', 'slug', 'description', 'members', 'members_count']
        read_only_fields = ['created_at']

    def get_members_count(self, instance):
        return instance.members.count()

    def to_representation(self, instance):
        data = super().to_representation(instance)
        user = self.context['request'].user

        if not user.is_superuser and not instance.has_member(user):
            data.pop('members', None)

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

    def validate(self, data):
        try:
            if 'view' in self.context and hasattr(self.context['view'], 'kwargs'):
                organization = Organization.objects.get(id=self.context['view'].kwargs.get('organization_pk'))

                if organization.has_member(data['invitee']):
                    raise ValidationError('Cannot invite an already-existing member to the organization.')

                if 'request' in self.context:
                    user = self.context['request'].user

                    if not user.is_superuser and not organization.has_permission(user, data['permission']):
                        raise ValidationError('Cannot give an invited member a higher permission class.')
        except Organization.DoesNotExist:
            pass

        return data