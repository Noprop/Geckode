import { Project, ProjectFilters } from "../projects";

export interface OrganizationProject {
  project: Project;
  permission: string;
}

export interface OrganizationProjectFilters extends ProjectFilters {}

export interface OrganizationProjectPayload {
  project_id: number;
  permission: string;
}

export const organizationProjectSortKeys: (keyof OrganizationProject)[] = [
  "project"
];

export type OrganizationProjectSortKeys = (typeof organizationProjectSortKeys)[number];