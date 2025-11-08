import api from "@/lib/api/axios";
import { OrganizationBannedMember, OrganizationBannedMemberFilters, OrganizationBannedMemberPayload } from "@/lib/types/api/organizations/banned-members";
import { PaginatedResponse } from "@/lib/types/api/pagination";

const bannedMembersApi = (baseUrl: string) => Object.assign(
  {
    list: (filters?: OrganizationBannedMemberFilters) =>
      api.get<PaginatedResponse<OrganizationBannedMember>>(baseUrl, { params: filters }).then(res => res.data),

    create: (data: OrganizationBannedMemberPayload) =>
      api.post<OrganizationBannedMember>(baseUrl, data).then(res => res.data),
  },
  (id: number) => {
    const url = `${baseUrl}${id}/`;

    return {
      get: () =>
        api.get<OrganizationBannedMember>(url).then(res => res.data),

      delete: () =>
        api.delete(url).then(res => res.data),
    }
  }
);

export default bannedMembersApi;