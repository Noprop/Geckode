import { User } from "../users";
import { BaseFilters } from "..";

export interface Organization {
  id: number;
  owner: User;
  thumbnail: string;
  name: string;
  slug: string;
  created_at?: string;
  description?: string;
  is_public?: boolean;
  default_member_permission?: string;
  members_count?: number;
  projects_count?: number;
  permission?: OrganizationPermissions | "owner";
}

export interface OrganizationFilters extends BaseFilters {
  owner?: number;
  is_public?: boolean;
  has_project?: number;
  exclude_project?: number;
  has_member?: number;
  exclude_member?: number;
  user_has_permission?: OrganizationPermissions;
}

export interface OrganizationPayload {
  slug: string;
  name: string;
  description?: string;
  is_public?: boolean;
  default_member_permission?: string;
  thumbnail?: File | null;
}

export const organizationSortKeys: (keyof Organization)[] = [
  "id",
  "created_at",
  "owner",
  "name",
];

export type OrganizationSortKeys = (typeof organizationSortKeys)[number];

export const organizationPermissions = {
  "view": "View",
  "contribute": "Contribute",
  "invite": "Invite",
  "manage": "Manage",
  "admin": "Admin",
} as const;

export type OrganizationPermissions = keyof typeof organizationPermissions;