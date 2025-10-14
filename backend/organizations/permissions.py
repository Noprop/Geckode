from rest_framework.permissions import BasePermission
from .models import Organization, OrganizationInvitation, OrganizationMember

def create_organization_permission_class(user_fields, permission, type=None):
    class HasPermission(BasePermission):
        def has_permission(self, request, view):
            id = view.kwargs.get('pk')

            if id:
                if type == 'invitation':
                    try:
                        invitation = OrganizationInvitation.objects.get(id=id)
                        for user_field in user_fields:
                            if getattr(invitation, user_field) == request.user:
                                return True
                    except OrganizationInvitation.DoesNotExist:
                        pass
                elif type == 'member':
                    try:
                        member = OrganizationMember.objects.get(member=id)
                        for user_field in user_fields:
                            if getattr(member, user_field) == request.user:
                                return True
                    except OrganizationMember.DoesNotExist:
                        pass

            try:
                organization = Organization.objects.get(id=view.kwargs.get('organization_pk'))
                return organization.has_permission(request.user, permission)
            except Organization.DoesNotExist:
                pass
            
            return super().has_permission(request, view)

        def has_object_permission(self, request, view, obj):
            for user_field in user_fields:
                if getattr(obj, user_field) == request.user:
                    return True

            return obj.has_permission(request.user, permission)

    return HasPermission