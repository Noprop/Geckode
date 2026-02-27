import { User } from "../users";
import { BaseFilters } from "..";
import { PhaserExport } from "@/phaser/PhaserStateManager";
import { SpriteInstance } from "@/blockly/spriteRegistry";
import { Block } from '../../yjs/blocks';



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
  workspaces?: Workspace[];
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
  blocks?: {[key: string]: any};
  game_state?: {[key: string]: any};
  sprites?: {[key: string]: any};
  permission: ProjectPermissions | "owner";
}

export const projectSortKeys: (keyof Project)[] = [
  "id",
  "created_at",
  "updated_at",
  "owner",
  "name",
] as const;

interface Workspace {
  sprite: SpriteInstance;
  blocks: Block[];
}

export type ProjectSortKeys = (typeof projectSortKeys)[number];

export const projectPermissions = {
  "view": "View",
  "code": "Edit",
  "invite": "Invite",
  "admin": "Admin",
} as const;

export type ProjectPermissions = keyof typeof projectPermissions;