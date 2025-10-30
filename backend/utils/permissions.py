from rest_framework.permissions import BasePermission

def create_user_permission_class(
        permission_required,
        user_override_fields=[],
        primary_pk_class=None,
        lookup='pk',
        secondary_pk_class=None,
        secondary_pk_kwargs={},
        object_override=None,
    ):
    class PermissionClass(BasePermission):
        def has_permission(self, request, view):
            if secondary_pk_class is not None and view.kwargs.get('pk'):
                try:
                    obj = getattr(secondary_pk_class, 'objects').get(**secondary_pk_kwargs)

                    for user_field in user_override_fields:
                        if getattr(obj, user_field) == request.user:
                            return True
                except getattr(secondary_pk_class, 'DoesNotExist'):
                    pass

            if primary_pk_class is not None:
                try:
                    obj = getattr(primary_pk_class, 'objects').get(id=view.kwargs.get(lookup))
                    return obj.has_permission(request.user, permission_required)
                except getattr(primary_pk_class, 'DoesNotExist'):
                    pass

            if object_override is not None:
                return object_override.has_permission(request.user, permission_required)

            return False

        def has_object_permission(self, request, view, obj):
            if object_override:
                obj = object_override

            for user_field in user_override_fields:
                if getattr(obj, user_field) == request.user:
                    return True

            return obj.has_permission(request.user, permission_required)

    return PermissionClass

class AnyOf(BasePermission):
    def __init__(self, *permission_classes):
        self.permission_classes = permission_classes

    def has_permission(self, request, view):
        return any(permission.has_permission(request, view) for permission in self.permission_classes)

    def has_object_permission(self, request, view, obj):
        return any(permission.has_object_permission(request, view, obj) for permission in self.permission_classes)