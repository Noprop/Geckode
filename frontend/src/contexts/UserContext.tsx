"use client";

import { User } from "@/lib/types/api/users";
import { createContext, useContext, ReactNode } from "react";

const UserContext = createContext<User | null>(null);

export function UserProvider({ children, user }: { children: ReactNode, user: User | null }) {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);