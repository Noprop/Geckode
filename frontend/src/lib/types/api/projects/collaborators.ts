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