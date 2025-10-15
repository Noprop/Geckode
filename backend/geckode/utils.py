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

def create_user_permission_class(
        permission_required,
        user_override_fields=[],
        main_pk_class=None,
        lookup='',
        secondary_pk_class=None,
        secondary_pk_kwargs=lambda view : {},
    ):
    class PermissionClass(BasePermission):
        def has_permission(self, request, view):
            if secondary_pk_class is not None and view.kwargs.get('pk'):
                try:
                    obj = getattr(secondary_pk_class, 'objects').get(**secondary_pk_kwargs(view))

                    for user_field in user_override_fields:
                        if getattr(obj, user_field) == request.user:
                            return True
                except getattr(secondary_pk_class, 'DoesNotExist'):
                    pass

            if main_pk_class is not None:
                try:
                    obj = getattr(main_pk_class, 'objects').get(id=view.kwargs.get(f'{lookup}_pk'))
                    return obj.has_permission(request.user, permission_required)
                except getattr(main_pk_class, 'DoesNotExist'):
                    pass

            return super().has_permission(request, view)

        def has_object_permission(self, request, view, obj):
            for user_field in user_override_fields:
                if getattr(obj, user_field) == request.user:
                    return True

            return obj.has_permission(request.user, permission_required)

    return PermissionClass