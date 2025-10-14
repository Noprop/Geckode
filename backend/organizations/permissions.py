from rest_framework.permissions import BasePermission

class HasOrganizationPermission(BasePermission):
    def __init__(self, user_fields, permission):
        self.user_fields = user_fields
        self.permission = permission

    def has_object_permission(self, request, view, obj):
        for user_field in self.user_fields:
            if getattr(obj, user_field) == request.user:
                return True

        return obj.has_permission(request.user, self.permission)