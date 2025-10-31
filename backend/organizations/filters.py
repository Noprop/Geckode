from utils.filters import PrefixedFilterSet
from django_filters import NumberFilter, BooleanFilter, ChoiceFilter, OrderingFilter
from .models import Organization, OrganizationInvitation, OrganizationMember, OrganizationBannedMember
from accounts.models import User

class OrganizationFilter(PrefixedFilterSet):
    search_fields = ['name', 'slug']

    owner = NumberFilter(field_name='owner__id')
    is_public = BooleanFilter(field_name='is_public')
    order_by = OrderingFilter(
        fields=(
            'id',
            *search_fields,
        ),
    )

    class Meta:
        model = Organization
        fields = []

class OrganizationInvitationFilter(PrefixedFilterSet):
    search_fields = [
        (field1, field2)
        for field1 in ['invitee', 'inviter']
        for field2 in User.SEARCH_FIELDS
    ]

    invitee = NumberFilter(field_name='invitee__id')
    inviter = NumberFilter(field_name='inviter__id')
    permission = ChoiceFilter(choices=Organization.PERMISSION_CHOICES)
    order_by = OrderingFilter(
        fields=(
            'id',
            'invited_at',
            *[
                (f'{field1}__{field2}', f'{field1}_{field2}')
                for field1, field2 in search_fields
            ],
            'created_at',
        ),
    )

    class Meta:
        model = OrganizationInvitation
        fields = []

class OrganizationMemberFilter(PrefixedFilterSet):
    search_fields = [
        (field1, field2)
        for field1 in ['member', 'invited_by']
        for field2 in User.SEARCH_FIELDS
    ]

    invited_by = NumberFilter(field_name='invited_by__id')
    permission = ChoiceFilter(choices=Organization.PERMISSION_CHOICES)
    order_by = OrderingFilter(
        fields=(
            'id',
            'invited_at',
            *[
                (f'{field1}__{field2}', f'{field1}_{field2}')
                for field1, field2 in search_fields
            ],
            'joined_at',
        ),
    )

    class Meta:
        model = OrganizationMember
        fields = []

class OrganizationBannedMemberFilter(PrefixedFilterSet):
    search_fields = [
        ('user', field2)
        for field2 in User.SEARCH_FIELDS
    ]

    banned_by = NumberFilter(field_name='banned_by__id')

    # ordering rules
    order_by = OrderingFilter(
        fields=(
            'banned_at',
            'banned_by__id', 'banned_by_id',
            *[
                (f'{field1}__{field2}', f'{field1}_{field2}')
                for field1, field2 in search_fields
            ],
        ),
    )