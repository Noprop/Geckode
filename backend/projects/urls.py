from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter
from .views import ProjectGroupViewSet, ProjectViewSet, ProjectCollaboratorViewSet, ProjectInvitationViewSet, ProjectOrganizationViewSet, OrganizationProjectViewSet
from sprite_libraries.urls import SpriteLibraryViewSet, SpriteViewSet


router = DefaultRouter()
router.register(r'project-groups', ProjectGroupViewSet, basename='project-groups')
router.register(r'projects', ProjectViewSet, basename='projects')

projects_router = NestedDefaultRouter(router, r'projects', lookup='project')
projects_router.register(r'collaborators', ProjectCollaboratorViewSet, basename='project-collaborators')
projects_router.register(r'invitations', ProjectInvitationViewSet, basename='project-invitations')
projects_router.register(r'sprite_libraries', SpriteLibraryViewSet, basename='sprite-libraries')

# make a grandchild router with sprites
sprite_router = NestedDefaultRouter(projects_router, r'sprite_libraries', lookup="sprite_library")
sprite_router.register(r'sprites', SpriteViewSet, basename='sprites')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(projects_router.urls)),
    path('', include(sprite_router.urls)),

    # Manual reverse routing for organization projects patch
    # This allows the patch method to only have to be in one place
    path(
        'projects/<int:project_pk>/organizations/',
        ProjectOrganizationViewSet.as_view({'get': 'list'}),
        name='project-organization-get'
    ),
    path(
        'projects/<int:pk>/organizations/<int:organization_pk>/',
        OrganizationProjectViewSet.as_view({'patch': 'partial_update'}),
        name='project-organization-patch'
    ),
]