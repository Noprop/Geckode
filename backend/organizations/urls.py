from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter
from .views import OrganizationViewSet, OrganizationInvitationViewSet, OrganizationMemberViewSet, OrganizationBannedMemberViewSet
from projects.views import OrganizationProjectViewSet

router = DefaultRouter()
router.register(r'organizations', OrganizationViewSet, basename='organizations')

organizations_router = NestedDefaultRouter(router, r'organizations', lookup='organization')
organizations_router.register(r'invitations', OrganizationInvitationViewSet, basename='organization-invitations')
organizations_router.register(r'members', OrganizationMemberViewSet, basename='organization-members')
organizations_router.register(r'projects', OrganizationProjectViewSet, basename='organization-projects')
organizations_router.register(r'banned-members', OrganizationBannedMemberViewSet, basename='organization-banned-members')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(organizations_router.urls)),
]