import api from "@/lib/api/axios";
import { OrganizationInvitation, OrganizationInvitationFilters, OrganizationInvitationPayload } from "@/lib/types/api/organizations/invitations";
import { PaginatedResponse } from "@/lib/types/api/pagination";

const invitationsApi = (baseUrl: string) => Object.assign(
  {
    list: (filters?: OrganizationInvitationFilters) =>
      api.get<PaginatedResponse<OrganizationInvitation>>(baseUrl, { params: filters }).then(res => res.data),

    create: (data: OrganizationInvitationPayload) =>
      api.post<OrganizationInvitation>(baseUrl, data).then(res => res.data),
  },
  (id: number) => {
    const url = `${baseUrl}${id}/`;

    return {
      get: () =>
        api.get<OrganizationInvitation>(url).then(res => res.data),

      delete: () =>
        api.delete(url).then(res => res.data),
    }
  }
);

export default invitationsApi;