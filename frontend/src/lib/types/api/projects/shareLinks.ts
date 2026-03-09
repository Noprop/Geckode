import { BaseFilters } from "..";

export interface ProjectShareLink {
  id: number;
  project: number;
  name: string;
  token: string;
  yjs_blob: string | null;
  created_at: string;
  updated_at: string;
  total_visits: number;
  unique_visits: number;
}

export interface ProjectShareLinkFilters extends BaseFilters {
  name?: string;
}

export interface ProjectShareLinkPayload {
  name: string;
}

export const projectShareLinkSortKeys: (keyof ProjectShareLink)[] = [
  'id',
  'name',
  'token',
  'created_at',
  'updated_at',
  'total_visits',
  'unique_visits',
];

export type ProjectShareLinkSortKeys = (typeof projectShareLinkSortKeys)[number];
