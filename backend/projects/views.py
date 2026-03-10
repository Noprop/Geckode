from rest_framework.viewsets import ModelViewSet
from .models import ProjectGroup, Project, ProjectCollaborator, OrganizationProject, ProjectInvitation, Asset, ProjectShareLink
from .serializers import ProjectGroupSerializer, ProjectSerializer, ProjectInvitationSerializer, ProjectCollaboratorSerializer, OrganizationProjectSerializer, ProjectOrganizationSerializer, AssetSerializer, ProjectShareLinkSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ProjectFilter, ProjectShareLinkFilter, apply_project_access_filters, ProjectCollaboratorFilter, ProjectInvitationFilter, OrganizationProjectFilter, ProjectOrganizationFilter, AssetFilter
from utils.permissions import create_user_permission_class, AnyOf
from rest_framework.exceptions import NotFound, PermissionDenied, ValidationError
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.status import HTTP_200_OK, HTTP_404_NOT_FOUND
from django.shortcuts import get_object_or_404
from organizations.models import Organization
from django.db.models import Q
from accounts.models import User
from accounts.serializers import PublicUserSerializer
from rest_framework.permissions import AllowAny
from django.http import JsonResponse
from base64 import b64encode
from django.db import IntegrityError, transaction
import secrets
import string


