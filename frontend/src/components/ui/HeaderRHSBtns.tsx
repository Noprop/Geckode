"use client";
import {
  HomeIcon,
  MoonIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DropDownButton from "./DropDownButton";
import Image from "next/image";
import { useUser } from "@/contexts/UserContext";
import { useTheme } from "@/contexts/ThemeContext";
import { authApi } from "@/lib/api/auth";

// buttons placed on the right hand side of the editor

const HeaderRHSBtns = () => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const user = useUser();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
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
    </>
  );
};

export default HeaderRHSBtns;
