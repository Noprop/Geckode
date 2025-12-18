"use client";

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRef, useState, useEffect, useCallback, DragEvent } from 'react';
import BlocklyEditor, { BlocklyEditorHandle } from '@/components/BlocklyEditor';
import { javascriptGenerator } from 'blockly/javascript';
import * as Blockly from 'blockly/core';
import projectsApi from '@/lib/api/handlers/projects';
import { createPhaserState, PhaserExport } from '@/phaser/PhaserStateManager';
import { Game } from 'phaser';
import MainMenu from '@/phaser/scenes/MainMenu';
import SpriteEditor, { SpriteInstance } from '@/components/SpriteEditor';
import { type SpriteDragPayload } from '@/components/SpriteModal';
import starterWorkspace from '@/blockly/starterWorkspace';
import { Button } from './ui/Button';
import { useSnackbar } from '@/hooks/useSnackbar';
import starterWorkspaceNewProject from '@/blockly/starterWorkspaceNewProject';
import { useWorkspaceView } from '@/contexts/WorkspaceViewContext';
import { EventBus } from '@/phaser/EventBus';
import { setSpriteDropdownOptions } from '@/blockly/spriteRegistry';
import {
  CounterClockwiseClockIcon,
  ResetIcon,
  ArrowRightIcon,
} from '@radix-ui/react-icons';

export type PhaserRef = {
  readonly game: Game;
  readonly scene: MainMenu;
} | null;

