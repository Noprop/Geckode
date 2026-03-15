import { User } from "../users";
import { BaseFilters } from "..";
import { OrganizationLite } from ".";

export const organizationPermissions = [
  ['view', 'View'],
  ['contribute', 'Contribute'],
  ['invite', 'Invite'],
  ['manage', 'Manage'],
  ['admin', 'Admin'],
] as const;

export interface OrganizationInvitation {
  id: number;
  invited_at: string;
  invitee: User;
  inviter: User;
  permission: string;
}

export type UserOrganizationInvitation = Omit<
  OrganizationInvitation,
  "invitee"
> & { organization: OrganizationLite };

export interface OrganizationInvitationFilters extends BaseFilters {
  invitee?: number;
  inviter?: number;
  permission?: string;
}

export interface OrganizationInvitationPayload {
  invitee_id: number;
  permission: string;
}

export const organizationInvitationSortKeys: (keyof OrganizationInvitation)[] = [
  "id",
  "invited_at",
  "invitee",
  "inviter",
  "permission",
];

export type OrganizationInvitationSortKeys = (typeof organizationInvitationSortKeys)[number];

export const userOrganizationInvitationSortKeys: (keyof UserOrganizationInvitation)[] = [
  "id",
  "invited_at",
  "organization",
  "inviter",
  "permission",
];

export type UserOrganizationInvitationSortKeys = (typeof userOrganizationInvitationSortKeys)[number];