from rest_framework.viewsets import ModelViewSet
from .models import ProjectGroup, Project, ProjectCollaborator, OrganizationProject
from .serializers import ProjectGroupSerializer, ProjectSerializer, ProjectCollaboratorSerializer, OrganizationProjectSerializer, ProjectOrganizationSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ProjectFilter, apply_project_access_filters, ProjectCollaboratorFilter, OrganizationProjectFilter, ProjectOrganizationFilter
from utils.permissions import create_user_permission_class, AnyOf
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from django.shortcuts import get_object_or_404
from organizations.models import Organization
from django.db.models import Q
from accounts.models import User
from accounts.serializers import PublicUserSerializer

class ProjectGroupViewSet(ModelViewSet):
    queryset = ProjectGroup.objects.all()
    serializer_class = ProjectGroupSerializer

    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_queryset(self):
        return super().get_queryset().filter(owner=self.request.user).order_by('name')

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
        serializer.save(owner=self.request.user)

    def partial_update(self, request, *args, **kwargs):
        project = self.get_object()

        if not project.has_permission(request.user, 'admin'):
            for field in request.data.keys():
                if field not in Project.PROJECT_STATE_FIELDS:
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
                'admin' if self.action in ['partial_update', 'destroy'] else 'invite' if self.action == 'create' else 'view',
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