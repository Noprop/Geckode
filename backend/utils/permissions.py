from rest_framework.permissions import BasePermission

'''
Function that creates user permission classes for model view sets

has_permission() determines if the user is able to access the request in general
has_object_permission() determines if the user is able to do modify the object (put, patch, delete)

The model related to the model view set this function is being used on MUST have a has_permission() function (look at Organization for an example)

Function parameters:
permission_required: The permission that the user requires
user_override_fields: These model fields allow the requesting user the override the permission if they match
    Ex: If user is the invitee of an organization invitation, give them permission to delete the object (i.e. reject the invitation)
primary_pk_class: The model to run has_permission() on during has_permission() (access to the view in general)
lookup: MUST BE PASSED WITH primary_pk_class --- the view.kwargs.get() lookup from drf nested routers
    Ex: /api/organizations/{id}/members/ - a user should only have access to the model view set in general if they have permission the organization's permission
        In this case, primary_pk_class = Organization and lookup = 'organization_pk' (defined by the drf nested router url in urls.py)
secondary_pk_class: The model to check user_override_fields on in has_permission()
    THIS DOES NOTHING IF user_override_fields IS EMPTY
secondary_pk_kwargs: MUST BE PASSED WITH secondary_pk_class --- The fields to get the secondary_pk_class model object to check the user_override_fields on
object_override: A specific model object to run has_permission() on in both has_permission() and has_object_permission()
    This is for extremely custom cases and theoretically no other parameters should need to be passed if this is passed
'''
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

# Transform permissions to a hierarchy where allowed permissions for a permission is all permissions below it
def create_permissions_allowed_hierarchy(permissions):
    return {
        choice[0]: [choice[0] for choice in permissions[i:]]
        for i, choice in enumerate(permissions)
    }