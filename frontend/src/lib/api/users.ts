import api from "@/lib/api/axios";
import { BaseFilters } from "../types/filters";
import { PaginatedResponse } from "../types/pagination";
import { User, UserPayload } from "../types/users";

export const USERS_API_URL = 'users/';

export const usersApi = {
  get: (id: number) =>
    api.get<User>(`${USERS_API_URL}${id}`).then(res => res.data),

  list: (filters?: BaseFilters) =>
    api.get<PaginatedResponse<User>>(USERS_API_URL, { params: filters }).then(res => res.data),

  create: (data: UserPayload) =>
    api.post<Required<User>>(USERS_API_URL, data).then(res => res.data),

  update: (id: number, data: UserPayload) =>
    api.patch<Required<User>>(`${USERS_API_URL}${id}`, data).then(res => res.data),

  delete: (id: number) =>
    api.delete(`${USERS_API_URL}${id}`).then(res => res.data),
};