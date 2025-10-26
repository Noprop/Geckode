from rest_framework.viewsets import ModelViewSet
from .models import ProjectGroup, Project, ProjectCollaborator, OrganizationProject
from .serializers import ProjectGroupSerializer, ProjectSerializer, ProjectCollaboratorSerializer, OrganizationProjectSerializer
from rest_framework.permissions import BasePermission
from .filters import ProjectSearchFilterBackend
from utils.permissions import create_user_permission_class, AnyOf
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from django.shortcuts import get_object_or_404
from organizations.models import Organization

class ProjectGroupViewSet(ModelViewSet):
    queryset = ProjectGroup.objects.all()
    serializer_class = ProjectGroupSerializer

    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_queryset(self):
        return super().get_queryset().filter(owner=self.request.user).order_by('name')

    def get_permissions(self):
        class ObjectPermissionClass(BasePermission):
            def has_object_permission(self, request, view, obj):
                return obj.owner == request.user

        return super().get_permissions() + [ObjectPermissionClass()]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    filter_backends = [ProjectSearchFilterBackend]

    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_permissions(self):
        permission_required = 'owner' if self.action == 'destroy' else 'edit' if self.action == 'partially_update' else 'view'

        return super().get_permissions() + [
            create_user_permission_class(permission_required, ['owner'])()
        ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def partial_update(self, request, *args, **kwargs):
        project = self.get_object()

        if not project.has_permission(request.user, 'admin'):
            for field in request.data.keys():
                if field != 'blocks':
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

    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_object(self):
        try:
            return ProjectCollaborator.objects.get(project=self.kwargs.get('project_pk'), collaborator=self.kwargs.get('pk'))
        except ProjectCollaborator.DoesNotExist:
            raise NotFound('No project/collaborator pair matches the given IDs.')

    def get_queryset(self):
        return super().get_queryset().filter(project=self.kwargs.get('project_pk')).order_by('id')

    def get_permissions(self):
        return super().get_permissions() + [
            create_user_permission_class(
                'admin' if self.action in ['partially_update', 'destroy'] else 'code',
                ['collaborator'] if self.action in ['retrieve', 'list'] or (self.action == 'destroy' and str(self.request.user.id) == self.kwargs.get('pk')) else [],
                Project,
                'project_pk',
                ProjectCollaborator,
                lambda view : {'project__id': view.kwargs.get('project_pk'), 'collaborator__id': view.kwargs.get('pk')},
            )()
        ]

    def perform_create(self, serializer):
        project = get_object_or_404(Project, pk=self.kwargs.get('project_pk'))
        serializer.save(project=project)

class OrganizationProjectViewSet(ModelViewSet):
    queryset = OrganizationProject.objects.all()
    serializer_class = OrganizationProjectSerializer
    filter_backends = [ProjectSearchFilterBackend]

    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_object(self):
        try:
            return OrganizationProject.objects.get(organization__id=self.kwargs.get('organization_pk'), project__id=self.kwargs.get('pk'))
        except OrganizationProject.DoesNotExist:
            raise NotFound('No organization/project pair matches the given IDs.')

    def get_queryset(self):
        return super().get_queryset().filter(organization__id=self.kwargs.get('organization_pk'))

    def get_permissions(self):
        return super().get_permissions() + [AnyOf(
            create_user_permission_class(
                'view' if self.action in ['retrieve', 'list'] else 'admin',
            )(),
            create_user_permission_class(
                'view' if self.action in ['retrieve', 'list'] else 'manage' if self.action == 'destroy' else '',
            )()
        )]

    def perform_create(self, serializer):
        organization = get_object_or_404(Organization, pk=self.kwargs.get('organization_pk'))
        serializer.save(organization=organization)