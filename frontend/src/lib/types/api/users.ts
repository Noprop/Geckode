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

export interface UserPayload {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password2: string;
}

