import { User } from "../users";
import { BaseFilters } from "../filters";
import { SpriteInstance } from "@/components/SpriteEditor";

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
  blocks?: JSON | null;
  game_state?: JSON | null;
  sprites?: SpriteInstance[];
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
  thumbnail?: File;
  blocks?: {[key: string]: any} | null;
  game_state?: {[key: string]: any} | null;
  sprites?: {[key: string]: any} | null;
}