from geckode.utils import create_object_permission_class
from .models import Organization, OrganizationInvitation, OrganizationMember

def create_organization_permission_class(permission_required, user_override_fields, type=None):
    class HasPermission(create_object_permission_class(permission_required, user_override_fields)):
        def has_permission(self, request, view):
            if id := view.kwargs.get('pk'):
                if type == 'invitation':
                    try:
                        invitation = OrganizationInvitation.objects.get(id=id)
                        for user_field in user_override_fields:
                            if getattr(invitation, user_field) == request.user:
                                return True
                    except OrganizationInvitation.DoesNotExist:
                        pass
                elif type == 'member':
                    try:
                        member = OrganizationMember.objects.get(organization__id=view.kwargs.get('organization_pk'), member__id=id)
                        for user_field in user_override_fields:
                            if getattr(member, user_field) == request.user:
                                print('true here')
                                return True
                    except OrganizationMember.DoesNotExist:
                        pass

            try:
                organization = Organization.objects.get(id=view.kwargs.get('organization_pk'))
                return organization.has_permission(request.user, permission_required)
            except Organization.DoesNotExist:
                pass

            return super().has_permission(request, view)

    return HasPermission