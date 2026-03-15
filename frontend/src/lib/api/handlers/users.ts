import { OrganizationInvitationFilters, OrganizationInvitationPayload, UserOrganizationInvitation } from "@/lib/types/api/organizations/invitations";
import { createBaseApi } from "../base";
import { User, UserPayload, UserFilters } from "@/lib/types/api/users";

export const USERS_API_URL = 'users/';
export const userOrganizationInvitationsApiUrl = (id: number | string) => `${USERS_API_URL}${id}/organization-invitations/`;

const usersApi = createBaseApi<User, UserPayload, UserFilters>({
  baseUrl: USERS_API_URL
})({
  organizationInvitations: (id: number | string) =>
    createBaseApi<UserOrganizationInvitation, OrganizationInvitationPayload, OrganizationInvitationFilters>({
      baseUrl: userOrganizationInvitationsApiUrl(id)
    })(),
});

export default usersApi;