from geckode.settings import REST_FRAMEWORK
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import BasePermission

def create_custom_pagination_class(**kwargs):
    defaults = {
        'page_size': REST_FRAMEWORK['PAGE_SIZE'],
        'page_size_query_param': 'limit',
        'page_query_param': 'page_number',
        'max_page_size': 100,
    }

    class CustomPagination(PageNumberPagination):
        pass

    for key, value in {**defaults, **kwargs}.items():
        setattr(CustomPagination, key, value)

    return CustomPagination

def create_object_permission_class(permission_required, user_override_fields = []):
    class ObjectPermissionClass(BasePermission):
        def has_object_permission(self, request, view, obj):
            for user_field in user_override_fields:
                if getattr(obj, user_field) == request.user:
                    return True

            return obj.has_permission(request.user, permission_required)

    return ObjectPermissionClass