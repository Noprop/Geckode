import api from "@/lib/api/axios";
import { Organization, OrganizationFilters, OrganizationPayload } from "@/lib/types/api/organizations";
import { PaginatedResponse } from "@/lib/types/api/pagination";
import invitationsApi from "./invitations";
import membersApi from "./members";
import bannedMembersApi from "./banned-members";
import projectsApi from "./projects";

export const ORGANIZATIONS_API_URL = 'organizations/';

const organizationsApi = Object.assign(
  {
    list: (filters?: OrganizationFilters) =>
      api.get<PaginatedResponse<Organization>>(ORGANIZATIONS_API_URL, { params: filters }).then(res => res.data),

    create: (data: OrganizationPayload) =>
      api.post<Organization>(ORGANIZATIONS_API_URL, data).then(res => res.data),
  },
  (id: number) => {
    const baseUrl = `${ORGANIZATIONS_API_URL}${id}/`;

    return {
      get: () =>
        api.get<Organization>(baseUrl).then(res => res.data),

      update: (data: OrganizationPayload) =>
        api.patch<Organization>(baseUrl, data).then(res => res.data),

      delete: () =>
        api.delete(baseUrl).then(res => res.data),

      collaborators: invitationsApi(`${baseUrl}invitations/`),

      members: membersApi(`${baseUrl}members/`),

      bannedMembers: bannedMembersApi(`${baseUrl}banned-members/`),

      projects: projectsApi(`${baseUrl}projects/`),
    }
  }
);

export default organizationsApi;