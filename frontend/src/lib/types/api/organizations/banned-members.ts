import { User } from "../users";
import { BaseFilters } from "..";

export interface OrganizationBannedMember {
  user: User;
  banned_by: User | null;
  banned_at: string;
  ban_reason: string;
}

export interface OrganizationBannedMemberFilters extends BaseFilters {
  banned_by?: number;
}

export interface OrganizationBannedMemberPayload {
  user_id: number;
  ban_reason?: string;
}