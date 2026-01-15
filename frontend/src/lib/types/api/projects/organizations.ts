import { ProjectPermissions } from ".";
import { BaseFilters } from "..";
import { Organization } from "../organizations";

export interface ProjectOrganization {
  id: number;
  organization: Organization;
  permission: ProjectPermissions;
}

export interface ProjectOrganizationFilters extends BaseFilters {}

export interface ProjectOrganizationPayload {}

export const projectOrganizationSortKeys: (keyof ProjectOrganization)[] = [
  'id',
];

export type ProjectOrganizationSortKeys = (typeof projectOrganizationSortKeys)[number];