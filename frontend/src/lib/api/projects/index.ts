import api from "@/lib/api/axios";
import { PaginatedResponse } from "@/lib/types/api/pagination";
import collaboratorsApi from "./collaborators";
import groupsApi from "./groups";
import { Project, ProjectFilters, ProjectPayload } from "@/lib/types/api/projects";

export const PROJECTS_API_URL = 'projects/';

const projectsApi = Object.assign(
  {
    list: (filters?: ProjectFilters) =>
      api.get<PaginatedResponse<Project>>(PROJECTS_API_URL, { params: filters }).then(res => res.data),

    create: (data: ProjectPayload) =>
      api.post<Project>(PROJECTS_API_URL, data).then(res => res.data),

    groups: groupsApi(`project-groups/`),
  },
  (id: number) => {
    const baseUrl = `${PROJECTS_API_URL}${id}/`;

    return {
      get: () =>
        api.get<Project>(baseUrl).then(res => res.data),

      update: (data: ProjectPayload) =>
        api.patch<Project>(baseUrl, data).then(res => res.data),

      delete: () =>
        api.delete(baseUrl).then(res => res.data),

      collaborators: collaboratorsApi(`${baseUrl}collaborators/`),
    }
  }
);

export default projectsApi;