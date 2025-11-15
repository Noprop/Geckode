import api from "@/lib/api/axios";
import { Organization, OrganizationFilters, OrganizationPayload } from "@/lib/types/api/organizations";
import { PaginatedResponse } from "@/lib/types/api/pagination";
import invitationsApi from "./invitations";
import membersApi from "./members";
import bannedMembersApi from "./banned-members";
import projectsApi from "./projects";

export const ORGANIZATIONS_API_URL = 'organizations/';

const organizationsApi = {
  list: (filters?: OrganizationFilters) =>
    api.get<PaginatedResponse<Organization>>(ORGANIZATIONS_API_URL, { params: filters }).then(res => res.data),

  get: (id: number) =>
    api.get<Organization>(`${ORGANIZATIONS_API_URL}${id}/`).then(res => res.data),

  create: (data: OrganizationPayload) =>
    api.post<Organization>(ORGANIZATIONS_API_URL, data).then(res => res.data),

  update: (id: number, data: Partial<OrganizationPayload>) =>
    api.patch<Organization>(`${ORGANIZATIONS_API_URL}${id}/`, data).then(res => res.data),

  delete: (id: number) =>
    api.delete(`${ORGANIZATIONS_API_URL}${id}/`).then(res => res.data),

  collaborators: (id: number) =>
    invitationsApi(`${ORGANIZATIONS_API_URL}${id}/invitations/`),

  members: (id: number) =>
    membersApi(`${ORGANIZATIONS_API_URL}${id}/members/`),

  bannedMembers: (id: number) =>
    bannedMembersApi(`${ORGANIZATIONS_API_URL}${id}/banned-members/`),

  projects: (id: number) =>
    projectsApi(`${ORGANIZATIONS_API_URL}${id}/projects/`),
};

export default organizationsApi;