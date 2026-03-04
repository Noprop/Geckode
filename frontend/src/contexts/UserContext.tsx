"use client";

import { User } from "@/lib/types/api/users";
import { createContext, useContext, ReactNode, useEffect } from "react";
import { setCurrentUser } from "./currentUser";

const UserContext = createContext<User | null>(null);

export function UserProvider({ children, user }: { children: ReactNode, user: User | null }) {
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);