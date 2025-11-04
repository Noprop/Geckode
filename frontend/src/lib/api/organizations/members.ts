import api from "@/lib/api/axios";
import { OrganizationMember, OrganizationMemberFilters, OrganizationMemberPayload } from "@/lib/types/organizations/members";
import { PaginatedResponse } from "@/lib/types/pagination";

const membersApi = (baseUrl: string) => Object.assign(
  {
    list: (filters?: OrganizationMemberFilters) =>
      api.get<PaginatedResponse<OrganizationMember>>(baseUrl, { params: filters }).then(res => res.data),
  },
  (id: number) => {
    const url = `${baseUrl}${id}/`;

    return {
      get: () =>
        api.get<OrganizationMember>(url).then(res => res.data),

      update: (data: OrganizationMemberPayload) =>
        api.patch<OrganizationMember>(url, data).then(res => res.data),

      delete: () =>
        api.delete(url).then(res => res.data),
    }
  }
);

export default membersApi;