"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { authApi } from "@/lib/api/auth";
import { User } from "@/lib/types/api/users";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  user: User | null;
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ user, children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(user);

  const login = async (username: string, password: string) => {
    try {
      const user = await authApi.login({ username, password });
      setCurrentUser(user);
    } catch (err) {
      console.error("Login failed", err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setCurrentUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user: currentUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};