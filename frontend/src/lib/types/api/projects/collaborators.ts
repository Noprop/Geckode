import { User } from "../users";
import { BaseFilters } from "../filters";

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