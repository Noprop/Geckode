"use client";

import Link from "next/link";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  HomeIcon,
  QuestionMarkCircledIcon,
  PersonIcon,
  SunIcon,
  MoonIcon,
} from '@radix-ui/react-icons';
import WorkspaceToggle from './WorkspaceToggle';
import { useTheme } from '@/contexts/ThemeContext';

export default function Header() {
  const { resolvedTheme, toggleTheme } = useTheme();
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
          <Image
            src="/Geckode-logo-cropped.png"
            alt="Geckode"
            width={180}
            height={40}
            className="h-10 w-auto object-cover object-center"
            style={{ objectPosition: 'center 42%' }}
            priority
          />
        </Link>
      </div>

      {/* Center section - Workspace Toggle */}
      <div className="flex items-center justify-center flex-1">
        <WorkspaceToggle />
      </div>

      {/* Right section - Utility actions */}
      <div className="flex items-center justify-end flex-1 gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
          title={
            !mounted
              ? 'Loading theme...'
              : resolvedTheme === 'dark'
              ? 'Switch to light mode'
              : 'Switch to dark mode'
          }
        >
          {mounted ? (
            resolvedTheme === 'dark' ? (
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
