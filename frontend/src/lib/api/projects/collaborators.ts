import api from "@/lib/api/axios";
import { PaginatedResponse } from "@/lib/types/pagination";
import { OrganizationCollaborator, OrganizationCollaboratorFilters, OrganizationCollaboratorPayload } from "@/lib/types/projects/collaborators";

const collaboratorsApi = (baseUrl: string) => Object.assign(
  {
    list: (filters?: OrganizationCollaboratorFilters) =>
      api.get<PaginatedResponse<OrganizationCollaborator>>(baseUrl, { params: filters }).then(res => res.data),

    create: (data: OrganizationCollaboratorPayload) =>
      api.post<OrganizationCollaborator>(baseUrl, data).then(res => res.data),
  },
  (id: number) => {
    const url = `${baseUrl}${id}/`;

    return {
      get: () =>
        api.get<OrganizationCollaborator>(url).then(res => res.data),

      update: (data: Omit<OrganizationCollaboratorPayload, 'collaborator_id'>) =>
        api.patch<OrganizationCollaborator>(url, data).then(res => res.data),

      delete: () =>
        api.delete(url).then(res => res.data),
    }
  }
);

export default collaboratorsApi;