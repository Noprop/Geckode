import { User } from "../users";
import { BaseFilters } from "..";

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
  permission: ProjectPermissions | "owner";
  // When sending over JSON, this should be a base64-encoded string.
  yjs_blob?: string;
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