import api from "@/lib/api/axios";
import { OrganizationBannedMember, OrganizationBannedMemberFilters, OrganizationBannedMemberPayload } from "@/lib/types/api/organizations/banned-members";
import { PaginatedResponse } from "@/lib/types/api/pagination";

const bannedMembersApi = (baseUrl: string) => ({
  list: (filters?: OrganizationBannedMemberFilters) =>
    api.get<PaginatedResponse<OrganizationBannedMember>>(baseUrl, { params: filters }).then(res => res.data),

  get: (id: number) =>
    api.get<OrganizationBannedMember>(`${baseUrl}${id}/`).then(res => res.data),

  create: (data: OrganizationBannedMemberPayload) =>
    api.post<OrganizationBannedMember>(baseUrl, data).then(res => res.data),

  delete: (id: number) =>
    api.delete(`${baseUrl}${id}/`).then(res => res.data),
});

export default bannedMembersApi;