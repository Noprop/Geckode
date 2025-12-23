"use client";

import * as Blockly from 'blockly/core';
import { Button } from './ui/Button';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useEditorStore } from '@/stores/editorStore';

const EditorFooter = () => {
  const showSnackbar = useSnackbar();
  const {
    changeScene,
    generateCode,
    saveProject,
    exportWorkspaceState,
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

    const container = document.getElementById('game-container') as HTMLElement | null;
    container?.focus();
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-14 bg-light-secondary dark:bg-dark-secondary border-t border-slate-300 dark:border-slate-600 flex items-center justify-between px-4 z-50">
      {/* Left group */}
      <div className="flex gap-2">
        <Button
          className="btn-deny"
          onClick={changeScene}
          title="Change Scene"
        >
          Change Scene
        </Button>
      </div>

      {/* Center group */}
      <div className="flex gap-2">
        <Button
          onClick={() => {
            generateCode();
            handlePhaserFocus();
            showSnackbar('Code was successfully generated!', 'success');
          }}
          className="btn-confirm"
          title="Convert Now"
        >
          Convert Now
        </Button>
        <Button 
          onClick={() => saveProject(showSnackbar)} 
          className="btn-alt2" 
          title="Save"
        >
          Save
        </Button>
      </div>

      {/* Right group */}
      <div className="flex gap-2">
        <Button
          onClick={exportWorkspaceState}
          className="btn-neutral"
          title="Export Workspace"
        >
          Export Workspace
        </Button>

        <Button onClick={undoWorkspace} className="btn-neutral" title="Undo">
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
        <Button onClick={redoWorkspace} className="btn-neutral" title="Redo">
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
    </footer>
  );
};

export default EditorFooter;

