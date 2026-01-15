from utils.filters import PrefixedFilterSet
from .models import User
from django_filters import NumberFilter
from django.db.models import Q
from projects.models import Project
from organizations.models import Organization

class UserFilter(PrefixedFilterSet):
    search_fields = User.SEARCH_FIELDS
    ordering_fields = [
        'id',
        *search_fields,
    ]

    exclude_project = NumberFilter(method='filter_exclude_project')
    exclude_organization = NumberFilter(method='filter_exclude_organization')

    class Meta:
        model = User
        fields = []

    def filter_exclude_project(self, queryset, name, value):
        if value:
            try:
                project = Project.objects.get(id=value)
                return queryset.exclude(
                    id__in=[
                        project.owner.id,
                        *project.collaborators.values_list('id', flat=True)
                    ]
                )
            except Project.DoesNotExist:
                pass
        return queryset

    def filter_exclude_organization(self, queryset, name, value):
        if value:
            try:
                organization = Organization.objects.get(id=value)
                return queryset.exclude(
                    id__in=[
                        organization.owner.id,
                        *organization.members.values_list('id', flat=True)
                    ]
                )
            except Organization.DoesNotExist:
                pass
        return queryset