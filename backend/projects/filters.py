from rest_framework.filters import BaseFilterBackend
from .serializers import ProjectSearchSerializer
from .models import OrganizationProject
from django.db.models import Q

class ProjectSearchFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        serializer = ProjectSearchSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        params = serializer.validated_data

        if queryset.model is OrganizationProject:
            lookup_prefix = 'project__'
        else:
            lookup_prefix = ''

        def prefix_filters(**filters):
            return {f'{lookup_prefix}{key}': value for key, value in filters.items()}

        if 'owner' in params:
            if params['owner']:
                queryset = queryset.filter(**prefix_filters(owner__id=params['owner']))
            else:
                queryset = queryset.exclude(**prefix_filters(owner=request.user))

        if 'is_published' in params:
            queryset = queryset.filter(**prefix_filters(published_at__isnull=not params['is_published']))

        for field, param in {
            'organizations__id': 'organization',
            'group__id': 'group',
        }.items():
            if param in params:
                queryset = queryset.filter(**prefix_filters(**{field: params[param]}))

        queryset = queryset.filter(
            Q(**prefix_filters(published_at__isnull=False)) |
            Q(**prefix_filters(owner=request.user)) |
            Q(**prefix_filters(collaborators=request.user)) |
            Q(**prefix_filters(organizations__members=request.user))
        )

        if 'search' in params:
            queryset = queryset.filter(**prefix_filters(name__icontains=params['search']))

        order_by_symbol = params['order_by'][0] if params['order_by'][:1] in ['+', '-'] else ''

        return queryset.order_by(order_by_symbol + lookup_prefix + params['order_by'][len(order_by_symbol):])