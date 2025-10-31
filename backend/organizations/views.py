from rest_framework.viewsets import ModelViewSet
from .models import Organization, OrganizationInvitation, OrganizationMember, OrganizationBannedMember
from .serializers import OrganizationSerializer, OrganizationInvitationSerializer, OrganizationMemberSerializer, OrganizationBannedMemberSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import OrganizationFilter, OrganizationInvitationFilter, OrganizationMemberFilter, OrganizationBannedMemberFilter
from utils.permissions import create_user_permission_class
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_403_FORBIDDEN, HTTP_200_OK
from rest_framework.exceptions import NotFound, ValidationError

class OrganizationViewSet(ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrganizationFilter

    http_method_names = ['get', 'post', 'patch', 'delete']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_permissions(self):
        if self.action in ['list', 'create', 'join']:
            return super().get_permissions()

        return super().get_permissions() + [
            create_user_permission_class(
                'owner' if self.action == 'destroy' else 'admin' if self.action == 'partial_update' else 'view',
                primary_pk_class=Organization,
            )()
        ]

    @action(detail=True, methods=['post'])
    def join(self, request, none_pk=None, pk=None):
        print(Organization.objects.filter(pk=pk))
        organization = get_object_or_404(
            Organization.objects.filter(pk=pk).filter(
                Q(is_public=True) |
                Q(invitations__invitee=request.user)
            ).distinct()
        )

        if OrganizationMember.objects.filter(
            organization=organization,
            member=request.user,
        ).exists():
            raise ValidationError('You are already a member of this organization.')

        organization.add_member(request.user)

        return Response({"status": "joined"}, status=HTTP_200_OK)

class OrganizationInvitationViewSet(ModelViewSet):
    queryset = OrganizationInvitation.objects.all()
    serializer_class = OrganizationInvitationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrganizationInvitationFilter

    http_method_names = ['get', 'post', 'delete']

    def get_permissions(self):
        return super().get_permissions() + [
            create_user_permission_class(
                'invite' if self.action == 'create' else 'manage',
                user_override_fields=['inviter', 'invitee'],
                primary_pk_class=Organization,
                lookup='organization_pk',
                secondary_pk_class=OrganizationInvitation,
                secondary_pk_kwargs={'id': self.kwargs.get('pk')},
            )()
        ]

    def get_queryset(self):
        return super().get_queryset().filter(organization=self.kwargs.get('organization_pk'))

    def perform_create(self, serializer):
        organization = get_object_or_404(Organization, pk=self.kwargs.get('organization_pk'))

        if organization.is_user_banned(serializer.validated_data['user']):
            raise ValidationError("Invited user is banned from organization.")

        serializer.save(organization=organization, inviter=self.request.user)

    @action(detail=True, methods=['post'])
    def accept(self, request, organization_pk=None, pk=None):
        organization = get_object_or_404(Organization, pk=organization_pk)
        invitation = self.get_object()

        if not request.user.is_superuser and invitation.invitee != request.user:
            return Response({"detail": "You are not authorized to accept this invitation."}, status=HTTP_403_FORBIDDEN)

        organization.add_member(invitation.invitee, invitation.permission, invitation.inviter)

        return Response({"status": "accepted"}, status=HTTP_200_OK)

class OrganizationMemberViewSet(ModelViewSet):
    queryset = OrganizationMember.objects.all()
    serializer_class = OrganizationMemberSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrganizationMemberFilter

    http_method_names = ['get', 'patch', 'delete']

    def get_object(self):
        try:
            return OrganizationMember.objects.get(organization=self.kwargs.get('organization_pk'), member=self.kwargs.get('pk'))
        except OrganizationMember.DoesNotExist:
            raise NotFound('No organization/member pair matches the given IDs.')

    def get_queryset(self):
        return super().get_queryset().filter(organization=self.kwargs.get('organization_pk')).filter(
            Q(organization__owner=self.request.user) |
            Q(organization__members=self.request.user)
        )

    def get_permissions(self):
        return super().get_permissions() + [
            create_user_permission_class(
                'view' if self.action in ['retrieve', 'list'] else 'manage',
                user_override_fields=['member'] if self.action == 'destroy' and str(self.request.user.id) == self.kwargs.get('pk') else [],
                primary_pk_class=Organization,
                lookup='organization_pk',
                secondary_pk_class=OrganizationMember,
                secondary_pk_kwargs={'organization__id': self.kwargs.get('organization_pk'), 'member__id': self.kwargs.get('pk')},
            )()
        ]

class OrganizationBannedMemberViewSet(ModelViewSet):
    queryset = OrganizationBannedMember.objects.all()
    serializer_class = OrganizationBannedMemberSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrganizationBannedMemberFilter


    http_method_names = ['get', 'post', 'delete']

    def perform_create(self, serializer):
        organization = Organization.objects.get(id=self.kwargs.get('organization_pk'))
        serializer.save(banned_by=self.request.user, organization=organization)
    
    def get_permissions(self):
        return super().get_permissions()
    
    def get_object(self):
        try:
            return OrganizationBannedMember.objects.get(organization=self.kwargs.get('organization_pk'), user=self.kwargs.get('pk'))
        except OrganizationBannedMember.DoesNotExist:
            raise NotFound('No organization/member pair matches the given IDs.')

