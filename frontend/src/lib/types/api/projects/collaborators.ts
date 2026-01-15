import { User } from "../users";
import { BaseFilters } from "..";
import { ProjectPermissions } from ".";

export interface ProjectCollaborator {
  id: number;
  collaborator: User;
  permission: ProjectPermissions;
}

export interface ProjectCollaboratorFilters extends BaseFilters {
  permission?: ProjectPermissions;
}

export interface ProjectCollaboratorPayload {
  collaborator_id: number;
  permission: ProjectPermissions;
}

export const projectCollaboratorSortKeys: (keyof User)[] = [
  "id",
  "username",
  "first_name",
  "last_name",
];

export type ProjectCollaboratorSortKeys = (typeof projectCollaboratorSortKeys)[number];