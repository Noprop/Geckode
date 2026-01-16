"use client";

import dynamic from 'next/dynamic';
import { useRef, useEffect } from 'react';
import BlocklyEditor from '@/components/BlocklyEditor';
import * as Blockly from 'blockly/core';
import EditorScene from '@/phaser/scenes/EditorScene';
import SpritePanel from '@/components/SpritePanel';
import { useWorkspaceView } from '@/contexts/WorkspaceViewContext';
import { EventBus } from '@/phaser/EventBus';
import { useEditorStore } from '@/stores/editorStore';
import { useSpriteStore } from '@/stores/spriteStore';

const GRID_SIZE = 50;
const CENTER_X = 240;
const CENTER_Y = 180;

const snapToGrid = (x: number, y: number): { x: number; y: number } => {
  // Snap to grid lines that radiate from center
  const snappedX = CENTER_X + Math.round((x - CENTER_X) / GRID_SIZE) * GRID_SIZE;
  const snappedY = CENTER_Y + Math.round((y - CENTER_Y) / GRID_SIZE) * GRID_SIZE;
  return { x: snappedX, y: snappedY };
};

const PhaserContainer = dynamic(() => import('@/components/PhaserGame'), {
  ssr: false,
  loading: () => (
    <div
      className="bg-white dark:bg-black"
      style={{
        width: '480px',
        height: '360px',
      }}
    />
  ),
});

const ProjectView = () => {
  const { view } = useWorkspaceView();
  const { spriteInstances, setSpriteInstances } = useSpriteStore();
  const phaserRef = useEditorStore((state) => state.phaserRef);

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
      const { isEditorScene } = useEditorStore.getState();

      setSpriteInstances((prev) => {
        const sprite = prev.find((s) => s.id === id);
        if (!sprite) return prev;

        let finalX = x;
        let finalY = y;

        // Apply snap-to-grid if enabled and editor scene
        if (sprite.snapToGrid && isEditorScene) {
          const snapped = snapToGrid(x, y);
          finalX = snapped.x;
          finalY = snapped.y;
          // Update Phaser sprite to snapped position
          (phaserRef?.scene as EditorScene)?.updateSprite(id, {
            x: finalX,
            y: finalY,
          });
        }

        return prev.map((s) => (s.id === id ? { ...s, x: finalX, y: finalY } : s));
      });
    };

    EventBus.on('editor-sprite-moved', handleSpriteMove);
    return () => void EventBus.off('editor-sprite-moved', handleSpriteMove);
  }, []);

  return (
    <div className="flex h-[calc(100vh-4rem-3.5rem)]">
      {/* Left side: Blockly editor */}
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
          <div className="w-full max-w-3xl rounded-2xl border border-dashed border-slate-400 bg-white/80 p-8 text-center shadow-md backdrop-blur-sm dark:border-slate-700 dark:bg-dark-secondary/80">
            <h2 className="text-2xl font-bold text-primary-green drop-shadow-sm">Sprite Editor Workspace</h2>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">
              A dedicated sprite editor will live here. For now, continue using the tools on the right.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Phaser game, sprite list, and scene list */}
      <div className="flex flex-col h-[calc(100vh-4rem-3.5rem)] py-3 pr-2" style={{ width: '492px' }}>
        <div
          onPointerDown={() => {
            if (typeof Blockly.hideChaff === 'function') Blockly.hideChaff();
            (document.getElementById('game-container') as HTMLElement).focus();
          }}
        >
          <PhaserContainer />
        </div>

        <SpritePanel />
      </div>
    </div>
  );
};

export default ProjectView;
