import api from "@/lib/api/axios";
import { PaginatedResponse } from "@/lib/types/api/pagination";
import { ProjectGroup, ProjectGroupPayload } from "@/lib/types/api/projects/groups";

const groupsApi = (baseUrl: string) => Object.assign(
  {
    list: () =>
      api.get<PaginatedResponse<ProjectGroup>>(baseUrl).then(res => res.data),

    create: (data: ProjectGroupPayload) =>
      api.post<ProjectGroup>(baseUrl, data).then(res => res.data),
  },
  (id: number) => {
    const url = `${baseUrl}${id}/`;

    return {
      get: () =>
        api.get<ProjectGroup>(url).then(res => res.data),

      update: (data: ProjectGroupPayload) =>
        api.patch<ProjectGroup>(url, data).then(res => res.data),

      delete: () =>
        api.delete(url).then(res => res.data),
    }
  }
);

export default groupsApi;