class ProjectGroupViewSet(ModelViewSet):
    queryset = ProjectGroup.objects.all()
    serializer_class = ProjectGroupSerializer

    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_queryset(self):
        return super().get_queryset().filter(owner=self.request.user).distinct().order_by('name')

    def get_permissions(self):
        if self.action == 'list':
            return super().get_permissions()

        return super().get_permissions() + [
            create_user_permission_class(
                'owner',
                user_override_fields=['owner'],
                secondary_pk_class=ProjectGroup,
                secondary_pk_kwargs={'id': self.kwargs.get('pk')}
            )(),
        ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjectFilter
    selection_fields = {
        'owner': {
            'model': User,
            'serializer': PublicUserSerializer,
        },
    }

    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_queryset(self):
        return apply_project_access_filters(super().get_queryset(), self.request.user)

    def get_permissions(self):
        if self.action in ['list', 'create']:
            return super().get_permissions()

        '''
        Only the owner can delete a project
        Only allow collaborators that have the ability to code to update the project (further restricted in partial_update)
        Otherwise, allow anyone with viewing permission
        '''
        return super().get_permissions() + ([
            create_user_permission_class(
                'owner' if self.action == 'destroy' else 'code' if self.action == 'partial_update' else 'view',
                primary_pk_class=Project,
            )()
        ])

    def perform_create(self, serializer):
        serializer.validated_data.pop('is_published', False)
        serializer.save(owner=self.request.user)

    def partial_update(self, request, *args, **kwargs):
        project = self.get_object()

        if not project.has_permission(request.user, 'admin'):
            for field in request.data.keys():
                if field not in Project.PROJECT_STATE_FIELDS:
                    if field != 'name' or not project.has_permission(request.user, 'code'):
                        raise PermissionDenied(f"You cannot modify '{field}'.")

        return super().partial_update(request, *args, **kwargs)

    @action(detail=True, methods=['post'])
    def fork(self, request, pk=None):
        project = self.get_object()

        project.forked_by.add(request.user)
        project.save()

        project.id = None
        project.owner = request.user
        project.group = None
        project.name += ' - Fork'
        project.published_at = None
        project.save()

        return Response({"status": "forked"}, status=HTTP_200_OK)

    @action(detail=True, methods=['get'], url_path='check-user-permission')
    def check_user_permission(self, request, pk=None):
        project = self.get_object()
        return Response({
            "user_id": request.user.id,
            "permission": project.get_permission(request.user),
        }, status=HTTP_200_OK)

class ProjectCollaboratorViewSet(ModelViewSet):
    queryset = ProjectCollaborator.objects.all()
    serializer_class = ProjectCollaboratorSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjectCollaboratorFilter

    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_object(self):
        try:
            return ProjectCollaborator.objects.get(project=self.kwargs.get('project_pk'), collaborator=self.kwargs.get('pk'))
        except ProjectCollaborator.DoesNotExist:
            raise NotFound('No project/collaborator pair matches the given IDs.')

    def get_queryset(self):
        return super().get_queryset().filter(project=self.kwargs.get('project_pk')).filter(
            Q(project__owner=self.request.user) |
            Q(project__collaborators=self.request.user)
        ).distinct().order_by('id')

    '''
    Only admins can update or delete a project collaborators
    However, allow users to remove themselves as a collaborator
    Only allow users with invite permissions to create a collaborator
    '''
    def get_permissions(self):
        return super().get_permissions() + [
            create_user_permission_class(
                'admin' if self.action == 'destroy' else 'invite' if self.action in ['create', 'partial_update'] else 'view',
                user_override_fields=['collaborator'] if self.action == 'destroy' and str(self.request.user.id) == self.kwargs.get('pk') else [],
                primary_pk_class=Project,
                lookup='project_pk',
            )()
        ]

    def perform_create(self, serializer):
        project = get_object_or_404(Project, pk=self.kwargs.get('project_pk'))
        serializer.save(project=project)

class OrganizationProjectViewSet(ModelViewSet):
    queryset = OrganizationProject.objects.all()
    serializer_class = OrganizationProjectSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrganizationProjectFilter

    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_object(self):
        try:
            return OrganizationProject.objects.get(organization__id=self.kwargs.get('organization_pk'), project__id=self.kwargs.get('pk'))
        except OrganizationProject.DoesNotExist:
            raise NotFound('No organization/project pair matches the given IDs.')

    def get_queryset(self):
        queryset = super().get_queryset().filter(organization__id=self.kwargs.get('organization_pk')).filter(
            Q(organization__is_public=True) |
            Q(organization__owner=self.request.user) |
            Q(organization__members=self.request.user)
        ).distinct()

        return apply_project_access_filters(queryset, self.request.user, 'project__')

    def get_permissions(self):
        organization = get_object_or_404(Organization, pk=self.kwargs.get('organization_pk'))

        if self.action in ['retrieve', 'list']:
            return super().get_permissions() + [
                create_user_permission_class(
                    'view',
                    object_override=organization,
                )(),
            ]

        # Only allow organization contributors and project admins to add projects to the organization
        if self.action == 'create':
            try:
                project = Project.objects.get(id=self.request.data.get('project_id'))
            except Project.DoesNotExist:
                raise NotFound('No project matches the given ID.')

            return super().get_permissions() + [
                create_user_permission_class(
                    'admin',
                    object_override=project,
                )(),
                create_user_permission_class(
                    'contribute',
                    object_override=organization,
                )(),
            ]

        # Only allow project admins or organization managers to update or remove a project from an organization
        return super().get_permissions() + [AnyOf(
            create_user_permission_class(
                'admin',
                primary_pk_class=Project,
            )(),
            create_user_permission_class(
                'manage',
                object_override=organization,
            )(),
        )]

    def perform_create(self, serializer):
        organization = get_object_or_404(Organization, pk=self.kwargs.get('organization_pk'))
        serializer.save(organization=organization)

class ProjectOrganizationViewSet(ModelViewSet):
    queryset = OrganizationProject.objects.all()
    serializer_class = ProjectOrganizationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjectOrganizationFilter

    http_method_names = ['get']

    def get_queryset(self):
        return super().get_queryset().filter(
            Q(project__id=self.kwargs.get('project_pk')) & (
                Q(organization__is_public=True) |
                Q(organization__owner__id=self.request.user.id) |
                Q(organization__members__id=self.request.user.id)
            )
        ).distinct()

    def get_permissions(self):
        return super().get_permissions() + [
            create_user_permission_class(
                'view',
                primary_pk_class=Project,
                lookup='project_pk',
            )()
        ]
    


class ProjectInvitationViewSet(ModelViewSet):
    queryset = ProjectInvitation.objects.all()
    serializer_class = ProjectInvitationSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjectInvitationFilter

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
                primary_pk_class=Project,
                lookup='project_pk',
                secondary_pk_class=ProjectInvitation,
                secondary_pk_kwargs={'id': self.kwargs.get('pk')},
            )()
        ]

    def get_queryset(self):
        return super().get_queryset().filter(project=self.kwargs.get('project_pk'))

    def perform_create(self, serializer : ProjectInvitationSerializer) -> None:
        project : Project = get_object_or_404(Project, pk=self.kwargs.get('project_pk'))

        serializer.save(project=project, inviter=self.request.user)

    @action(detail=True, methods=['post'])
    def accept(self, request : Request, project_pk : str|None = None, pk=None) :
        project = get_object_or_404(Project, pk=project_pk)
        invitation = self.get_object()

        if invitation.invitee != request.user:
            return PermissionDenied("You are not authorized to accept this invitation.")

        project.add_member(invitation.invitee, invitation.permission, invitation.inviter)

        return Response({"status": "accepted"}, status=HTTP_200_OK)

