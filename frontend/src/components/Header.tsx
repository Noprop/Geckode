"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  HomeIcon,
  QuestionMarkCircledIcon,
  PersonIcon,
  SunIcon,
  MoonIcon,
  DrawingPinFilledIcon,
  ImageIcon,
  GitHubLogoIcon,
  DownloadIcon,
} from '@radix-ui/react-icons';
import { useTheme } from '@/contexts/ThemeContext';
import TabSelector from './ui/selectors/TabSelector';
import { useWorkspaceView, WorkspaceView } from '@/contexts/WorkspaceViewContext';
import DropDownButton from './ui/DropDownButton';
import { useEditorStore } from '@/stores/editorStore';
import { useSnackbar } from '@/hooks/useSnackbar';

export default function Header() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { view, setView } = useWorkspaceView();
  const [mounted, setMounted] = useState(false);
  const showSnackbar = useSnackbar();
  const { projectName, setProjectName, saveProject } = useEditorStore();

  // Avoid hydration mismatch by waiting until mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSave = () => {
    saveProject(showSnackbar);
  };

  return (
    <header className="bg-primary-green flex items-center h-16 px-4 shadow-md">
      {/* Left section - Logo */}
      <div className="flex items-center">
        <Link href="/" className="hover:opacity-90 transition-opacity overflow-hidden h-10">
          <p className="text-3xl">Geckode</p>
        </Link>
      </div>

      {/* Project controls section - Scratch style */}
      <div className="flex items-center gap-2 ml-6">
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project Name"
          className="h-8 px-3 rounded-md bg-white/15 text-white text-sm placeholder-white/60 outline-none border border-white/20 transition focus:bg-white/25 focus:border-white/40"
          style={{ width: '160px' }}
        />
        <button
          onClick={handleSave}
          title="Save Project"
          className="flex items-center justify-center w-8 h-8 rounded-md bg-white/15 text-white hover:bg-white/25 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
        </button>
        <button
          title="GitHub (Coming Soon)"
          className="flex items-center justify-center w-8 h-8 rounded-md bg-white/15 text-white hover:bg-white/25 transition-colors"
        >
          <GitHubLogoIcon className="w-4 h-4" />
        </button>
        <button
          title="Download (Coming Soon)"
          className="flex items-center justify-center w-8 h-8 rounded-md bg-white/15 text-white hover:bg-white/25 transition-colors"
        >
          <DownloadIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Center section - Workspace Toggle */}
      <div className="flex items-center justify-center flex-1">
        <TabSelector<WorkspaceView>
          tab={view}
          setTab={setView}
          options={[
            { value: 'blocks', label: 'Blocks', icon: DrawingPinFilledIcon },
            { value: 'sprite', label: 'Sprite Editor', icon: ImageIcon },
          ]}
        />
      </div>

      {/* Right section - Utility actions */}
      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
          title={
            !mounted ? 'Loading theme...' : resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
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

        <DropDownButton
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/15 text-white hover:bg-white/25 transition-colors"
          title="User"
          optionsMapping={{
            'Account Settings': 'tbd',
            'My Projects': '/projects',
            'My Organizations': '/organizations',
          }}
        >
          <PersonIcon className="w-5 h-5" />
        </DropDownButton>
      </div>
    </header>
  );
}
