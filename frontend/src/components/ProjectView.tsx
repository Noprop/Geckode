"use client";

import dynamic from 'next/dynamic';
import { useRef, useEffect, useCallback } from 'react';
import BlocklyEditor, { BlocklyEditorHandle } from '@/components/BlocklyEditor';
import * as Blockly from 'blockly/core';
import projectsApi from '@/lib/api/handlers/projects';
import { Game } from 'phaser';
import EditorScene from '@/phaser/scenes/EditorScene';
import GameScene from '@/phaser/scenes/GameScene';
import SpritePanel from '@/components/SpritePanel';
import starterWorkspace from '@/blockly/workspaces/starter';
import { useSnackbar } from '@/hooks/useSnackbar';
import starterWorkspaceNewProject from '@/blockly/workspaces/starterNewProject';
import { useWorkspaceView } from '@/contexts/WorkspaceViewContext';
import { EventBus } from '@/phaser/EventBus';
import { setSpriteDropdownOptions } from '@/blockly/spriteRegistry';
import { useEditorStore } from '@/stores/editorStore';
import type { SpriteInstance } from '@/blockly/spriteRegistry';

export type PhaserRef = {
  readonly game: Game;
  readonly scene: EditorScene | GameScene;
} | null;

const GRID_SIZE = 50;
const CENTER_X = 240;
const CENTER_Y = 180;

const snapToGrid = (x: number, y: number): { x: number; y: number } => {
  // Snap to grid lines that radiate from center
  const snappedX = CENTER_X + Math.round((x - CENTER_X) / GRID_SIZE) * GRID_SIZE;
  const snappedY = CENTER_Y + Math.round((y - CENTER_Y) / GRID_SIZE) * GRID_SIZE;
  return { x: snappedX, y: snappedY };
};

