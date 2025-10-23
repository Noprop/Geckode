from rest_framework.viewsets import ModelViewSet
from .models import Organization, OrganizationInvitation, OrganizationMember
from .serializers import OrganizationSerializer, OrganizationInvitationSerializer, OrganizationMemberSerializer
from .filters import OrganizationSearchFilterBackend, OrganizationInvitationSearchFilterBackend
from utils.permissions import create_user_permission_class
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_403_FORBIDDEN, HTTP_200_OK
from rest_framework.exceptions import NotFound

class OrganizationViewSet(ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    filter_backends = [OrganizationSearchFilterBackend]

    http_method_names = ['get', 'post', 'patch', 'delete']

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_permissions(self):
        if self.action in ['partial_update', 'destroy']:
            return super().get_permissions() + [
                create_user_permission_class('owner' if self.action == 'destroy' else 'admin', ['owner'])()
            ]
        return super().get_permissions()

class OrganizationInvitationViewSet(ModelViewSet):
    queryset = OrganizationInvitation.objects.all()
    serializer_class = OrganizationInvitationSerializer
    filter_backends = [OrganizationInvitationSearchFilterBackend]

    http_method_names = ['get', 'post', 'delete']

    def get_permissions(self):
        return super().get_permissions() + [
            create_user_permission_class(
                'invite' if self.action == 'create' else 'manage',
                ['inviter', 'invitee'],
                Organization,
                'organization',
                OrganizationInvitation,
                lambda view : {'id': view.kwargs.get('pk')},
            )()
        ]

    def get_queryset(self):
        return super().get_queryset().filter(organization=self.kwargs.get('organization_pk'))

    def perform_create(self, serializer):
        organization = get_object_or_404(Organization, pk=self.kwargs.get('organization_pk'))
        serializer.save(organization=organization, inviter=self.request.user)

    @action(detail=True, url_path='accept')
    def accept(self, request, organization_pk=None, pk=None):
        invitation = self.get_object()

        if not request.user.is_superuser and invitation.invitee != request.user:
            return Response({"detail": "Not authorized to accept this invitation."}, status=HTTP_403_FORBIDDEN)

        OrganizationMember.objects.create(
            organization=get_object_or_404(Organization, pk=organization_pk),
            member=invitation.invitee,
            invited_by=invitation.inviter,
            permission=invitation.permission
        )

        invitation.delete()

        return Response({"status": "accepted"}, status=HTTP_200_OK)

class OrganizationMemberViewSet(ModelViewSet):
    queryset = OrganizationMember.objects.all()
    serializer_class = OrganizationMemberSerializer
    filter_backends = [OrganizationInvitationSearchFilterBackend]

    http_method_names = ['get', 'patch', 'delete']

    def get_object(self):
        try:
            return OrganizationMember.objects.get(organization=self.kwargs.get('organization_pk'), member=self.kwargs.get('pk'))
        except OrganizationMember.DoesNotExist:
            raise NotFound('No organization/member pair matches the given IDs.')

    def get_queryset(self):
        return super().get_queryset().filter(organization=self.kwargs.get('organization_pk'))

    def get_permissions(self):
        return super().get_permissions() + [
            create_user_permission_class(
                'view' if self.action in ['retrieve', 'list'] else 'manage',
                ['member'] if self.action in ['retrieve', 'list'] or (self.action == 'destroy' and str(self.request.user.id) == self.kwargs.get('pk')) else [],
                Organization,
                'organization',
                OrganizationMember,
                lambda view : {'organization__id': view.kwargs.get('organization_pk'), 'member__id': view.kwargs.get('pk')},
            )()
        ]