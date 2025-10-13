from rest_framework.generics import CreateAPIView
from rest_framework import permissions
from .serializers import RegisterSerializer
from .models import User

class RegisterView(CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = RegisterSerializer