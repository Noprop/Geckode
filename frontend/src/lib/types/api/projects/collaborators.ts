import { User } from "../users";
import { BaseFilters } from "..";

export const ProjectPermissions = [
  ['view', 'Can view projects'],
  ['contribute', 'Can contribute projects'],
  ['invite', 'Can invite members'],
  ['manage', 'Can remove members'],
  ['admin', 'Can modify details'],
]

export interface ProjectCollaborator {
  id: number;
  collaborator: User;
  permission: string;
}

export interface ProjectCollaboratorFilters extends BaseFilters {
  permission?: string;
}

export interface ProjectCollaboratorPayload {
  collaborator_id: number;
  permission: string;
}

export const projectCollaboratorSortKeys: (keyof User)[] = [
  "id",
  "username",
  "first_name",
  "last_name",
];

export type ProjectCollaboratorSortKeys = (typeof projectCollaboratorSortKeys)[number];