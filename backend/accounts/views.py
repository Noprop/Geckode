from rest_framework.generics import CreateAPIView
from rest_framework import permissions
from .serializers import RegisterSerializer, UserSearchSerializer, PublicUserSerializer
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from functools import reduce
from operator import or_

class RegisterView(CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class UserSearchView(APIView):
    def get(self, request):
        serializer = UserSearchSerializer(data=request.query_params)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        params = serializer.validated_data
        users = User.objects.filter(reduce(or_, (Q(**{f"{field}__icontains": params['search']}) for field in PublicUserSerializer.Meta.fields)))[:params['limit']]
        serialized_users = PublicUserSerializer(users, many=True)

        return Response(serialized_users.data)