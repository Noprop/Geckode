import { Project, ProjectFilters, ProjectPermissions } from "../projects";

export interface OrganizationProject {
  project: Project;
  permission: ProjectPermissions;
}

export interface OrganizationProjectFilters extends ProjectFilters {}

export interface OrganizationProjectPayload {
  project_id: number;
  permission: ProjectPermissions;
}

export const organizationProjectSortKeys: (keyof OrganizationProject)[] = [
  "project",
];

export type OrganizationProjectSortKeys = (typeof organizationProjectSortKeys)[number];