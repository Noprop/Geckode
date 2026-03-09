from utils.permissions import create_permissions_allowed_hierarchy
from utils.filters import PrefixedFilterSet
from django_filters import NumberFilter, BooleanFilter, ChoiceFilter
from .models import Organization, OrganizationInvitation, OrganizationMember, OrganizationBannedMember
from accounts.models import User
from django.db.models import Q

class OrganizationFilter(PrefixedFilterSet):
    search_fields = ['name', 'slug']
    ordering_fields = [
        'id',
        'created_at',
        ('owner__username', 'owner'),
        *search_fields,
    ]

    owner = NumberFilter(field_name='owner__id')
    is_public = BooleanFilter(field_name='is_public')
    has_project = NumberFilter(field_name='projects__id')
    exclude_project = NumberFilter(field_name='projects__id', exclude=True)
    has_member = NumberFilter(field_name='members__id')
    exclude_member = NumberFilter(field_name='members__id', exclude=True)
    user_has_permission = ChoiceFilter(choices=Organization.PERMISSION_CHOICES, method='filter_user_has_permission')

    class Meta:
        model = Organization
        fields = []

    def __init__(self, *args, **kwargs):
        self.request = kwargs.get('request', None) 
        super().__init__(*args, **kwargs)

    def filter_user_has_permission(self, queryset, name, value):
        return queryset.filter(
            Q(owner=self.request.user) |
            Q(
                organization_members__member=self.request.user,
                organization_members__permission__in=create_permissions_allowed_hierarchy(Organization.PERMISSION_CHOICES).get(value, []),
            ),
        ).distinct()

class OrganizationInvitationFilter(PrefixedFilterSet):
    search_fields = [
        (field1, field2)
        for field1 in ['invitee', 'inviter']
        for field2 in User.SEARCH_FIELDS
    ]
    ordering_fields = [
        'id',
        'invited_at',
        *[
            (f'{field1}__{field2}', f'{field1}_{field2}')
            for field1, field2 in search_fields
        ],
        'created_at',
    ]

    invitee = NumberFilter(field_name='invitee__id')
    inviter = NumberFilter(field_name='inviter__id')
    permission = ChoiceFilter(choices=Organization.PERMISSION_CHOICES)

    class Meta:
        model = OrganizationInvitation
        fields = []

class OrganizationMemberFilter(PrefixedFilterSet):
    search_fields = [
        (field1, field2)
        for field1 in ['member', 'invited_by']
        for field2 in User.SEARCH_FIELDS
    ]
    ordering_fields = [
        'id',
        'invited_at',
        *[
            (f'{field1}__{field2}', f'{field1}_{field2}')
            for field1, field2 in search_fields
        ],
        'joined_at',
        ('member__username', 'member'),
    ]

    invited_by = NumberFilter(field_name='invited_by__id')
    permission = ChoiceFilter(choices=Organization.PERMISSION_CHOICES)

    class Meta:
        model = OrganizationMember
        fields = []

class OrganizationBannedMemberFilter(PrefixedFilterSet):
    search_fields = [
        ('user', field)
        for field in User.SEARCH_FIELDS
    ]
    ordering_fields = [
        'id',
        'banned_at',
        *[
            (f'{field1}__{field2}', f'{field1}_{field2}')
            for field1, field2 in search_fields
        ],
    ]

    banned_by = NumberFilter(field_name='banned_by__id')

    class Meta:
        model = OrganizationBannedMember
        fields = []