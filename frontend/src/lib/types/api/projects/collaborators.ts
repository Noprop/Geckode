import { User } from "../users";
import { BaseFilters } from "../filters";

export interface OrganizationCollaborator {
  collaborator: User;
  permission: string;
}

export interface OrganizationCollaboratorFilters extends BaseFilters {
  permission?: string;
}

export interface OrganizationCollaboratorPayload {
  collaborator_id: number;
  permission: string;
}