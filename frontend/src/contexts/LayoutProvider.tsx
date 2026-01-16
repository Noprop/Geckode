"use client";

import { createContext, ReactElement, useCallback, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  HomeIcon,
  QuestionMarkCircledIcon,
  PersonIcon,
  SunIcon,
  MoonIcon,
  DrawingPinFilledIcon,
  ImageIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "@/contexts/ThemeContext";
import {
  useWorkspaceView,
  WorkspaceView,
} from "@/contexts/WorkspaceViewContext";
import DropDownButton from "@/components/ui/DropDownButton";
import { authApi } from "@/lib/api/auth";
import { User } from "@/lib/types/api/users";

export interface LayoutContextType {
  attachMiddle: (element: React.ReactElement) => void;
  attachRHS: (element: React.ReactElement) => void;
}

export const LayoutContext = createContext<LayoutContextType | null>(null);

export const useLayout = () => {
  const ctx = useContext(LayoutContext);

  if (!ctx) {
    throw new Error("useLayout must be used inside <LayoutProvider>");
  }

  return ctx;
};

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // user-added elements on the middle and right-hand side
  const [middleElement, setMiddleElement] = useState<ReactElement>();
  const [rhsElement, setRhsElement] = useState<ReactElement>();

  const attachMiddle = useCallback(
    (element: ReactElement) => setMiddleElement(element),
    []
  );

  const attachRHS = useCallback(
    (element: ReactElement) => setRhsElement(element),
    []
  );

  // Avoid hydration mismatch by waiting until mounted
  useEffect(() => {
    setMounted(true);

    authApi
      .getUserDetails()
      .then((u) => setUser(u))
      .catch(() => {});
  }, []);

  return (
    <LayoutContext.Provider value={{ attachMiddle, attachRHS }}>
      <header className="bg-primary-green flex items-center h-16 px-4 shadow-md">
        {/* Left section - Logo */}
        <div className="flex items-center flex-1">
          <Link
            href="/"
            className="hover:opacity-90 transition-opacity overflow-hidden h-10"
          >
            <p className="text-3xl">Geckode</p>
          </Link>
        </div>

        {/* Center section - Workspace Toggle */}
        <div className="flex items-center justify-center flex-1">
          {middleElement}
        </div>

        {/* Right section - Utility actions */}
        <div className="flex items-center justify-end flex-1 gap-2">
          {rhsElement}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
            title={
              !mounted
                ? "Loading theme..."
                : resolvedTheme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {mounted ? (
              resolvedTheme === "dark" ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )
            ) : (
              <div className="w-5 h-5" /> // Empty placeholder with same dimensions
            )}
          </button>

          <Link
            href="/projects"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
            title="Home"
          >
            <HomeIcon className="w-5 h-5" />
          </Link>

          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
            title="Help"
          >
            <QuestionMarkCircledIcon className="w-5 h-5" />
          </button>

          <DropDownButton
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
            title="User"
            optionsMapping={{
              ...{
                "Account Settings": "tbd",
                "My Projects": "/projects",
                "My Organizations": "/organizations",
              },
              ...(user !== null
                ? {
                    Logout: () => {
                      authApi
                        .logout()
                        .then(() => (window.location.href = "/login"));
                    },
                  }
                : { Login: "/login" }),
            }}
          >
            {
              // if user is blank or doesn't have an avatar, sub in a placeholder
              !user || !user.avatar ? (
                <PersonIcon className="w-5 h-5" />
              ) : (
                <Image
                  src={user.avatar}
                  alt=""
                  className="h-5 w-5 rounded-full"
                ></Image>
              )
            }
          </DropDownButton>
        </div>
      </header>
      {children}
    </LayoutContext.Provider>
  );
}
