"use client";

import Link from "next/link";
import { HomeIcon, QuestionMarkCircledIcon, PersonIcon } from "@radix-ui/react-icons";
import WorkspaceToggle from "./WorkspaceToggle";

export default function Header() {
  return (
    <header className="bg-primary-green flex items-center h-16 px-4 shadow-md">
      {/* Left section - Logo */}
      <div className="flex items-center flex-1">
        <Link
          href="/"
          className="text-white text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity"
        >
          Geckode
        </Link>
      </div>

      {/* Center section - Workspace Toggle */}
      <div className="flex items-center justify-center flex-1">
        <WorkspaceToggle />
      </div>

      {/* Right section - Utility actions */}
      <div className="flex items-center justify-end flex-1 gap-2">
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

        <button
          type="button"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
          title="User"
        >
          <PersonIcon className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
