from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter
from .views import ProjectGroupViewSet, ProjectViewSet, ProjectCollaboratorViewSet

router = DefaultRouter()
router.register(r'project-groups', ProjectGroupViewSet, basename='project-groups')
router.register(r'projects', ProjectViewSet, basename='projects')

projects_router = NestedDefaultRouter(router, r'projects', lookup='project')
projects_router.register(r'collaborators', ProjectCollaboratorViewSet, basename='project-collaborators')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(projects_router.urls)),
]