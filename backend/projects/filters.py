from rest_framework.filters import BaseFilterBackend
from .serializers import ProjectSearchSerializer
from django.db.models import Q

class ProjectSearchFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        serializer = ProjectSearchSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        params = serializer.validated_data

        if 'owner' in params:
            if params['owner']:
                queryset = queryset.filter(owner__id=params['owner'])
            else:
                queryset = queryset.exclude(owner=request.user)

        if 'is_published' in params:
            queryset = queryset.filter(published_at__isnull=not params['is_published'])

        for field, param in {
            'shared_organizations__id': 'organization',
            'group': 'group',
        }.items():
            if param in params:
                queryset = queryset.filter(**{field: params[param]})

        queryset = queryset.filter(
            Q(published_at__isnull=False) |
            Q(owner=request.user) |
            Q(collaborators__collaborator=request.user) |
            Q(shared_organizations__members=request.user)
        )

        if 'search' in params:
            queryset = queryset.filter(name__icontains=params['search'])

        return queryset.order_by(params['order_by'])