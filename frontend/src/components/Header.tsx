"use client";

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
import TabSelector from "./ui/selectors/TabSelector";
import {
  useWorkspaceView,
  WorkspaceView,
} from "@/contexts/WorkspaceViewContext";
import DropDownButton from "./ui/DropDownButton";
import { authApi } from "@/lib/api/auth";

export default function Header() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { view, setView } = useWorkspaceView();
  const [mounted, setMounted] = useState(false);
  // Avoid hydration mismatch by waiting until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
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
        <TabSelector<WorkspaceView>
          tab={view}
          setTab={setView}
          options={[
            { value: "blocks", label: "Blocks", icon: DrawingPinFilledIcon },
            { value: "sprite", label: "Sprite Editor", icon: ImageIcon },
          ]}
        />
      </div>

      {/* Right section - Utility actions */}
      <div className="flex items-center justify-end flex-1 gap-2">
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
  );
}
