import api from "@/lib/api/axios";
import { USERS_API_URL } from "@/lib/api/users";
import { User } from "@/lib/types/api/users";

export interface LoginPayload {
    username: string;
    password: string;
}

export const authApi = {
  login: (data: LoginPayload) => api.post<User>(`${USERS_API_URL}login/`, data).then(res => res.data),
  logout: () => api.post(`${USERS_API_URL}logout/`).then(res => res.data),
  getUserDetails: () => api.get<Required<User>>(`${USERS_API_URL}user-details/`).then(res => res.data as User),
}