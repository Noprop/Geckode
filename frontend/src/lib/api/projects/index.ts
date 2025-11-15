import api from "@/lib/api/axios";
import { PaginatedResponse } from "@/lib/types/api/pagination";
import collaboratorsApi from "./collaborators";
import groupsApi from "./groups";
import { Project, ProjectFilters, ProjectPayload } from "@/lib/types/api/projects";

export const PROJECTS_API_URL = 'projects/';

const projectsApi = {
  list: (filters?: ProjectFilters) =>
    api.get<PaginatedResponse<Project>>(PROJECTS_API_URL, { params: filters }).then(res => res.data),

  get: (id: number) =>
    api.get<Required<Project>>(`${PROJECTS_API_URL}${id}/`).then(res => res.data),

  create: (data: ProjectPayload) =>
    api.post<Project>(PROJECTS_API_URL, data).then(res => res.data),

  update: (id: number, data: Partial<ProjectPayload>) =>
    api.patch<Project>(`${PROJECTS_API_URL}${id}/`, data).then(res => res.data),

  delete: (id: number) =>
    api.delete(`${PROJECTS_API_URL}${id}/`).then(res => res.data),

  groups: groupsApi(`project-groups/`),

  collaborators: (id : number) =>
    collaboratorsApi(`${PROJECTS_API_URL}${id}/collaborators/`),
};

export default projectsApi;