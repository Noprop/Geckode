from rest_framework.serializers import Serializer, CharField, IntegerField, ChoiceField, ModelSerializer, SerializerMethodField, ValidationError
from geckode.utils import create_order_by_choices
from accounts.fields import ReadNestedWriteIDUserField
from accounts.models import User
from accounts.serializers import PublicUserSerializer
from .models import Organization, OrganizationInvitation, OrganizationMember

class OrganizationSearchSerializer(Serializer):
    ORDER_BY_CHOICES = create_order_by_choices(['name', 'slug'])

    search = CharField(required=False)
    owner = IntegerField(required=False)
    order_by = ChoiceField(required=False, choices=ORDER_BY_CHOICES, default='name')

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

class OrganizationInvitationSearchSerializer(Serializer):
    ORDER_BY_CHOICES = create_order_by_choices([
        'id', 'invited_at', 'invitee__username', 'invitee__first_name', 'invitee__last_name'
        'inviter__username', 'inviter__first_name', 'inviter__last_name',
    ])

    search = CharField(required=False)
    invitee = IntegerField(required=False)
    inviter = IntegerField(required=False)
    permission = ChoiceField(required=False, choices=OrganizationMember.PERMISSION_CHOICES)
    order_by = ChoiceField(required=False, choices=ORDER_BY_CHOICES, default='-id')

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

class OrganizationMemberSearchSerializer(Serializer):
    ORDER_BY_CHOICES = create_order_by_choices([
        'id', 'invited_at', 'member__username' 'member__first_name', 'member__last_name',
        'invited_by__username', 'invited_by__first_name', 'invited_by__last_name',
    ])

    search = CharField(required=False)
    invited_by = IntegerField(required=False)
    permission = ChoiceField(required=False, choices=OrganizationMember.PERMISSION_CHOICES)
    order_by = ChoiceField(required=False, choices=ORDER_BY_CHOICES, default='id')

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
                organization_member = OrganizationMember.objects.get(organization=organization, member__id=self.context['view'].kwargs.get('pk'))

                if 'request' in self.context:
                    user = self.context['request'].user

                    if not user.is_superuser:
                        if user != organization_member.member and not organization.has_permission(user, 'manage'):
                            raise ValidationError('You do not have permission to perform this action.')

                        if not organization.has_permission(user, attrs['permission']):
                            raise ValidationError('You cannot give a member a higher permission class than yourself.')
        except (Organization.DoesNotExist, OrganizationMember.DoesNotExist):
            pass

        return attrs