const PhaserContainer = dynamic(() => import('@/components/PhaserContainer'), {
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

interface ProjectViewProps {
  projectId?: number;
}

const ProjectView: React.FC<ProjectViewProps> = ({ projectId }) => {
  const showSnackbar = useSnackbar();
  const { view } = useWorkspaceView();
  const blocklyRef = useRef<BlocklyEditorHandle>(null);
  const phaserRef = useRef<{ game?: Game; scene?: Phaser.Scene } | null>(null);

  const { setPhaserRef, setBlocklyRef, setProjectName, spriteInstances, setSpriteInstances, setPhaserState } =
    useEditorStore();

  useEffect(() => {
    setBlocklyRef(blocklyRef.current);
  }, [setBlocklyRef]);

  // Update store when Phaser scene becomes ready
  useEffect(() => {
    const handler = (scene: Phaser.Scene) => {
      if (phaserRef.current?.game) {
        setPhaserRef({
          game: phaserRef.current.game,
          scene: scene as unknown as EditorScene | GameScene,
        });
      }
      // Send current pause state to newly ready scene (listener is already set up)
      const isEditorScene = useEditorStore.getState().isEditorScene;
      EventBus.emit('editor-scene-changed', isEditorScene);
    };

    EventBus.on('current-scene-ready', handler);
    return () => {
      EventBus.off('current-scene-ready', handler);
    };
  }, [setPhaserRef]);

  // Respond to pause state sync requests from Phaser scene
  useEffect(() => {
    const handler = () => {
      const isEditorScene = useEditorStore.getState().isEditorScene;
      console.log('[ProjectView] received editor scene request, responding with:', isEditorScene);
      EventBus.emit('editor-scene-changed', isEditorScene);
    };
    EventBus.on('editor-request-pause-state', handler);
    return () => {
      EventBus.off('editor-request-pause-state', handler);
    };
  }, []);

  useEffect(() => {
    const workspace: Blockly.Workspace = blocklyRef.current?.getWorkspace()!;

    if (!projectId) {
      if (workspace.getAllBlocks(false).length <= 0) {
        Blockly.serialization.workspaces.load(starterWorkspace, workspace);

        useEditorStore.setState({
          spriteId: useEditorStore.getState().spriteInstances[0].id,
        });

        useEditorStore.getState().scheduleConvert();
      }
      return;
    }

    const fetchWorkspace = async () => {
      projectsApi(parseInt(projectId?.toString()!))
        .get()
        .then((project) => {
          try {
            Blockly.serialization.workspaces.load(
              Object.keys(project.blocks).length ? project.blocks : starterWorkspaceNewProject,
              workspace
            );
          } catch {
            showSnackbar('Failed to load workspace!', 'error');
          }

          setProjectName(project.name);
          setPhaserState(project.game_state);
          setSpriteInstances(project.sprites);
        });
    };

    fetchWorkspace();
  }, []);

  const workspaceListenerRef = useRef<{
    workspace: Blockly.WorkspaceSvg;
    listener: (event: Blockly.Events.Abstract) => void;
  } | null>(null);

  const workspaceDeleteHandler = useCallback((event: Blockly.Events.Abstract) => {
    // if (event.type !== Blockly.Events.BLOCK_DELETE) return;
    // const deleteEvent = event as Blockly.Events.BlockDelete;
    // if (deleteEvent.oldJson?.type !== 'createSprite') return;
    // setSpriteInstances((prev) => {
    //   const sprite = prev.find(
    //     (instance) => instance.blockId === deleteEvent.blockId
    //   );
    //   if (!sprite) return prev;
    //   phaserRef.current?.scene?.removeEditorSprite?.(sprite.id);
    //   return prev.filter(
    //     (instance) => instance.blockId !== deleteEvent.blockId
    //   );
    // });
  }, []);

  const handleWorkspaceReady = useCallback(
    (workspace: Blockly.WorkspaceSvg) => {
      if (workspaceListenerRef.current) {
        workspaceListenerRef.current.workspace.removeChangeListener(workspaceListenerRef.current.listener);
      }
      workspace.addChangeListener(workspaceDeleteHandler);
      workspaceListenerRef.current = {
        workspace,
        listener: workspaceDeleteHandler,
      };
    },
    [workspaceDeleteHandler]
  );

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
      const workspace = blocklyRef.current?.getWorkspace() as Blockly.WorkspaceSvg | null;
      const isEditorScene = useEditorStore.getState().isEditorScene;

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
          (phaserRef.current?.scene as EditorScene)?.updateSprite(id, {
            x: finalX,
            y: finalY,
          });
        }

        // Update Blockly block fields
        // if (workspace && sprite.blockId) {
        //   const block = workspace.getBlockById(sprite.blockId);
        //   block?.setFieldValue(String(finalX), 'X');
        //   block?.setFieldValue(String(finalY), 'Y');
        // }

        return prev.map((s) => (s.id === id ? { ...s, x: finalX, y: finalY } : s));
      });
    };

    EventBus.on('editor-sprite-moved', handleSpriteMove);
    return () => {
      EventBus.off('editor-sprite-moved', handleSpriteMove);
    };
  }, []);

  useEffect(() => {
    setSpriteDropdownOptions(spriteInstances);

    const workspace = blocklyRef.current?.getWorkspace();

    if (!workspace) return;

    const state = Blockly.serialization.workspaces.save(workspace);

    Blockly.serialization.workspaces.load(state, workspace);
  }, [spriteInstances]);

  const handleUpdateSprite = useCallback((spriteId: string, updates: Partial<SpriteInstance>) => {
    const scene = phaserRef.current?.scene;

    setSpriteInstances((prev) => {
      const sprite = prev.find((instance) => instance.id === spriteId);
      if (!sprite) return prev;

      // Update Blockly block fields if they exist
      // if (workspace && sprite.blockId) {
      //   const block = workspace.getBlockById(sprite.blockId);
      //   if (block) {
      //     if ('x' in updates && updates.x !== undefined) {
      //       block.setFieldValue(String(updates.x), 'X');
      //     }
      //     if ('y' in updates && updates.y !== undefined) {
      //       block.setFieldValue(String(updates.y), 'Y');
      //     }
      //     if (
      //       'variableName' in updates &&
      //       updates.variableName !== undefined
      //     ) {
      //       block.setFieldValue(updates.variableName, 'NAME');
      //     }
      //   }
      // }

      // Update Phaser sprite in the scene
      if (scene && 'updateSprite' in scene) {
        (scene as EditorScene).updateSprite(spriteId, {
          x: updates.x as number,
          y: updates.y as number,
        });
      }

      console.log('workspace spriteId: ' + useEditorStore.getState().spriteId);

      // Update sprite instances state
      return prev.map((instance) => (instance.id === spriteId ? { ...instance, ...updates } : instance));
    });
  }, []);

  useEffect(() => {
    if (view !== 'blocks') return;
    const workspace = blocklyRef.current?.getWorkspace() as Blockly.WorkspaceSvg | null;
    if (!workspace) return;
    requestAnimationFrame(() => Blockly.svgResize(workspace));
  }, [view]);

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
          <BlocklyEditor ref={blocklyRef} onWorkspaceReady={handleWorkspaceReady} />
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
          <PhaserContainer ref={phaserRef} />
        </div>

        <SpritePanel />
      </div>
    </div>
  );
};

export default ProjectView;
