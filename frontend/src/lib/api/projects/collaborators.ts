import api from "@/lib/api/axios";
import { PaginatedResponse } from "@/lib/types/api/pagination";
import { ProjectCollaborator, ProjectCollaboratorFilters, ProjectCollaboratorPayload } from "@/lib/types/api/projects/collaborators";

const collaboratorsApi = (baseUrl: string) => ({
  list: (filters?: ProjectCollaboratorFilters) =>
    api.get<PaginatedResponse<ProjectCollaborator>>(baseUrl, { params: filters }).then(res => res.data),

  get: (id: number) =>
    api.get<ProjectCollaborator>(`${baseUrl}${id}/`).then(res => res.data),

  create: (data: ProjectCollaboratorPayload) =>
    api.post<ProjectCollaborator>(baseUrl, data).then(res => res.data),

  update: (id: number, data: Omit<Partial<ProjectCollaboratorPayload>, 'collaborator_id'>) =>
    api.patch<ProjectCollaborator>(`${baseUrl}${id}/`, data).then(res => res.data),

  delete: (id: number) =>
    api.delete(`${baseUrl}${id}/`).then(res => res.data),
});

export default collaboratorsApi;