import { Project, ProjectFilters } from "../projects";

export interface OrganizationProject {
  project: Project;
  permission: string;
}

export interface OrganizationProjectFilter extends ProjectFilters {}

export interface OrganizationProjectPayload {
  project_id: number;
  permission: string;
}