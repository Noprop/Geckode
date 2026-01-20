import { User } from "../users";
import { BaseFilters } from "..";
import { ProjectPermissions } from ".";

export interface ProjectInvitation {
  id: number;
  invited_at: string;
  invitee: User;
  inviter: User;
  permission: ProjectPermissions;
}

export interface ProjectInvitationFilters extends BaseFilters {
  invitee?: number;
  inviter?: number;
  permission?: ProjectPermissions;
}

export interface ProjectInvitationPayload {
  invitee_id: number;
  permission: ProjectPermissions;
}