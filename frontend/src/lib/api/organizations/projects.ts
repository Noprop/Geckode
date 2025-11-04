import api from "@/lib/api/axios";
import { OrganizationProject, OrganizationProjectPayload } from "@/lib/types/organizations/projects";
import { ProjectFilters } from "@/lib/types/projects";
import { PaginatedResponse } from "@/lib/types/pagination";

const projectsApi = (baseUrl: string) => Object.assign(
  {
    list: (filters?: ProjectFilters) =>
      api.get<PaginatedResponse<OrganizationProject>>(baseUrl, { params: filters }).then(res => res.data),

    create: (data: OrganizationProjectPayload) =>
      api.post<OrganizationProject>(baseUrl, data).then(res => res.data),
  },
  (id: number) => {
    const url = `${baseUrl}${id}/`;

    return {
      get: () =>
        api.get<OrganizationProject>(url).then(res => res.data),

      update: (data: Omit<OrganizationProjectPayload, 'project_id'>) =>
        api.patch<OrganizationProject>(url, data).then(res => res.data),

      delete: () =>
        api.delete(url).then(res => res.data),
    }
  }
);

export default projectsApi;