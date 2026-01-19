from functools import reduce
from operator import or_
from django.db.models import Q
from utils.filters import PrefixedFilterSet, make_owner_id_filter, make_nullable_boolean_filter
from django_filters import NumberFilter, BooleanFilter, CharFilter, ChoiceFilter
from .models import Project, ProjectCollaborator, OrganizationProject, ProjectInvitation
from accounts.filters import UserFilter
from accounts.models import User

'''
Filter the query set to restrict projects to those published or the user has access
(owner, collaborator, or a member of an organization in which the project is shared to)
'''
def apply_project_access_filters(queryset, user, prefix=''):
    return queryset.filter(
        reduce(or_, (Q(**{
            f'{prefix}{field}': value
        }) for field, value in {
            'published_at__isnull': False,
            'owner': user,
            'collaborators': user,
            'organizations__members': user
        }.items())
    )).distinct()

class ProjectFilter(PrefixedFilterSet):
    search_fields = ['name']
    ordering_fields = [
        'id',
        'created_at',
        'updated_at',
        ('owner__username', 'owner'),
        *search_fields,
    ]

    owner = NumberFilter(method='filter_owner')
    is_published = BooleanFilter(method='filter_is_published')
    group = NumberFilter(field_name='group__id')
    organization = NumberFilter(field_name='organizations__id')

    class Meta:
        model = Project
        fields = []

    filter_owner = make_owner_id_filter('owner')
    filter_is_published = make_nullable_boolean_filter('published_at')

class ProjectCollaboratorFilter(UserFilter):
    prefix = 'collaborator__'

    permission = CharFilter(field_name='permission')

    class Meta:
        model = ProjectCollaborator
        fields = []

class OrganizationProjectFilter(ProjectFilter):
    prefix = 'project__'

    class Meta:
        model = OrganizationProject
        fields = []

class ProjectOrganizationFilter(PrefixedFilterSet):
    ordering_fields = [
        'id',
    ]

    class Meta:
        model = OrganizationProject
        fields = []

class ProjectInvitationFilter(PrefixedFilterSet):
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
    permission = ChoiceFilter(choices=Project.PERMISSION_CHOICES)

    class Meta:
        model = ProjectInvitation
        fields = []