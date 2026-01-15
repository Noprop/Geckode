from rest_framework.viewsets import ModelViewSet
from .models import Organization, OrganizationInvitation, OrganizationMember, OrganizationBannedMember
from .serializers import OrganizationSerializer, OrganizationInvitationSerializer, OrganizationMemberSerializer, OrganizationBannedMemberSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import OrganizationFilter, OrganizationInvitationFilter, OrganizationMemberFilter, OrganizationBannedMemberFilter
from utils.permissions import create_user_permission_class
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied

class OrganizationViewSet(ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrganizationFilter

    http_method_names = ['get', 'post', 'patch', 'delete']

    def perform_create(self, serializer : OrganizationSerializer) -> None:
        serializer.save(owner=self.request.user)

    def get_permissions(self) -> list[any]:
        if self.action in ['list', 'create', 'join']:
            return super().get_permissions()

        return super().get_permissions() + [
            create_user_permission_class(
                'owner' if self.action == 'destroy' else 'admin' if self.action == 'partial_update' else 'view',
                primary_pk_class=Organization,
            )()
        ]

    @action(detail=True, methods=['post'])
    def join(self, request : Request, none_pk=None, pk : str|None = None) -> Response:
        organization = get_object_or_404(
            Organization.objects.filter(pk=pk).filter(
                Q(is_public=True) |
                Q(invitations__invitee=request.user)
            ).distinct()
        )

        if organization.owner == request.user:
            raise ValidationError('You are the owner of this organization.')

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

    def get_permissions(self) -> list[any]:
        '''
        Only allow users that can invite to create invitations in the org
        Restrict all other methods to managers
        However, allow the inviter or invitee to delete the object (repeal or reject the invitation)
        '''
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

    def perform_create(self, serializer : OrganizationInvitationSerializer) -> None:
        organization : Organization = get_object_or_404(Organization, pk=self.kwargs.get('organization_pk'))

        if organization.is_user_banned(serializer.validated_data['invitee']):
            raise ValidationError("Invited user is banned from organization.")

        serializer.save(organization=organization, inviter=self.request.user)

    @action(detail=True, methods=['post'])
    def accept(self, request : Request, organization_pk : str|None = None, pk=None) :
        organization = get_object_or_404(Organization, pk=organization_pk)
        invitation = self.get_object()

        if invitation.invitee != request.user:
            return PermissionDenied("You are not authorized to accept this invitation.")

        organization.add_member(invitation.invitee, invitation.permission, invitation.inviter)

        return Response({"status": "accepted"}, status=HTTP_200_OK)

class OrganizationMemberViewSet(ModelViewSet):
    queryset = OrganizationMember.objects.all()
    serializer_class = OrganizationMemberSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrganizationMemberFilter

    http_method_names = ['get', 'patch', 'delete']

    def get_object(self) -> OrganizationMember:
        try:
            return OrganizationMember.objects.get(organization=self.kwargs.get('organization_pk'), member=self.kwargs.get('pk'))
        except OrganizationMember.DoesNotExist:
            raise NotFound('No organization/member pair matches the given IDs.')

    def get_queryset(self):
        return super().get_queryset().filter(organization=self.kwargs.get('organization_pk')).filter(
            Q(organization__owner=self.request.user) |
            Q(organization__members=self.request.user)
        ).distinct()

    '''
    Only allow users to get members if they have viewing permissions of the organization
    Only allow managers for all other methods
    However, let users destroy their own object to leave the organization
    '''
    def get_permissions(self) -> list[any]:
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

    def perform_create(self, serializer : OrganizationBannedMemberSerializer):
        organization : Organization = Organization.objects.get(id=self.kwargs.get('organization_pk'))
        serializer.save(banned_by=self.request.user, organization=organization)
    
    def get_permissions(self) -> list[any]:
        return super().get_permissions()
    
    def get_object(self) -> OrganizationBannedMember:
        try:
            return OrganizationBannedMember.objects.get(organization=self.kwargs.get('organization_pk'), user=self.kwargs.get('pk'))
        except OrganizationBannedMember.DoesNotExist:
            raise NotFound('No organization/member pair matches the given IDs.')

