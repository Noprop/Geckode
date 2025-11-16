import { User } from "../users";

export interface ProjectGroup {
  id: number;
  owner: User;
  created_at: string;
  name: string;
  projects: number[];
}

export interface ProjectGroupFilters {}

export interface ProjectGroupPayload {
  name?: string;
  projects?: number[];
}