const PhaserGame = dynamic(() => import('@/components/PhaserGame'), {
  ssr: false,
  loading: () => (
    <div
      className="bg-white dark:bg-black w-full"
      style={{
        aspectRatio: '480 / 360',
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
  const phaserRef = useRef<{ game?: any; scene?: any } | null>(null);
  const [canMoveSprite, setCanMoveSprite] = useState(true);
  const [phaserState, setPhaserState] = useState<PhaserExport | null>(null);
  const [spriteInstances, setSpriteInstances] = useState<SpriteInstance[]>([]);
  const workspaceListenerRef = useRef<{
    workspace: Blockly.WorkspaceSvg;
    listener: (event: Blockly.Events.Abstract) => void;
  } | null>(null);

  const changeScene = () => {
    phaserRef.current?.scene?.changeScene?.();
  };

  useEffect(() => {
    const workspace: Blockly.Workspace = blocklyRef.current?.getWorkspace()!;

    if (!projectId) {
      if (workspace.getAllBlocks(false).length <= 0) {
        Blockly.serialization.workspaces.load(starterWorkspace, workspace);
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

          setPhaserState(project.game_state);
          setSpriteInstances(project.sprites);
        });
    };

    fetchWorkspace();
  }, []);

  const addSprite = () => {
    phaserRef.current?.scene?.addStar?.();
  };

  const currentScene = (scene: { scene: { key: string } }) => {
    setCanMoveSprite(scene.scene.key !== 'MainMenu');
  };

  const generateCode = () => {
    if (
      !phaserRef.current ||
      !blocklyRef.current ||
      !blocklyRef.current.getWorkspace()
    )
      return;
    const code = javascriptGenerator.workspaceToCode(
      blocklyRef.current.getWorkspace() as Blockly.Workspace
    );
    console.log('generate code()');
    console.log(phaserRef.current.scene);
    phaserRef.current.scene?.runScript(code);
  };

  // grab states of workspace and game scene, upload to backend, display msg
  const saveProject = () => {
    if (!projectId) {
      console.log('No project id associated, returning.');
      return;
    }

    const workspace: Blockly.Workspace = blocklyRef.current?.getWorkspace()!;
    const workspaceState: { [key: string]: any } =
      Blockly.serialization.workspaces.save(workspace);

    const phaserState = createPhaserState(phaserRef?.current!);

    projectsApi(parseInt(projectId!.toString()))
      .update({
        blocks: workspaceState,
        game_state: phaserState,
        sprites: spriteInstances,
      })
      .then((res) => showSnackbar('Project saved successfully!', 'success'))
      .catch((err) =>
        showSnackbar('Project could not be saved. Please try again.', 'error')
      );
  };

  const exportWorkspaceState = () => {
    const workspace = blocklyRef.current?.getWorkspace();
    if (!workspace) return;

    const workspaceState = Blockly.serialization.workspaces.save(workspace);
    // Log both the raw object and JSON for easy copying into starterWorkspace.ts.
    console.log('Current workspace state', workspaceState);
    console.log('Workspace JSON', JSON.stringify(workspaceState, null, 2));
  };

  const undoWorkspace = () => {
    const workspace = blocklyRef.current?.getWorkspace();
    if (!workspace) return;
    workspace.undo(false);
  };

  const redoWorkspace = () => {
    const workspace = blocklyRef.current?.getWorkspace();
    if (!workspace) return;
    workspace.undo(true);
  };

  const workspaceDeleteHandler = useCallback(
    (event: Blockly.Events.Abstract) => {
      if (event.type !== Blockly.Events.BLOCK_DELETE) return;
      const deleteEvent = event as Blockly.Events.BlockDelete;
      if (deleteEvent.oldJson?.type !== 'createSprite') return;
      setSpriteInstances((prev) => {
        const sprite = prev.find(
          (instance) => instance.blockId === deleteEvent.blockId
        );
        if (!sprite) return prev;
        phaserRef.current?.scene?.removeEditorSprite?.(sprite.id);
        return prev.filter(
          (instance) => instance.blockId !== deleteEvent.blockId
        );
      });
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
      setSpriteInstances((prev) =>
        prev.map((sprite) => {
          if (sprite.id !== id) return sprite;
          if (workspace && sprite.blockId) {
            const block = workspace.getBlockById(sprite.blockId);
            block?.setFieldValue(String(x), 'X');
            block?.setFieldValue(String(y), 'Y');
          }
          return { ...sprite, x, y };
        })
      );
    };

    EventBus.on('editor-sprite-moved', handleSpriteMove);
    return () => {
      EventBus.off('editor-sprite-moved', handleSpriteMove);
    };
  }, []);

  useEffect(() => {
    setSpriteDropdownOptions(spriteInstances);
  }, [spriteInstances]);

  const attachBlockToOnStart = useCallback(
    (workspace: Blockly.WorkspaceSvg, block: Blockly.BlockSvg) => {
      let [onStartBlock] = workspace.getBlocksByType('onStart', false);

      if (!onStartBlock) {
        const newBlock = workspace.newBlock('onStart');
        newBlock.initSvg();
        newBlock.render();
        [onStartBlock] = workspace.getBlocksByType('onStart', false);
      }

      const input = onStartBlock.getInput('INNER');
      const connection = input?.connection;
      if (!connection || !block.previousConnection) return;

      if (!connection.targetConnection) {
        connection.connect(block.previousConnection);
        return;
      }

      let current = connection.targetBlock();
      while (current && current.getNextBlock()) {
        current = current.getNextBlock();
      }
      current?.nextConnection?.connect(block.previousConnection);
    },
    []
  );

  const addSpriteToGame = useCallback(
    async (payload: SpriteDragPayload, position?: { x: number; y: number }) => {
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
        (instance) => instance.texture === payload.texture
      ).length;
      const variableName = `${safeBase}${duplicateCount + 1}`;
      const spriteId = `sprite-${Date.now()}-${Math.round(
        Math.random() * 1e4
      )}`;

      scene.addSpriteFromEditor(payload.texture, worldX, worldY, spriteId);

      const newBlock = workspace.newBlock('createSprite');
      newBlock.setFieldValue(variableName, 'NAME');
      newBlock.setFieldValue(payload.texture, 'TEXTURE');
      newBlock.setFieldValue(String(worldX), 'X');
      newBlock.setFieldValue(String(worldY), 'Y');
      newBlock.initSvg();
      newBlock.render();
      attachBlockToOnStart(workspace, newBlock);

      setSpriteInstances((prev) => [
        ...prev,
        {
          id: spriteId,
          label: payload.label,
          texture: payload.texture,
          variableName,
          x: worldX,
          y: worldY,
          blockId: newBlock.id,
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
    const workspace =
      blocklyRef.current?.getWorkspace() as Blockly.WorkspaceSvg | null;
    const sprite = spriteInstances.find((instance) => instance.id === spriteId);
    if (!workspace || !sprite?.blockId) return;
    const block = workspace.getBlockById(sprite.blockId);
    block?.dispose(true);
  };

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
    <>
      <div className="flex h-[calc(100vh-4rem-3.5rem)]">
        <div className="relative flex-1 min-h-0 min-w-0 bg-light-whiteboard dark:bg-dark-whiteboard rounded-lg mr-3 overflow-hidden">
          <div
            className={`absolute inset-0 transition-opacity duration-150 ${
              view === 'blocks'
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
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
              view === 'sprite'
                ? 'opacity-100'
                : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden={view !== 'sprite'}
          >
            <div className="w-full max-w-3xl rounded-2xl border border-dashed border-slate-400 bg-white/80 p-8 text-center shadow-md backdrop-blur-sm dark:border-slate-700 dark:bg-dark-secondary/80">
              <h2 className="text-2xl font-bold text-primary-green drop-shadow-sm">
                Sprite Editor Workspace
              </h2>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">
                A dedicated sprite editor will live here. For now, continue
                using the tools on the right.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-[calc(100vh-4rem-3.5rem)] p-3 w-[480px] max-w-full">
          <div
            className="rounded-xl border border-dashed border-slate-400 dark:border-slate-600
                    p-2  bg-light-secondary dark:bg-dark-secondary"
            onDragOver={handleDragOver}
            onDrop={handleSpriteDrop}
            onPointerDown={handlePhaserPointerDown}
          >
            <PhaserGame ref={phaserRef} phaserState={phaserState} />
          </div>

          <SpriteEditor
            sprites={spriteInstances}
            onRemoveSprite={handleRemoveSprite}
            onAssetClick={addSpriteToGame}
          />
        </div>
      </div>
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
              handlePhaserPointerDown();
              showSnackbar('Code was successfully generated!', 'success');
            }}
            className="btn-confirm"
            title="Convert Now"
          >
            Convert Now
          </Button>
          <Button onClick={saveProject} className="btn-alt2" title="Save">
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

          {/* The ResetIcon is also viable. IMO, the svg looks better now as of Dec 18, 2025 */}
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
            {/* <ResetIcon
              width={20}
              height={20}
              style={{ verticalAlign: 'middle' }}
            /> */}
          </Button>
          <Button onClick={redoWorkspace} className="btn-neutral" title="Redo">
            <span
              style={{
                display: 'inline-block',
                transform: 'rotate(180deg) scaleY(-1)',
                verticalAlign: 'middle',
              }}
            >
              {/* <ResetIcon
                width={20}
                height={20}
                style={{ verticalAlign: 'middle' }}
              /> */}
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
    </>
  );
};

export default ProjectView;
