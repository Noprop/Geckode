import { User } from "../users";
import { BaseFilters } from "..";
import {ProjectLite, ProjectPermissions } from ".";

export interface ProjectInvitation {
  id: number;
  invited_at: string;
  invitee: User;
  inviter: User;
  permission: ProjectPermissions;
}

// used in list views (i.e. the user serializer)
export interface ListProjectInvitation {
  id: number | string;
  project: ProjectLite;
  inviter: number | string;
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