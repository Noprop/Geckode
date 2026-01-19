import { User } from "../users";
import { BaseFilters } from "..";

export const PrjPermissions = [
  ['view', 'Can view projects'],
  ['contribute', 'Can contribute projects'],
  ['invite', 'Can invite members'],
  ['manage', 'Can remove members'],
  ['admin', 'Can modify details'],
]

export interface ProjectInvitation {
  id: number;
  invited_at: string;
  invitee: User;
  inviter: User;
  permission: string;
}

export interface ProjectInvitationFilters extends BaseFilters {
  invitee?: number;
  inviter?: number;
  permission?: string;
}

export interface ProjectInvitationPayload {
  invitee_id: number;
  permission: string;
}