class AssetViewSet(ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = AssetFilter

    http_method_names = ['get', 'post', 'patch', 'delete']

    def perform_create(self, serializer):
        # note if project is null, project_id = none
        project_id = self.kwargs.get("project_pk")

        

        serializer.save(project_id=project_id)
    
    def get_permissions(self) -> list[any]:
        '''
        Only allow users that can invite to create invitations in the org
        Restrict all other methods to managers
        However, allow the inviter or invitee to delete the object (repeal or reject the invitation)
        '''
        
        if self.kwargs.get('project_pk') == None:
            # TODO: restrict creating/updating for public assets
            return super().get_permissions()

        return super().get_permissions() + [
            create_user_permission_class(
                'code' if (self.action == 'create' or self.action == 'update') else 'view',
                user_override_fields=[],
                primary_pk_class=Project,
                lookup='project_pk',
                secondary_pk_class=Asset,
                secondary_pk_kwargs={'id': self.kwargs.get('pk')},
            )()
        ]

    def get_queryset(self):
        return super().get_queryset().filter(Q(project_id=self.kwargs.get('project_pk')))


class ProjectShareLinkViewSet(ModelViewSet):
    """
    Manage named share links for a given project.
    Share links store a snapshot of the current game state and are exposed publicly via token.
    """

    queryset = ProjectShareLink.objects.all()
    serializer_class = ProjectShareLinkSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjectShareLinkFilter

    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_queryset(self):
        return (
            super().get_queryset().filter(project_id=self.kwargs.get('project_pk')).distinct()
        )

    def get_permissions(self):
        # Viewing share links requires view permission; mutating requires admin
        return super().get_permissions() + [
            create_user_permission_class(
                'view' if self.action in ['list', 'retrieve'] else 'invite' if self.action == 'create' else 'admin',
                primary_pk_class=Project,
                lookup='project_pk',
            )()
        ]

    def perform_create(self, serializer):
        project = get_object_or_404(Project, pk=self.kwargs.get('project_pk'))
        if not project.yjs_blob:
            raise ValidationError({
                'yjs_blob': 'Save your project first before creating a share link.',
            })

        alphabet = string.ascii_letters + string.digits

        # Token collisions are extremely unlikely, but token is a unique field so we
        # still guard against collisions and rare concurrent-create races.
        for _ in range(10):
            token = ''.join(secrets.choice(alphabet) for _ in range(32))
            if ProjectShareLink.objects.filter(token=token).exists():
                continue
            try:
                with transaction.atomic():
                    serializer.save(project=project, token=token, yjs_blob=project.yjs_blob)
                return
            except IntegrityError:
                # Another request may have created the same token concurrently.
                continue

        raise ValidationError({'token': 'Could not generate a unique token. Please try again.'})

    @action(detail=True, methods=['post'])
    def refresh(self, request, project_pk=None, pk=None):
        share_link = self.get_object()
        project = share_link.project
        if not project.yjs_blob:
            raise ValidationError({
                'yjs_blob': 'Save your project first before refreshing the share link.',
            })
        share_link.yjs_blob = project.yjs_blob
        share_link.save(update_fields=['yjs_blob'])
        return Response(
            self.get_serializer(share_link).data,
            status=HTTP_200_OK,
        )

@api_view(['GET'])
@permission_classes([AllowAny])
def public_share_link_detail(request: Request, token: str):
    """
    Public endpoint to fetch a game's snapshot by share token.
    Also tracks total and (best-effort) unique visits using a client-provided visitor_id.
    """
    try:
        share_link = ProjectShareLink.objects.get(token=token)
    except ProjectShareLink.DoesNotExist:
        return Response({'detail': 'Not found.'}, status=HTTP_404_NOT_FOUND)

    visitor_id = request.query_params.get('visitor_id')

    # Always increment total_visits
    share_link.total_visits = (share_link.total_visits or 0) + 1

    # Best-effort unique visitor tracking based on a client-provided, stable visitor_id.
    if visitor_id:
        existing_ids_raw = share_link.visitor_ids or ""
        existing_ids = set(filter(None, existing_ids_raw.split(",")))
        if visitor_id not in existing_ids:
            existing_ids.add(visitor_id)
            share_link.unique_visits = len(existing_ids)
            share_link.visitor_ids = ",".join(sorted(existing_ids))[:65535]

    share_link.save(update_fields=['total_visits', 'unique_visits', 'visitor_ids'])

    payload = {
        'name': share_link.name,
        'token': share_link.token,
        'total_visits': share_link.total_visits,
        'unique_visits': share_link.unique_visits,
    }
    if share_link.yjs_blob is not None:
        payload['yjs_blob'] = b64encode(share_link.yjs_blob).decode('ascii')
    return JsonResponse(payload)
