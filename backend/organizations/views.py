from rest_framework.viewsets import ModelViewSet
from .models import Organization, OrganizationInvitation, OrganizationPermission
from .serializers import OrganizationSerializer, OrganizationInvitationSerializer
from .permissions import HasOrganizationPermission
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_403_FORBIDDEN, HTTP_200_OK

class OrganizationViewSet(ModelViewSet):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return super().get_permissions() + [HasOrganizationPermission(['owner'], 'admin')]
        return super().get_permissions()

    # Prevents non-members from seeing data about the organization completely
    # def get_queryset(self):
    #     return Organization.objects.filter(Q(owner=self.request.user) | Q(members=self.request.user)).distinct()

class OrganizationInvitationPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'limit'
    page_query_param = 'page_number'
    max_page_size = 100

class OrganizationInvitationViewSet(ModelViewSet):
    queryset = OrganizationInvitation.objects.all()
    serializer_class = OrganizationInvitationSerializer

    http_method_names = ['get', 'post', 'delete']

    def get_permissions(self):
        return super().get_permissions() + [HasOrganizationPermission(['invitee', 'inviter'], 'invite' if self.action == 'post' else 'manage')]

    def get_queryset(self):
        return OrganizationInvitation.objects.filter(organization=self.kwargs['organization_pk'])

    def perform_create(self, serializer):
        organization = get_object_or_404(Organization, pk=self.kwargs['organization_pk'])
        serializer.save(organization=organization, inviter=self.request.user)

    @action(detail=True, url_path='accept')
    def accept(self, request, organization_pk=None, pk=None):
        invitation = self.get_object()

        if not request.user.is_superuser and invitation.invitee != request.user:
            return Response({"detail": "Not authorized to accept this invitation."}, status=HTTP_403_FORBIDDEN)

        OrganizationPermission.objects.create(
            organization=get_object_or_404(Organization, pk=organization_pk),
            user=invitation.invitee,
            invited_by=invitation.inviter,
            permission=invitation.permission
        )
        

        return Response({"status": "accepted"}, status=HTTP_200_OK)
