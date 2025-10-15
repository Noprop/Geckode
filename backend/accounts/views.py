from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserSerializer
from .filters import UserSearchFilterBackend
from rest_framework.permissions import AllowAny
from rest_framework.permissions import BasePermission

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [UserSearchFilterBackend]

    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]

        class PermissionClass(BasePermission):
            def has_permission(self, request, view):
                return request.user and request.user.is_authenticated

            def has_object_permission(self, request, view, obj):
                return request.user.is_superuser or obj == request.user

        return super().get_permissions() + [PermissionClass()]

