import api from "@/lib/api/axios";
import { PaginatedResponse } from "@/lib/types/api/pagination";
import { ProjectGroup, ProjectGroupPayload } from "@/lib/types/api/projects/groups";

const groupsApi = (baseUrl: string) => ({
  list: () =>
    api.get<PaginatedResponse<ProjectGroup>>(baseUrl).then(res => res.data),

  create: (data: ProjectGroupPayload) =>
    api.post<ProjectGroup>(baseUrl, data).then(res => res.data),

  get: (id: number) =>
    api.get<ProjectGroup>(`${baseUrl}${id}/`).then(res => res.data),

  update: (id: number, data: Partial<ProjectGroupPayload>) =>
    api.patch<ProjectGroup>(`${baseUrl}${id}/`, data).then(res => res.data),

  delete: (id: number) =>
    api.delete(`${baseUrl}${id}/`).then(res => res.data),
});

export default groupsApi;