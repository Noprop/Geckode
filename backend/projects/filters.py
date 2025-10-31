from functools import reduce
from operator import or_
from django.db.models import Q
from utils.filters import PrefixedFilterSet, make_owner_id_filter, make_nullable_boolean_filter
from django_filters import NumberFilter, BooleanFilter, OrderingFilter
from .models import Project, OrganizationProject

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

    owner = NumberFilter(method='filter_owner')
    is_published = BooleanFilter(method='filter_is_published')
    group = NumberFilter(field_name='group__id')
    organization = NumberFilter(field_name='organizations__id')
    order_by = OrderingFilter(
        fields=(
            'id',
            'created_at',
            'updated_at',
            *search_fields,
        ),
    )

    class Meta:
        model = Project
        fields = []

    filter_owner = make_owner_id_filter('owner')
    filter_is_published = make_nullable_boolean_filter('published_at')

class OrganizationProjectFilter(PrefixedFilterSet):
    class Meta:
        model = OrganizationProject
        fields = []