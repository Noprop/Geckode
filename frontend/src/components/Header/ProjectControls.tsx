"use client";

import { useState } from 'react';
import { GitHubLogoIcon, DownloadIcon, ResetIcon } from '@radix-ui/react-icons';
import { useEditorStore } from '@/stores/editorStore';
import { useSnackbar } from '@/hooks/useSnackbar';
import { Modal } from '@/components/ui/modals/Modal';

export default function ProjectControls() {
  const showSnackbar = useSnackbar();
  const { projectName, setProjectName, saveProject, resetProject } = useEditorStore();
  const [showResetModal, setShowResetModal] = useState(false);

  const handleSave = () => {
    saveProject(showSnackbar);
  };

  const handleResetClick = () => {
    setShowResetModal(true);
  };

  const handleResetConfirm = () => {
    resetProject();
    setShowResetModal(false);
    showSnackbar('Project reset to default state', 'success');
  };

  const handleResetCancel = () => {
    setShowResetModal(false);
  };

  return (
    <>
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
          onClick={handleResetClick}
          title="Reset Project"
          className="flex items-center justify-center w-8 h-8 rounded-md bg-white/15 text-white hover:bg-white/25 transition-colors"
        >
          <ResetIcon className="w-4 h-4" />
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

      {showResetModal && (
        <Modal
          title="Reset Project"
          text="Are you sure you want to reset the project? This will clear all blocks and sprites, keeping only the default hero sprites. This action cannot be undone."
          onClose={handleResetCancel}
          actions={
            <>
              <button
                onClick={handleResetConfirm}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Reset
              </button>
              <button
                onClick={handleResetCancel}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </>
          }
        />
      )}
    </>
  );
}
