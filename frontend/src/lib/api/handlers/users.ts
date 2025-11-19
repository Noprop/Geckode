import { createBaseApi } from "../base";
import { User, UserPayload, UserFilters } from "@/lib/types/api/users";

export const USERS_API_URL = 'users/';

const usersApi = createBaseApi<User, UserPayload, UserFilters>({
  baseUrl: USERS_API_URL
})();

export default usersApi;