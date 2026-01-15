import { createBaseApi } from "../base";
import { Organization, OrganizationFilters, OrganizationPayload } from "@/lib/types/api/organizations";
import { OrganizationMember, OrganizationMemberFilters, OrganizationMemberPayload } from "@/lib/types/api/organizations/members";
import { OrganizationInvitation, OrganizationInvitationFilters, OrganizationInvitationPayload } from "@/lib/types/api/organizations/invitations";
import { OrganizationBannedMember, OrganizationBannedMemberFilters, OrganizationBannedMemberPayload } from "@/lib/types/api/organizations/banned-members";
import { OrganizationProject, OrganizationProjectFilters, OrganizationProjectPayload } from "@/lib/types/api/organizations/projects";

export const ORGANIZATIONS_API_URL = 'organizations/';
export const organizationInvitationsApiUrl = (id: number | string) => `${ORGANIZATIONS_API_URL}${id}/invitations/`;
export const organizationMembersApiUrl = (id: number | string) => `${ORGANIZATIONS_API_URL}${id}/members/`;
export const organizationBannedMembersApiUrl = (id: number | string) => `${ORGANIZATIONS_API_URL}${id}/banned-members/`;
export const organizationProjectsApiUrl = (id: number | string) => `${ORGANIZATIONS_API_URL}${id}/projects/`;

const organizationsApi = createBaseApi<Organization, OrganizationPayload, OrganizationFilters>({
  baseUrl: ORGANIZATIONS_API_URL
})({
  invitationsApi: (id: number | string) => createBaseApi<OrganizationInvitation, OrganizationInvitationPayload, OrganizationInvitationFilters>({
    baseUrl: organizationInvitationsApiUrl(id)
  })(),
  members: (id: number | string) => createBaseApi<OrganizationMember, OrganizationMemberPayload, OrganizationMemberFilters>({
    baseUrl: organizationMembersApiUrl(id)
  })(),
  bannedMembers: (id: number | string) => createBaseApi<OrganizationBannedMember, OrganizationBannedMemberPayload, OrganizationBannedMemberFilters>({
    baseUrl: organizationBannedMembersApiUrl(id)
  })(),
  projects: (id: number | string) => createBaseApi<OrganizationProject, OrganizationProjectPayload, OrganizationProjectFilters>({
    baseUrl: organizationProjectsApiUrl(id)
  })(),
});

export default organizationsApi;