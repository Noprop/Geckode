import { BaseFilters } from ".";

export interface User {
  id: number;
  created_at?: string;
  username: string;
  email?: string;
  first_name: string;
  last_name: string;
  is_staff?: boolean;
  is_superuser?: boolean;
  avatar: string | null;
}

export interface UserFilters extends BaseFilters {
  exclude_project: number;
  exclude_organization: number;
}

export interface UserPayload {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password2: string;
}

export const userSortKeys: (keyof User)[] = [
  "id",
  "username",
  "first_name",
  "last_name",
];

export type UserSortKeys = (typeof userSortKeys)[number];