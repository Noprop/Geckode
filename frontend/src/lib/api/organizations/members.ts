import api from "@/lib/api/axios";
import { OrganizationMember, OrganizationMemberFilters, OrganizationMemberPayload } from "@/lib/types/api/organizations/members";
import { PaginatedResponse } from "@/lib/types/api/pagination";

const membersApi = (baseUrl: string) => ({
  list: (filters?: OrganizationMemberFilters) =>
    api.get<PaginatedResponse<OrganizationMember>>(baseUrl, { params: filters }).then(res => res.data),

  get: (id: number) =>
    api.get<OrganizationMember>(`${baseUrl}${id}/`).then(res => res.data),

  update: (id: number, data: Partial<OrganizationMemberPayload>) =>
    api.patch<OrganizationMember>(`${baseUrl}${id}/`, data).then(res => res.data),

  delete: (id: number) =>
    api.delete(`${baseUrl}${id}/`).then(res => res.data),
});

export default membersApi;