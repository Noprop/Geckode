import { User } from "../users";
import { BaseFilters } from "..";

export interface OrganizationInvitation {
  id: number;
  invited_at: string;
  invitee: User;
  inviter: User;
  permission: string;
}

export interface OrganizationInvitationFilters extends BaseFilters {
  invitee?: number;
  inviter?: number;
  permission?: string;
}

export interface OrganizationInvitationPayload {
  invitee_id: number;
  permission: string;
}