import { createBaseApi } from "../base";
import { Project, ProjectFilters, ProjectPayload } from "@/lib/types/api/projects";
import { ProjectGroup, ProjectGroupFilters, ProjectGroupPayload } from "@/lib/types/api/projects/groups";
import { ProjectCollaborator, ProjectCollaboratorFilters, ProjectCollaboratorPayload } from "@/lib/types/api/projects/collaborators";
import { ProjectOrganization, ProjectOrganizationFilters, ProjectOrganizationPayload } from "@/lib/types/api/projects/organizations";
import { ProjectInvitation, ProjectInvitationFilters, ProjectInvitationPayload } from "@/lib/types/api/projects/invitations";
import { Asset, AssetFilters, AssetPayload } from "@/lib/types/api/assets/index";

export const PROJECTS_API_URL = 'projects/';
export const PROJECT_GROUPS_API_URL = 'project-groups/';
export const projectCollaboratorsApiUrl = (id: number | string) => `${PROJECTS_API_URL}${id}/collaborators/`;
export const projectOrganizationsApiUrl = (id: number | string) => `${PROJECTS_API_URL}${id}/organizations/`;
export const projectInvitationsApiUrl = (id: number | string) => `${PROJECTS_API_URL}${id}/invitations/`;
export const spriteLibrariesApiUrl = (id: number | string) => `${PROJECTS_API_URL}${id}/sprite_libraries/`;
export const assetsApiUrl = (id: number | string) => `${PROJECTS_API_URL}${id}/assets/`;

const projectsApi = createBaseApi<Project, ProjectPayload, ProjectFilters>({
  baseUrl: PROJECTS_API_URL
})({
  groups: createBaseApi<ProjectGroup, ProjectGroupPayload, ProjectGroupFilters>({
    baseUrl: PROJECT_GROUPS_API_URL
  })(),
  collaborators: (id: number | string) => createBaseApi<ProjectCollaborator, ProjectCollaboratorPayload, ProjectCollaboratorFilters>({
    baseUrl: projectCollaboratorsApiUrl(id),
  })(),
  organizations: (id: number | string) => createBaseApi<ProjectOrganization, ProjectOrganizationPayload, ProjectOrganizationFilters>({
    baseUrl: projectOrganizationsApiUrl(id),
  })(),
  invitationsApi: (id: number | string) => createBaseApi<ProjectInvitation, ProjectInvitationPayload, ProjectInvitationFilters>({
    baseUrl: projectInvitationsApiUrl(id),
  })(),
  assetsApi: (id: number | string) => createBaseApi<Asset, AssetPayload, AssetFilters>({
      baseUrl: assetsApiUrl(id)
  })(),
});

export default projectsApi;