from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, BasePermission
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED
from rest_framework.viewsets import ModelViewSet
from .models import User
from .serializers import UserSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import UserFilter
from rest_framework.request import HttpRequest, Request
import jwt
import datetime
from django.conf import settings

class LoginView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request : HttpRequest) -> Response:
        user = authenticate(request, username=request.data.get("username"), password=request.data.get("password"))

        if user is not None:
            login(request, user)
            return Response(UserSerializer(user).data)
        else:
            return Response({"detail": "Invalid credentials"}, status=HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    def post(self, request : HttpRequest) -> Response :
        logout(request)
        return Response({"detail": "Logged out"})

class UserDetailsView(APIView):
    def get(self, request : Request):
        return Response(UserSerializer(request.user).data)

class GetJWTToken(APIView):
    def get(self, request):
        token = jwt.encode(
            {
                "user_id": request.user.id,
                "username": request.user.username,
                "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=5)
            },
            settings.SECRET_KEY,
            algorithm="HS256"
        )

        return Response({"access_token": token})

class UserViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserFilter

    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_permissions(self) -> list[any]:
        if self.request.method == 'POST':
            return [AllowAny()]

        class PermissionClass(BasePermission):
            def has_object_permission(self, request, view, obj):
                return request.user.is_superuser or obj == request.user

        return super().get_permissions() + [PermissionClass()]