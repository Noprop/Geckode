import { User } from "../users";
import { BaseFilters } from "../filters";

export interface Organization {
  id: number;
  owner: User;
  created_at: string;
  name: string;
  slug: string;
  description: string;
  is_public: boolean;
  default_member_permission: string;
  members_count: number;
  projects_count: number;
  thumbnail: string;
}

export interface OrganizationFilters extends BaseFilters {
  owner?: number;
  is_public?: boolean;
}

export interface OrganizationPayload {
  slug: string;
  name: string;
  description?: string;
  is_public?: boolean;
  default_member_permission?: string;
  thumbnail?: File;
}