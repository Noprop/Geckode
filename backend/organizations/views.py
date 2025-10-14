from rest_framework.viewsets import ModelViewSet
from .models import Organization, OrganizationInvitation, OrganizationMember
from .serializers import OrganizationSerializer, OrganizationInvitationSerializer, OrganizationMemberSerializer
from .permissions import create_organization_permission_class
from geckode.utils import create_custom_pagination_class
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_403_FORBIDDEN, HTTP_200_OK
from rest_framework.exceptions import NotFound

class OrganizationViewSet(ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return super().get_permissions() + [create_organization_permission_class('admin', ['owner'])()]
        return super().get_permissions()

    # Prevents non-members from seeing data about the organization completely
    # def get_queryset(self):
    #     return Organization.objects.filter(Q(owner=self.request.user) | Q(members=self.request.user)).distinct()

class OrganizationInvitationViewSet(ModelViewSet):
    queryset = OrganizationInvitation.objects.all()
    serializer_class = OrganizationInvitationSerializer
    pagination_class = create_custom_pagination_class()

    http_method_names = ['get', 'post', 'delete']

    def get_permissions(self):
        try:
            index = ['list', 'retrieve', 'destroy'].index(self.action)
        except ValueError:
            index = 2

        return super().get_permissions() + [
            create_organization_permission_class(
                'invite' if self.action == 'create' else 'manage',
                ['inviter', 'invitee'],
                'invitation'
            )()
        ]

    def get_queryset(self):
        return OrganizationInvitation.objects.filter(organization=self.kwargs.get('organization_pk')).order_by('id')

    def perform_create(self, serializer):
        organization = get_object_or_404(Organization, pk=self.kwargs.get('organization_pk'))
        serializer.save(organization=organization, inviter=self.request.user)

    @action(detail=True, url_path='accept')
    def accept(self, request, organization_pk=None, pk=None):
        invitation = self.get_object()
        print('accepting invite here')

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

class OrganizationMembersViewSet(ModelViewSet):
    queryset = OrganizationMember.objects.all()
    serializer_class = OrganizationMemberSerializer

    http_method_names = ['get', 'patch', 'delete']

    def get_object(self):
        try:
            return OrganizationMember.objects.get(organization=self.kwargs.get('organization_pk'), member=self.kwargs.get('pk'))
        except OrganizationMember.DoesNotExist:
            raise NotFound('No OrganizationMember matches the given query.')

    def get_queryset(self):
        return super().get_queryset().filter(organization=self.kwargs.get('organization_pk'))

    def get_permissions(self):
        return super().get_permissions() + [
            create_organization_permission_class(
                'view' if self.action in ['retrieve', 'list'] else 'manage' if self.action != 'destroy' else 'owner',
                ['member'] if self.action in ['retrieve', 'list'] or str(self.request.user.id) == self.kwargs.get('pk') else [],
                'member'
            )()
        ]