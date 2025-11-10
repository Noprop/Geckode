import { Project } from "../projects";

export interface OrganizationProject {
  project: Project;
  permission: string;
}

export interface OrganizationProjectPayload {
  project_id: number;
  permission: string;
}