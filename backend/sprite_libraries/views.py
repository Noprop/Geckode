from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from .filters import *
from utils.permissions import create_user_permission_class
from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from .serializers import SpriteSerializer, SpriteLibrarySerializer
from .models import SpriteLibrary, Sprite
from .filters import SpriteFilter, SpriteLibraryFilter

class SpriteLibraryViewSet(ModelViewSet):
    queryset = SpriteLibrary.objects.all()
    serializer_class = SpriteLibrarySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = SpriteLibraryFilter

    http_method_names = ['get', 'post', 'patch', 'delete']

    def perform_create(self, serializer):
        # note if project is null, project_id = none
        project_id = self.kwargs.get("project_pk")
        serializer.save(project_id=project_id)

    def get_queryset(self):
        return super().get_queryset().filter(Q(project_id=self.kwargs.get('project_pk')))
    
    


class SpriteViewSet(ModelViewSet):
    queryset = Sprite.objects.all()
    serializer_class = SpriteSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = SpriteFilter

    http_method_names = ['get', 'post', 'patch', 'delete']

    def perform_create(self, serializer):
        # note if project is null, project_id = none
        spl_id = self.kwargs.get("sprite_library_pk")
        serializer.save(sprite_library_id=spl_id)

    def get_queryset(self):
        return super().get_queryset().filter(Q(sprite_library_id=self.kwargs.get('sprite_library_pk')))

    