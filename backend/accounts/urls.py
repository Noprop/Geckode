from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter
from .views import LoginView, LogoutView, UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')

urlpatterns = [
    path('users/login/', LoginView.as_view(), name='login'),
    path('users/logout/', LogoutView.as_view(), name='logout'),
    path('', include(router.urls)),
]