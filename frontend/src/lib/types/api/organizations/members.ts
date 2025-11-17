import { User } from "../users";
import { BaseFilters } from "..";

export interface OrganizationMember {
  member: User;
  invited_by?: User | null;
  joined_at: string;
  permission: string;
}

export interface OrganizationMemberFilters extends BaseFilters {
  invited_by?: number;
  permission?: string;
}

export interface OrganizationMemberPayload {
  permission: string;
}