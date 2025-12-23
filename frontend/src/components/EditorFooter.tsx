"use client";

import * as Blockly from 'blockly/core';
import { Button } from './ui/Button';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useEditorStore } from '@/stores/editorStore';
import { GitHubLogoIcon, DownloadIcon } from '@radix-ui/react-icons';

const EditorFooter = () => {
  const showSnackbar = useSnackbar();
  const {
    // changeScene,
    // exportWorkspaceState,
    projectName,
    setProjectName,
    saveProject,
    undoWorkspace,
    redoWorkspace,
  } = useEditorStore();

  const handlePhaserFocus = () => {
    if (typeof Blockly.hideChaff === 'function') {
      Blockly.hideChaff();
    }

    const activeElement = document.activeElement as HTMLElement | null;
    if (activeElement && activeElement !== document.body) {
      activeElement.blur();
    }

    const container = document.getElementById(
      'game-container'
    ) as HTMLElement | null;
    container?.focus();
  };

  // Kept for future use
  // const handleChangeScene = () => {
  //   changeScene();
  //   handlePhaserFocus();
  // };

  // Kept for future use
  // const handleExportWorkspace = () => {
  //   exportWorkspaceState();
  // };

  const handleSave = () => {
    saveProject(showSnackbar);
    handlePhaserFocus();
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-14 bg-light-secondary dark:bg-dark-secondary border-t border-slate-300 dark:border-slate-600 flex z-50">
      {/* Blockly Section - matches flex-1 mr-2 from ProjectView */}
      <div className="flex-1 mr-2 flex items-center justify-end px-4 gap-2">
        {/* Kept commented out for future use:
        <Button className="btn-deny" onClick={handleChangeScene} title="Change Scene">
          Change Scene
        </Button>
        <Button
          onClick={handleExportWorkspace}
          className="btn-alt2"
          title="Export Workspace"
        >
          Export Workspace
        </Button>
        */}

        {/* Undo/Redo buttons on far right */}
        <Button
          onClick={undoWorkspace}
          className="btn-neutral"
          title="Undo"
          style={{ background: 'var(--color-secondary)' }}
        >
          <svg
            aria-hidden="true"
            focusable="false"
            className="octicon octicon-undo"
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="currentColor"
            display="inline-block"
            overflow="visible"
          >
            <path d="M1.22 6.28a.749.749 0 0 1 0-1.06l3.5-3.5a.749.749 0 1 1 1.06 1.06L3.561 5h7.188l.001.007L10.749 5c.058 0 .116.007.171.019A4.501 4.501 0 0 1 10.5 14H8.796a.75.75 0 0 1 0-1.5H10.5a3 3 0 1 0 0-6H3.561L5.78 8.72a.749.749 0 1 1-1.06 1.06l-3.5-3.5Z"></path>
          </svg>
        </Button>
        <Button
          onClick={redoWorkspace}
          className="btn-neutral"
          title="Redo"
          style={{ background: 'var(--color-secondary)' }}
        >
          <span
            style={{
              display: 'inline-block',
              transform: 'rotate(180deg) scaleY(-1)',
              verticalAlign: 'middle',
            }}
          >
            <svg
              aria-hidden="true"
              focusable="false"
              className="octicon octicon-undo"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              fill="currentColor"
              display="inline-block"
              overflow="visible"
              style={{ verticalAlign: 'middle' }}
            >
              <path d="M1.22 6.28a.749.749 0 0 1 0-1.06l3.5-3.5a.749.749 0 1 1 1.06 1.06L3.561 5h7.188l.001.007L10.749 5c.058 0 .116.007.171.019A4.501 4.501 0 0 1 10.5 14H8.796a.75.75 0 0 1 0-1.5H10.5a3 3 0 1 0 0-6H3.561L5.78 8.72a.749.749 0 1 1-1.06 1.06l-3.5-3.5Z"></path>
            </svg>
          </span>
        </Button>
      </div>

      {/* Phaser Section - fixed 492px width to match ProjectView */}
      <div
        className="flex items-center px-4 py-3 pr-2"
        style={{ width: '492px' }}
      >
        {/* Project name input + Save button group */}
        <div className="flex items-center gap-0">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
            className="h-9 px-3 rounded-tl-md rounded-bl-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-primary text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
            style={{ width: '180px' }}
          />
          <button
            onClick={handleSave}
            title="Save Project"
            className="w-9 h-9 flex items-center justify-center rounded-tr-md rounded-br-md bg-primary-green hover:bg-primary-green/90 text-white transition-colors"
          >
            {/* Save icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4.5 h-4.5"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            title="GitHub (Coming Soon)"
            className="w-9 h-9 flex items-center justify-center rounded-md bg-primary-green hover:bg-primary-green/90 text-white transition-colors"
          >
            <GitHubLogoIcon className="w-4.5 h-4.5" />
          </button>
          <button
            title="Download (Coming Soon)"
            className="w-9 h-9 flex items-center justify-center rounded-md bg-primary-green hover:bg-primary-green/90 text-white transition-colors"
          >
            <DownloadIcon className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default EditorFooter;
