import api from "@/lib/api/axios";
import { OrganizationInvitation, OrganizationInvitationFilters, OrganizationInvitationPayload } from "@/lib/types/api/organizations/invitations";
import { PaginatedResponse } from "@/lib/types/api/pagination";

const invitationsApi = (baseUrl: string) => ({
  list: (filters?: OrganizationInvitationFilters) =>
    api.get<PaginatedResponse<OrganizationInvitation>>(baseUrl, { params: filters }).then(res => res.data),

  get: (id: number) =>
    api.get<OrganizationInvitation>(`${baseUrl}${id}/`).then(res => res.data),

  create: (data: OrganizationInvitationPayload) =>
    api.post<OrganizationInvitation>(baseUrl, data).then(res => res.data),

  delete: (id: number) =>
    api.delete(`${baseUrl}${id}/`).then(res => res.data),
});

export default invitationsApi;