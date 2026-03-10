import { User } from "../users";
import { BaseFilters } from "..";
import { ProjectShareLink } from "./shareLinks";

export interface Project {
  id: number;
  owner: User;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  published_at: string | null;
  fork_count: number;
  thumbnail: string | null;
  permission: ProjectPermissions | "owner";
  yjs_blob?: string | null;
  default_share_link?: ProjectShareLink | null;
}

export interface ProjectFilters extends BaseFilters {
  owner?: number;
  group?: number;
  organization?: number;
  is_published?: boolean;
}

export interface ProjectPayload {
  name: string;
  description?: string;
  thumbnail?: File | null;
  yjs_blob?: string;
  default_share_link_id?: number | null;
}

export const projectSortKeys: (keyof Project)[] = [
  "id",
  "created_at",
  "updated_at",
  "owner",
  "name",
] as const;

export type ProjectSortKeys = (typeof projectSortKeys)[number];

export const projectPermissions = {
  "view": "View",
  "code": "Edit",
  "invite": "Invite",
  "admin": "Admin",
} as const;

export type ProjectPermissions = keyof typeof projectPermissions;