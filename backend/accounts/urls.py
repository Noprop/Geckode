from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter
from .views import LoginView, LogoutView, UserDetailsView, GetJWTToken, UserViewSet, UserOrganizationInvitationViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')

users_router = NestedDefaultRouter(router, r'users', lookup='user')
users_router.register(r'organization-invitations', UserOrganizationInvitationViewSet, basename='user-organization-invitations')

urlpatterns = [
    path('users/login/', LoginView.as_view(), name='login'),
    path('users/logout/', LogoutView.as_view(), name='logout'),
    path('users/user-details/', UserDetailsView.as_view(), name='user-details'),
    path('token/', GetJWTToken.as_view(), name='token'),
    path('', include(router.urls)),
    path('', include(users_router.urls)),
]