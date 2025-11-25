from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter
from .views import LoginView, LogoutView, UserDetailsView, GetJWTToken, UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('users/login/', LoginView.as_view(), name='login'),
    path('users/logout/', LogoutView.as_view(), name='logout'),
    path('users/user-details/', UserDetailsView.as_view(), name='user-details'),
    path('token/', GetJWTToken.as_view(), name='token'),
    path('', include(router.urls)),
]