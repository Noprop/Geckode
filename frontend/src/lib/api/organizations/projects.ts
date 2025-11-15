import api from "@/lib/api/axios";
import { OrganizationProject, OrganizationProjectPayload } from "@/lib/types/api/organizations/projects";
import { ProjectFilters } from "@/lib/types/api/projects";
import { PaginatedResponse } from "@/lib/types/api/pagination";

const projectsApi = (baseUrl: string) => ({
  list: (filters?: ProjectFilters) =>
    api.get<PaginatedResponse<OrganizationProject>>(baseUrl, { params: filters }).then(res => res.data),

  get: (id: number) =>
    api.get<OrganizationProject>(`${baseUrl}${id}/`).then(res => res.data),

  create: (data: OrganizationProjectPayload) =>
    api.post<OrganizationProject>(baseUrl, data).then(res => res.data),

  update: (id: number, data: Omit<Partial<OrganizationProjectPayload>, 'project_id'>) =>
    api.patch<OrganizationProject>(`${baseUrl}${id}/`, data).then(res => res.data),

  delete: (id: number) =>
    api.delete(`${baseUrl}${id}/`).then(res => res.data),
});

export default projectsApi;