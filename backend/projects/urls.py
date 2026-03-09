from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter
from .views import ProjectGroupViewSet, ProjectViewSet, ProjectCollaboratorViewSet, ProjectInvitationViewSet, ProjectOrganizationViewSet, OrganizationProjectViewSet, AssetViewSet, ProjectShareLinkViewSet, public_share_link_detail


router = DefaultRouter()
router.register(r'project-groups', ProjectGroupViewSet, basename='project-groups')
router.register(r'projects', ProjectViewSet, basename='projects')

projects_router = NestedDefaultRouter(router, r'projects', lookup='project')
projects_router.register(r'collaborators', ProjectCollaboratorViewSet, basename='project-collaborators')
projects_router.register(r'invitations', ProjectInvitationViewSet, basename='project-invitations')
projects_router.register(r'assets', AssetViewSet, basename='assets')
projects_router.register(r'share-links', ProjectShareLinkViewSet, basename='project-share-links')


# exporting a general asset router for public assets
asset_router = DefaultRouter()
router.register(r'assets', AssetViewSet, basename='assets')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(projects_router.urls)),

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
    # Public game share endpoint
    path('share/<str:token>/', public_share_link_detail, name='project-share-link-public'),
]