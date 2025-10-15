from rest_framework.filters import BaseFilterBackend
from .serializers import OrganizationSearchSerializer, OrganizationInvitationSearchSerializer, OrganizationMemberSearchSerializer
from django.db.models import Q

class OrganizationSearchFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        serializer = OrganizationSearchSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        params = serializer.validated_data

        if 'owner' in params:
            queryset = queryset.filter(owner__id=params['owner'])

        if 'search' in params:
            queryset = queryset.filter(
                Q(name__icontains=params['search']) |
                Q(slug__icontains=params['search'])
            )

        return queryset.order_by(params['order_by'])

class OrganizationInvitationSearchFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        serializer = OrganizationInvitationSearchSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        params = serializer.validated_data

        for param in ['invitee', 'inviter']:
            if param in params:
                queryset = queryset.filter(**{f"{param}__id": params[param]})

        if 'permission' in params:
            queryset = queryset.filter(permission=params['permission'])

        if 'search' in params:
            queryset = queryset.filter(
                Q(invitee__username__icontains=params['search']) |
                Q(invitee__first_name__icontains=params['search']) |
                Q(invitee__last_name__icontains=params['search']) |
                Q(inviter__username__icontains=params['search']) |
                Q(inviter__first_name__icontains=params['search']) |
                Q(inviter__last_name__icontains=params['search'])
            )

        return queryset.order_by(params['order_by'])

class OrganizationMemberSearchFilterBackend(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        serializer = OrganizationMemberSearchSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        params = serializer.validated_data

        if 'permission' in params:
            queryset = queryset.filter(permission=params['permission'])

        if 'search' in params:
            queryset = queryset.filter(
                Q(member__username__icontains=params['search']) |
                Q(member__first_name__icontains=params['search']) |
                Q(member__last_name__icontains=params['search']) |
                Q(invited_by__username__icontains=params['search']) |
                Q(invited_by__first_name__icontains=params['search']) |
                Q(invited_by__last_name__icontains=params['search'])
            )

        return queryset.order_by(params['order_by'])