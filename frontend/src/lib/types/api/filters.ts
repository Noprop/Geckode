import { PaginationParams } from "./pagination";

export interface BaseFilters extends PaginationParams {
  search?: string;
  ordering?: string;
}
