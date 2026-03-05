import { User } from "../users";
import { BaseFilters } from "..";
import { OrganizationLite } from '.';

export const OrgPermissions = [
  ['view', 'Can view projects'],
  ['contribute', 'Can contribute projects'],
  ['invite', 'Can invite members'],
  ['manage', 'Can remove members'],
  ['admin', 'Can modify details'],
]

export interface OrganizationInvitation {
  id: number;
  invited_at: string;
  invitee: User;
  inviter: User;
  permission: string;
}
// used for list views (i.e. user serializer)
export interface ListOrganizationInvitation {
  id: number | string;
  organization: OrganizationLite
  inviter: number | string;
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