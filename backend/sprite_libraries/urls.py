from django.urls import path, include
from rest_framework_nested.routers import DefaultRouter, NestedDefaultRouter
from .views import SpriteLibraryViewSet, SpriteViewSet


router = DefaultRouter()
router.register(r'sprite_libraries', SpriteLibraryViewSet, basename='sprite-libraries')

sprite_libraries_router = NestedDefaultRouter(router, r'sprite_libraries', lookup='sprite_library')
sprite_libraries_router.register(r'sprites', SpriteViewSet, basename='sprites')


# NOTE: Paths are appended to /projects/<int:pk>/ in projects.urls
urlpatterns = [
    path('', include(router.urls)),
    path('', include(sprite_libraries_router.urls)),
]