import type { User } from "@/lib/types/api/users";

let currentUser: User | null = null;

export function setCurrentUser(user: User | null) {
  currentUser = user;
}

export function getCurrentUser(): User | null {
  return currentUser;
}