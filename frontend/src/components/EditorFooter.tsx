"use client";

import * as Blockly from 'blockly/core';
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
    loadWorkspace,
    canUndo,
    canRedo,
    isEditorScene,
    toggleGame,
  } = useEditorStore();

  const handlePhaserFocus = () => {
    if (typeof Blockly.hideChaff === 'function') {
      Blockly.hideChaff();
    }

    const activeElement = document.activeElement as HTMLElement | null;
    if (activeElement && activeElement !== document.body) {
      activeElement.blur();
    }

    const container = document.getElementById('game-container') as HTMLElement | null;
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
        {/* <button
          onClick={() => {
            loadWorkspace("1");
          }}
          className="w-10 h-10 flex items-center justify-center rounded text-white transition-all bg-primary-green hover:bg-primary-green/90 hover:translate-y-px hover:shadow-[0_2px_0_0_#1a5c3a] active:translate-y-[3px] active:shadow-none shadow-[0_4px_0_0_#1a5c3a] cursor-pointer"
        >
          1
        </button>
        <button
          onClick={() => {
            loadWorkspace("2");
          }}
          className="w-10 h-10 flex items-center justify-center rounded text-white transition-all bg-primary-green hover:bg-primary-green/90 hover:translate-y-px hover:shadow-[0_2px_0_0_#1a5c3a] active:translate-y-[3px] active:shadow-none shadow-[0_4px_0_0_#1a5c3a] cursor-pointer"
        >
          2
        </button> */}

        <button
          onClick={undoWorkspace}
          disabled={!canUndo}
          className={`
            w-10 h-10 flex items-center justify-center rounded text-white transition-all
            ${
              canUndo
                ? 'bg-primary-green hover:bg-primary-green/90 hover:translate-y-px hover:shadow-[0_2px_0_0_#1a5c3a] active:translate-y-[3px] active:shadow-none shadow-[0_4px_0_0_#1a5c3a] cursor-pointer'
                : 'bg-slate-400 dark:bg-slate-600 shadow-[0_4px_0_0_#64748b] dark:shadow-[0_4px_0_0_#334155] opacity-60'
            }
          `}
          title="Undo"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            className="octicon octicon-undo"
            viewBox="0 0 16 16"
            width="18"
            height="18"
            fill="currentColor"
            display="inline-block"
            overflow="visible"
          >
            <path d="M1.22 6.28a.749.749 0 0 1 0-1.06l3.5-3.5a.749.749 0 1 1 1.06 1.06L3.561 5h7.188l.001.007L10.749 5c.058 0 .116.007.171.019A4.501 4.501 0 0 1 10.5 14H8.796a.75.75 0 0 1 0-1.5H10.5a3 3 0 1 0 0-6H3.561L5.78 8.72a.749.749 0 1 1-1.06 1.06l-3.5-3.5Z"></path>
          </svg>
        </button>
        <button
          onClick={redoWorkspace}
          disabled={!canRedo}
          className={`
            w-10 h-10 flex items-center justify-center rounded text-white transition-all
            ${
              canRedo
                ? 'bg-primary-green hover:bg-primary-green/90 hover:translate-y-px hover:shadow-[0_2px_0_0_#1a5c3a] active:translate-y-[3px] active:shadow-none shadow-[0_4px_0_0_#1a5c3a] cursor-pointer'
                : 'bg-slate-400 dark:bg-slate-600 shadow-[0_4px_0_0_#64748b] dark:shadow-[0_4px_0_0_#334155] opacity-60'
            }
          `}
          title="Redo"
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
              width="18"
              height="18"
              fill="currentColor"
              display="inline-block"
              overflow="visible"
              style={{ verticalAlign: 'middle' }}
            >
              <path d="M1.22 6.28a.749.749 0 0 1 0-1.06l3.5-3.5a.749.749 0 1 1 1.06 1.06L3.561 5h7.188l.001.007L10.749 5c.058 0 .116.007.171.019A4.501 4.501 0 0 1 10.5 14H8.796a.75.75 0 0 1 0-1.5H10.5a3 3 0 1 0 0-6H3.561L5.78 8.72a.749.749 0 1 1-1.06 1.06l-3.5-3.5Z"></path>
            </svg>
          </span>
        </button>
        <button
          onClick={toggleGame}
          className="w-10 h-10 flex items-center justify-center rounded text-white transition-all bg-primary-green hover:bg-primary-green/90 hover:translate-y-px hover:shadow-[0_2px_0_0_#1a5c3a] active:translate-y-[3px] active:shadow-none shadow-[0_4px_0_0_#1a5c3a] cursor-pointer"
          title={isEditorScene ? 'Editor Scene' : 'Game Scene'}
        >
          {isEditorScene ? (
            <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
              <path d="M4 2.5a1 1 0 0 1 1.5-.85l9 5.5a1 1 0 0 1 0 1.7l-9 5.5A1 1 0 0 1 4 13.5v-11z" />
            </svg>
          ) : (
            <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="18" height="18" fill="currentColor">
              <rect x="2" y="2" width="12" height="12" rx="1.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Phaser Section - fixed 492px width to match ProjectView */}
      <div className="flex items-center px-4 py-3 pr-2" style={{ width: '492px' }}>
        {/* GitHub/Download buttons on left */}
        <div className="flex items-center gap-2">
          <button
            title="GitHub (Coming Soon)"
            className="w-10 h-10 flex items-center justify-center rounded-md bg-primary-green hover:bg-primary-green/90 text-white transition-colors"
          >
            <GitHubLogoIcon className="w-5 h-5" />
          </button>
          <button
            title="Download (Coming Soon)"
            className="w-10 h-10 flex items-center justify-center rounded-md bg-primary-green hover:bg-primary-green/90 text-white transition-colors"
          >
            <DownloadIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Project name input + Save button group on right */}
        <div className="flex items-center gap-0 ml-auto">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
            className="h-10 px-3 rounded-tl-md rounded-bl-md border border-slate-300 bg-white text-sm outline-none transition focus:border-primary-green focus:ring-2 focus:ring-primary-green/20 dark:border-slate-600 dark:bg-dark-hover dark:text-slate-100"
            style={{ width: '180px' }}
          />
          <button
            onClick={handleSave}
            title="Save Project"
            className="w-10 h-10 flex items-center justify-center rounded-tr-md rounded-br-md bg-primary-green hover:bg-primary-green/90 text-white transition-colors"
          >
            {/* Save icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default EditorFooter;
