"use client";

import dynamic from 'next/dynamic';
import {
  useRef,
  useEffect,
  useCallback,
  DragEvent,
  useLayoutEffect,
} from 'react';
import BlocklyEditor, { BlocklyEditorHandle } from '@/components/BlocklyEditor';
import * as Blockly from 'blockly/core';
import projectsApi from '@/lib/api/handlers/projects';
import { Game } from 'phaser';
import EditorScene from '@/phaser/scenes/EditorScene';
import GameScene from '@/phaser/scenes/GameScene';
import SpritePanel from '@/components/SpritePanel';
import { type SpriteDragPayload } from '@/components/SpriteModal';
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
  const snappedX =
    CENTER_X + Math.round((x - CENTER_X) / GRID_SIZE) * GRID_SIZE;
  const snappedY =
    CENTER_Y + Math.round((y - CENTER_Y) / GRID_SIZE) * GRID_SIZE;
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

  const {
    setPhaserRef,
    setBlocklyRef,
    setProjectName,
    spriteInstances,
    setSpriteInstances,
    setPhaserState,
  } = useEditorStore();

  useEffect(() => {
    setBlocklyRef(blocklyRef.current);
  }, [setBlocklyRef]);

  // Update store when Phaser scene becomes ready
  useEffect(() => {
    const handler = (scene: Phaser.Scene) => {
      if (phaserRef.current?.game) {
        setPhaserRef({
          game: phaserRef.current.game,
          scene: scene as unknown as Phaser.Scene,
        });
      }
      // Send current pause state to newly ready scene (listener is already set up)
      const isPaused = useEditorStore.getState().isPaused;
      console.log('[ProjectView] scene ready, sending pause state:', isPaused);
      EventBus.emit('editor-pause-changed', isPaused);
    };

    EventBus.on('current-scene-ready', handler);
    return () => {
      EventBus.off('current-scene-ready', handler);
    };
  }, [setPhaserRef]);

  // Respond to pause state sync requests from Phaser scene
  useEffect(() => {
    const handler = () => {
      const isPaused = useEditorStore.getState().isPaused;
      console.log(
        '[ProjectView] received pause state request, responding with:',
        isPaused
      );
      EventBus.emit('editor-pause-changed', isPaused);
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
              Object.keys(project.blocks).length
                ? project.blocks
                : starterWorkspaceNewProject,
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

  const workspaceDeleteHandler = useCallback(
    (event: Blockly.Events.Abstract) => {
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
    },
    []
  );

  const handleWorkspaceReady = useCallback(
    (workspace: Blockly.WorkspaceSvg) => {
      if (workspaceListenerRef.current) {
        workspaceListenerRef.current.workspace.removeChangeListener(
          workspaceListenerRef.current.listener
        );
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
        workspaceListenerRef.current.workspace.removeChangeListener(
          workspaceListenerRef.current.listener
        );
      }
      // Cancel any pending auto-convert on unmount
      useEditorStore.getState().cancelScheduledConvert();
    };
  }, []);

  useEffect(() => {
    const handleSpriteMove = ({
      id,
      x,
      y,
    }: {
      id: string;
      x: number;
      y: number;
    }) => {
      const workspace =
        blocklyRef.current?.getWorkspace() as Blockly.WorkspaceSvg | null;
      const isPaused = useEditorStore.getState().isPaused;

      setSpriteInstances((prev) => {
        const sprite = prev.find((s) => s.id === id);
        if (!sprite) return prev;

        let finalX = x;
        let finalY = y;

        // Apply snap-to-grid if enabled and paused
        if (sprite.snapToGrid && isPaused) {
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

        return prev.map((s) =>
          s.id === id ? { ...s, x: finalX, y: finalY } : s
        );
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

    const state = Blockly.serialization.workspaces.save(workspace)

    Blockly.serialization.workspaces.load(state, workspace);
  }, [spriteInstances]);

  const attachBlockToOnStart = useCallback(
    (workspace: Blockly.WorkspaceSvg, block: Blockly.BlockSvg) => {
      // let [onStartBlock] = workspace.getBlocksByType('onStart', false);
      // if (!onStartBlock) {
      //   const newBlock = workspace.newBlock('onStart');
      //   newBlock.initSvg();
      //   newBlock.render();
      //   [onStartBlock] = workspace.getBlocksByType('onStart', false);
      // }
      // const input = onStartBlock.getInput('INNER');
      // const connection = input?.connection;
      // if (!connection || !block.previousConnection) return;
      // if (!connection.targetConnection) {
      //   connection.connect(block.previousConnection);
      //   return;
      // }
      // let current = connection.targetBlock();
      // while (current && current.getNextBlock()) {
      //   current = current.getNextBlock();
      // }
      // current?.nextConnection?.connect(block.previousConnection);
    },
    []
  );

  const addSpriteToGame = useCallback(
    async (payload: SpriteDragPayload, position?: { x: number; y: number }) => {
      console.log('addSpriteToGame???');
      const game = phaserRef.current?.game;
      const scene = phaserRef.current?.scene;
      const workspace =
        blocklyRef.current?.getWorkspace() as Blockly.WorkspaceSvg | null;

      if (!game || !scene || !workspace) {
        showSnackbar('Game is not ready yet. Try again in a moment.', 'error');
        return false;
      }

      const ensureTexture = async () => {
        if (scene.textures.exists(payload.texture)) return;
        if (!payload.dataUrl) {
          throw new Error('Missing texture data for sprite payload.');
        }

        const dataUrl = payload.dataUrl;
        const isDataUrl = dataUrl.startsWith('data:');
        if (isDataUrl) {
          const textureReady = new Promise<void>((resolve, reject) => {
            const img = new window.Image();
            img.onload = () => {
              try {
                scene.textures.addImage(payload.texture, img);
                resolve();
              } catch (err) {
                reject(err);
              }
            };
            img.onerror = () =>
              reject(new Error('Failed to load base64 texture data.'));
            img.src = dataUrl;
          });
          await textureReady;
          return;
        }

        await new Promise<void>((resolve, reject) => {
          const handleComplete = () => {
            scene.load.off('loaderror', handleError);
            resolve();
          };
          const handleError = () => {
            scene.load.off('complete', handleComplete);
            reject(new Error('Failed to load texture from URL.'));
          };
          scene.load.once('complete', handleComplete);
          scene.load.once('loaderror', handleError);
          console.log('loading image', payload.texture, dataUrl);
          scene.load.image(payload.texture, dataUrl);
          scene.load.start();
        });
      };

      try {
        await ensureTexture();
      } catch (error) {
        console.warn('Could not load sprite texture.', error);
        showSnackbar(
          'Could not load that sprite image. Please try again.',
          'error'
        );
        return false;
      }

      if (!scene.textures.exists(payload.texture)) {
        showSnackbar(
          'Upload a sprite image before adding it to the game.',
          'error'
        );
        return false;
      }

      const width = game.scale?.width || game.canvas?.width;
      const height = game.scale?.height || game.canvas?.height;
      if (!width || !height) {
        showSnackbar('Could not determine game size. Try again.', 'error');
        return false;
      }

      const worldX = position?.x ?? Math.round(width / 2);
      const worldY = position?.y ?? Math.round(height / 2);

      const safeBase = payload.texture.replace(/[^\w]/g, '') || 'sprite';
      const duplicateCount = spriteInstances.filter(
        (instance) => instance.name === payload.texture
      ).length;
      const name = `${safeBase}${duplicateCount + 1}`;
      const spriteId = `id_${Date.now()}_${Math.round(
        Math.random() * 1e4
      )}`;

      (scene as EditorScene).createSprite(
        payload.texture,
        worldX,
        worldY,
        spriteId
      );

      // const newBlock = workspace.newBlock('createSprite');
      // newBlock.setFieldValue(variableName, 'NAME');
      // newBlock.setFieldValue(payload.texture, 'TEXTURE');
      // newBlock.setFieldValue(String(worldX), 'X');
      // newBlock.setFieldValue(String(worldY), 'Y');
      // newBlock.initSvg();
      // newBlock.render();
      // attachBlockToOnStart(workspace, newBlock);

      setSpriteInstances((prev) => [
        ...prev,
        {
          id: spriteId,
          tid: payload.texture,
          name: name,
          x: worldX,
          y: worldY,
        },
      ]);

      return true;
    },
    [attachBlockToOnStart, showSnackbar, spriteInstances]
  );

  const handleSpriteDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const payloadString = event.dataTransfer.getData('application/json');
    if (!payloadString || !blocklyRef.current || !phaserRef.current) return;

    let payload: SpriteDragPayload;
    try {
      payload = JSON.parse(payloadString) as SpriteDragPayload;
    } catch {
      console.warn('Invalid payload for sprite creation.');
      return;
    }
    if (payload.kind !== 'sprite-blueprint') return;

    const game = phaserRef.current.game;
    if (!game || !game.canvas) return;

    const { clientX, clientY } = event;

    const canvasRect = game.canvas.getBoundingClientRect();
    const relativeX = clientX - canvasRect.left;
    const relativeY = clientY - canvasRect.top;

    if (
      relativeX < 0 ||
      relativeY < 0 ||
      relativeX > canvasRect.width ||
      relativeY > canvasRect.height
    ) {
      return;
    }

    const worldX = Math.round(
      (relativeX / canvasRect.width) * game.scale.width
    );
    const worldY = Math.round(
      (relativeY / canvasRect.height) * game.scale.height
    );

    await addSpriteToGame(payload, { x: worldX, y: worldY });
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const handleRemoveSprite = (spriteId: string) => {

    setSpriteInstances((prev) => {
      return prev.filter(
        (instance) => instance.id !== spriteId
      );
    });

    useEditorStore.getState().spriteWorkspaces.delete(spriteId);
    useEditorStore.getState().spriteOutputs.delete(spriteId);
    (phaserRef.current?.scene as EditorScene).removeSprite?.(spriteId);
  };

  const handleUpdateSprite = useCallback(
    (spriteId: string, updates: Partial<SpriteInstance>) => {
      const workspace =
        blocklyRef.current?.getWorkspace() as Blockly.WorkspaceSvg | null;
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

        console.log("workspace spriteId: " + useEditorStore.getState().spriteId);

        // Update sprite instances state
        return prev.map((instance) =>
          instance.id === spriteId ? { ...instance, ...updates } : instance
        );
      });
    },
    []
  );

  const handlePhaserPointerDown = useCallback(() => {
    // check to see if this function has been exposed;
    // this means that Blockly has been injected
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
  }, []);

  useEffect(() => {
    if (view !== 'blocks') return;
    const workspace =
      blocklyRef.current?.getWorkspace() as Blockly.WorkspaceSvg | null;
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
          <BlocklyEditor
            ref={blocklyRef}
            onWorkspaceReady={handleWorkspaceReady}
          />
        </div>
        <div
          className={`absolute inset-0 flex items-center justify-center p-8 transition-opacity duration-150 ${
            view === 'sprite' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden={view !== 'sprite'}
        >
          <div className="w-full max-w-3xl rounded-2xl border border-dashed border-slate-400 bg-white/80 p-8 text-center shadow-md backdrop-blur-sm dark:border-slate-700 dark:bg-dark-secondary/80">
            <h2 className="text-2xl font-bold text-primary-green drop-shadow-sm">
              Sprite Editor Workspace
            </h2>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">
              A dedicated sprite editor will live here. For now, continue using
              the tools on the right.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Phaser game, sprite list, and scene list */}
      <div
        className="flex flex-col h-[calc(100vh-4rem-3.5rem)] py-3 pr-2"
        style={{ width: '492px' }}
      >
        <div
          onDragOver={handleDragOver}
          onDrop={handleSpriteDrop}
          onPointerDown={handlePhaserPointerDown}
        >
          <PhaserContainer ref={phaserRef} />
        </div>

        <SpritePanel
          sprites={spriteInstances}
          onRemoveSprite={handleRemoveSprite}
          addSpriteToGame={addSpriteToGame}
          onUpdateSprite={handleUpdateSprite}
        />
      </div>
    </div>
  );
};

export default ProjectView;
