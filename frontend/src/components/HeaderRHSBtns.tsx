"use client";
import {
  HomeIcon,
  MoonIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
  Share1Icon,
  SunIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DropDownButton from "./ui/DropDownButton";
import Image from "next/image";
import { authApi } from "@/lib/api/auth";
import { useUser } from "@/contexts/UserContext";
import { useTheme } from "@/contexts/ThemeContext";

interface HeaderButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  title?: string;
  icon?: React.ComponentType<any>;
  href?: string;
}

const HeaderButton = ({
  onClick = () => {},
  title,
  icon: Icon,
  href,
}: HeaderButtonProps) => {
  const icon = Icon ? <Icon className="w-5 h-5" /> : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 text-white
        hover:bg-white/25 transition-color cursor-pointer"
      title={title}
    >{
      href
        ? (
          <Link
            href={href}
          >{icon}</Link>
        ) : icon
    }</button>
  )
};

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
      {" "}
      <HeaderButton
        title="Share Project"
        icon={Share1Icon}
      />
      <HeaderButton
        onClick={toggleTheme}
        title={
          !mounted
            ? "Loading theme..."
            : resolvedTheme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
        }
        icon={
          mounted
            ? resolvedTheme === "dark"
              ? SunIcon
              : MoonIcon
            : undefined
        }
      />
      <HeaderButton
        title="Home"
        icon={HomeIcon}
        href={"/projects"}
      />
      <HeaderButton
        title="Help"
        icon={QuestionMarkCircledIcon}
      />
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
