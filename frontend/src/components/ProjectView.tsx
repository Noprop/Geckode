"use client";

import { useRef, useEffect } from 'react';
import BlocklyEditor from '@/components/BlocklyEditor';
import * as Blockly from 'blockly/core';
import EditorScene from '@/phaser/scenes/EditorScene';
import { useWorkspaceView } from '@/contexts/WorkspaceViewContext';
import { EventBus } from '@/phaser/EventBus';
import { useEditorStore } from '@/stores/editorStore';
import { useSpriteStore } from '@/stores/spriteStore';
import Phaser from './PhaserPanel/Phaser';
import type { SpriteInstance } from '@/blockly/spriteRegistry';

const GRID_SIZE = 50;
const CENTER_X = 240;
const CENTER_Y = 180;

const snapToGrid = (x: number, y: number): { x: number; y: number } => {
  // Snap to grid lines that radiate from center
  const snappedX = CENTER_X + Math.round((x - CENTER_X) / GRID_SIZE) * GRID_SIZE;
  const snappedY = CENTER_Y + Math.round((y - CENTER_Y) / GRID_SIZE) * GRID_SIZE;
  return { x: snappedX, y: snappedY };
};

const ProjectView = () => {
  const { view } = useWorkspaceView();
  const { setSpriteInstances } = useSpriteStore();
  const phaserScene = useEditorStore((state) => state.phaserScene);
  const { isEditorScene, toggleGame, undoWorkspace, redoWorkspace, canUndo, canRedo } = useEditorStore();

  const workspaceListenerRef = useRef<{
    workspace: Blockly.WorkspaceSvg;
    listener: (event: Blockly.Events.Abstract) => void;
  } | null>(null);

  useEffect(() => {
    return () => {
      if (workspaceListenerRef.current) {
        workspaceListenerRef.current.workspace.removeChangeListener(workspaceListenerRef.current.listener);
      }
      // Cancel any pending auto-convert on unmount
      useEditorStore.getState().cancelScheduledConvert();
    };
  }, []);

  useEffect(() => {
    const handleSpriteMove = ({ id, x, y }: { id: string; x: number; y: number }) => {
      if (!(phaserScene instanceof EditorScene)) return;
      setSpriteInstances((state) => {
        const sprite = state.find((s: SpriteInstance) => s.id === id);
        if (!sprite) return state;

        let finalX = x;
        let finalY = y;

        if (sprite.snapToGrid) {
          const snapped = snapToGrid(x, y);
          finalX = snapped.x;
          finalY = snapped.y;
          phaserScene.updateSprite(id, {
            x: finalX,
            y: finalY,
          });
        }

        return state.map((s: SpriteInstance) => (s.id === id ? { ...s, x: finalX, y: finalY } : s));
      });
    };

    EventBus.on('editor-sprite-moved', handleSpriteMove);
    return () => void EventBus.off('editor-sprite-moved', handleSpriteMove);
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <div className="relative flex-1 min-h-0 min-w-0 bg-light-whiteboard dark:bg-dark-whiteboard mr-2 overflow-hidden">
        <div
          className={`absolute inset-0 transition-opacity duration-150 ${
            view === 'blocks' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={view !== 'blocks'}
        >
          <BlocklyEditor />
        </div>
        <div
          className={`absolute inset-0 flex items-center justify-center p-8 transition-opacity duration-150 ${
            view === 'sprite' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={view !== 'sprite'}
        >
          <div
            className="w-full max-w-3xl rounded-2xl border border-dashed border-slate-400
          bg-white/80 p-8 text-center shadow-md backdrop-blur-sm dark:border-slate-700 dark:bg-dark-secondary/80"
          >
            <h2 className="text-2xl font-bold text-primary-green drop-shadow-sm">Sprite Editor Workspace</h2>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">
              A dedicated sprite editor will live here. For now, continue using the tools on the right.
            </p>
          </div>
        </div>

        {view === 'blocks' && (
          <div className="absolute bottom-8 right-[30px] flex items-center gap-2.5 z-9999 pointer-events-auto">
            <button
              onClick={undoWorkspace}
              disabled={!canUndo}
              className={`
                w-10.5 h-10.5 flex items-center justify-center rounded text-white transition-all
                ${
                  canUndo
                    ? 'bg-primary-green hover:bg-primary-green/90 hover:translate-y-px hover:shadow-[0_2px_0_0_#1a5c3a] active:translate-y-[3px] active:shadow-none shadow-[0_4px_0_0_#1a5c3a] cursor-pointer'
                    : 'bg-slate-400 dark:bg-slate-600 shadow-[0_4px_0_0_#64748b] dark:shadow-[0_4px_0_0_#334155] opacity-90'
                }
              `}
              title="Undo"
            >
              <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M1.22 6.28a.749.749 0 0 1 0-1.06l3.5-3.5a.749.749 0 1 1 1.06 1.06L3.561 5h7.188l.001.007L10.749 5c.058 0 .116.007.171.019A4.501 4.501 0 0 1 10.5 14H8.796a.75.75 0 0 1 0-1.5H10.5a3 3 0 1 0 0-6H3.561L5.78 8.72a.749.749 0 1 1-1.06 1.06l-3.5-3.5Z"></path>
              </svg>
            </button>
            <button
              onClick={redoWorkspace}
              disabled={!canRedo}
              className={`
                w-10.5 h-10.5 flex items-center justify-center rounded text-white transition-all
                ${
                  canRedo
                    ? 'bg-primary-green hover:bg-primary-green/90 hover:translate-y-px hover:shadow-[0_2px_0_0_#1a5c3a] active:translate-y-[3px] active:shadow-none shadow-[0_4px_0_0_#1a5c3a] cursor-pointer'
                    : 'bg-slate-400 dark:bg-slate-600 shadow-[0_4px_0_0_#64748b] dark:shadow-[0_4px_0_0_#334155] opacity-90'
                }
              `}
              title="Redo"
            >
              <span
                style={{
                  display: 'inline-block',
                  transform: 'rotate(180deg) scaleY(-1)',
                }}
              >
                <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                  <path d="M1.22 6.28a.749.749 0 0 1 0-1.06l3.5-3.5a.749.749 0 1 1 1.06 1.06L3.561 5h7.188l.001.007L10.749 5c.058 0 .116.007.171.019A4.501 4.501 0 0 1 10.5 14H8.796a.75.75 0 0 1 0-1.5H10.5a3 3 0 1 0 0-6H3.561L5.78 8.72a.749.749 0 1 1-1.06 1.06l-3.5-3.5Z"></path>
                </svg>
              </span>
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col pr-2 pt-2" style={{ width: '492px' }}>
        <Phaser />
      </div>
    </div>
  );
};

export default ProjectView;