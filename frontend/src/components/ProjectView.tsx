"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect, useCallback, DragEvent } from "react";
import BlocklyEditor, { BlocklyEditorRef } from "@/components/BlocklyEditor";
import { javascriptGenerator } from "blockly/javascript";
import * as Blockly from "blockly/core";
import projectsApi from "@/lib/api/handlers/projects";
import { createPhaserState, PhaserExport } from "@/phaser/PhaserStateManager";
import { Game } from "phaser";
import MainMenu from "@/phaser/scenes/MainMenu";
import SpriteEditor, {
  SpriteInstance,
  SpriteDragPayload,
} from "@/components/SpriteEditor";
import starterWorkspace from "@/blockly/starterWorkspace";
import { Button } from "./ui/Button";
import { useSnackbar } from "@/hooks/useSnackbar";
import starterWorkspaceNewProject from "@/blockly/starterWorkspaceNewProject";
import { HocuspocusProvider } from "@hocuspocus/provider";
import type { YArrayEvent, Doc, Transaction } from 'yjs';
import { authApi } from "@/lib/api/auth";
import { useAuth } from "@/contexts/AuthContext";
import { PublicUser, toPublicUser } from "@/lib/types/api/users";

export type PhaserRef = {
  readonly game: Game;
  readonly scene: MainMenu;
} | null;

const PhaserGame = dynamic(() => import("@/components/PhaserGame"), {
  ssr: false,
  loading: () => (
    <div className="bg-white dark:bg-black" style={{
      width: 480,
      height: 360,
    }} />
  ),
});

type BlockDrag = {
  blockId: string;
  group: string;
  newCoordinate: string;
  oldCoordinate: string;
}

type BlockSelection = {
  blockId: string;
  oldBlockId: string;
}

type Client = {
  id: number;
  user: PublicUser;
  blockDrag?: BlockDrag;
  blockSelection?: BlockSelection;
};

interface ProjectViewProps {
  projectId?: number;
}

const ProjectView: React.FC<ProjectViewProps> = ({ projectId }) => {
  const { user } = useAuth();
  const showSnackbar = useSnackbar();
  const blocklyRef = useRef<BlocklyEditorRef>(null);
  const phaserRef = useRef<{ game?: any; scene?: any } | null>(null);
  const yDocRef = useRef<Doc | null>(null);

  const [canMoveSprite, setCanMoveSprite] = useState(true);
  const [phaserState, setPhaserState] = useState<PhaserExport | null>(null);
  const [spriteInstances, setSpriteInstances] = useState<SpriteInstance[]>([]);
  const workspaceListenerRef = useRef<{
    workspace: Blockly.WorkspaceSvg;
    listener: (event: Blockly.Events.Abstract) => void;
  } | null>(null);
  const [clients, setClients] = useState<Client[]>([]);

  const changeScene = () => {
    phaserRef.current?.scene?.changeScene?.();
  };

  const applyBlocklyEvent = (event: any, workspace: Blockly.Workspace, forward: boolean = true) => {
    try {
      const blocklyEvent = Blockly.Events.fromJson(event, workspace);
      Blockly.Events.disable();
      blocklyEvent.run(forward);
    } catch (error) {
      console.error("Error applying remote Blockly event:", error);
    } finally {
      Blockly.Events.enable();
    }
  };

  const applyClientBlockProperties = (workspace: Blockly.Workspace, oldBlockId?: string, blockId?: string) => {
    if (oldBlockId) {
      const block = workspace.getBlockById(oldBlockId) as Blockly.BlockSvg;
      if (!block) return;
      block.setMovable(true);

      const path = block.pathObject.svgPath || block.getSvgRoot();
      path.classList.remove("stroke-red-500", "stroke-4");
    }
    if (blockId) {
      const block = workspace.getBlockById(blockId) as Blockly.BlockSvg;
      if (!block) return;
      block.setMovable(false);

      const path = block.pathObject.svgPath || block.getSvgRoot();
      path.classList.add("stroke-red-500", "stroke-4");
    }
  };

  useEffect(() => {
    let cleanupFunc = () => {};

    async function init() {
      const workspace: Blockly.Workspace = blocklyRef.current?.getWorkspace()!;

      if (!projectId) {
        if (workspace.getAllBlocks(false).length <= 0) {
          Blockly.serialization.workspaces.load(
            starterWorkspace,
            workspace
          );
        }
        return;
      }

      const project = await projectsApi(parseInt(projectId?.toString()!)).get();

      try {
        Blockly.Events.disable();
        Blockly.serialization.workspaces.load(
          Object.keys(project.blocks).length ? project.blocks : starterWorkspaceNewProject,
          workspace
        );
        Blockly.Events.enable();
      } catch {
        showSnackbar("Failed to load workspace!", "error");
      }

      setPhaserState(project.game_state);
      setSpriteInstances(project.sprites);

      const provider = new HocuspocusProvider({
        url: 'http://localhost:1234',
        name: String(projectId),
        token: authApi.getAccessToken,
      });

      const awareness = provider.awareness;

      if (!awareness) {
        provider.destroy();
        return;
      };

      awareness.setLocalStateField('user', toPublicUser(user!));

      const yDoc = provider.document;
      yDocRef.current = yDoc;

      const blocklyEvents = yDoc.getArray<object>('blockly-events');

      let pollingInterval: NodeJS.Timeout | null = null;
      let oldCoordinate: Blockly.utils.Coordinate | null = null;

      const stopDragPolling = () => {
        if (pollingInterval) {
          clearInterval(pollingInterval);
          pollingInterval = null;
          awareness.setLocalStateField('blockDrag', null);
        }
      };

      const eventsListener = (event: Blockly.Events.Abstract) => {
        if (event.type === Blockly.Events.BLOCK_DRAG) {
          const block = workspace.getBlockById((event as any).blockId);
          if (!block) return;

          if ((event as any).isStart) {
            oldCoordinate = block.getRelativeToSurfaceXY();

            pollingInterval = setInterval(() => {
              const pos = block.getRelativeToSurfaceXY();

              awareness.setLocalStateField('blockDrag', {
                blockId: (event as any).blockId,
                group: (event as any).group,
                newCoordinate: `${pos.x}, ${pos.y}`,
                oldCoordinate: `${oldCoordinate!.x}, ${oldCoordinate!.y}`,
              });

              oldCoordinate = block.getRelativeToSurfaceXY();
            }, 25);
          } else {
            stopDragPolling();
          }
        }

        if (event.type === Blockly.Events.SELECTED) {
          awareness.setLocalStateField('blockSelection', {
            blockId: (event as any).newElementId,
            oldBlockId: (event as any).oldElementId,
          });
        }

        // Only these events will get pushed straight to the doc
        if (![
          Blockly.Events.BLOCK_CREATE,
          Blockly.Events.BLOCK_DELETE,
          Blockly.Events.BLOCK_MOVE,
          Blockly.Events.BLOCK_CHANGE,
          Blockly.Events.VAR_CREATE,
          Blockly.Events.VAR_RENAME,
          Blockly.Events.VAR_DELETE,
        ].some(type => type === event.type)) {
          return;
        }

        if (event.type === Blockly.Events.BLOCK_DELETE) {
          stopDragPolling(); // This stops the polling when dragging the block to the toolbox to delete
        }

        if (event.type === Blockly.Events.BLOCK_MOVE) {
          if ((event as any)?.reason?.includes('bump')) {
            return; // This prevents a weird desync issue when blockly automatically moves blocks out of the way
          }
        }

        yDoc.transact(() => {
          blocklyEvents.push([event.toJson()]);
        }, yDoc.clientID);
      };

      awareness.on('update', ({ added, updated, removed }: Record<string, Array<any>>) => {
        if (added.length || removed.length) {
          setClients(clients => [
            ...clients.filter(({ id }) => !removed.includes(id)),
            ...added.map(id => ({
              id: id,
              user: awareness.getStates().get(id)?.user,
            }))
          ]);
        }

        if (updated.length) {
          updated.forEach(clientId => {
            if (clientId === yDoc.clientID) return;

            const currentBlockDragState = awareness.getStates().get(clientId)?.blockDrag;

            if (currentBlockDragState) {
              applyBlocklyEvent(
                Object.assign(
                  {},
                  currentBlockDragState,
                  {
                    type: 'move',
                    reason: ['drag'],
                  }
                ),
                workspace
              );
            }

            const currentBlockSelectionState = awareness.getStates().get(clientId)?.blockSelection;

            if (currentBlockSelectionState) {
              applyClientBlockProperties(
                workspace,
                currentBlockSelectionState.oldBlockId,
                currentBlockSelectionState.blockId,
              );
            }
          });
        }
      });

      const eventsObserver = (yEvent: YArrayEvent<object>, transaction: Transaction) => {
        if (transaction.origin !== yDoc.clientID) {
          yEvent.changes.added.forEach(item => {
            item.content.getContent().forEach((event: any) => {
              applyBlocklyEvent(event, workspace);
            });
          });
        }

        // This if statement needs to get fixed; should only not run when the document is being reset
        // For some reason the client's transaction origins are always its own provider and doesn't know what the server set it as
        if (transaction.origin !== provider) {
          yEvent.changes.deleted.forEach(item => {
            item.content.getContent().forEach((event: any) => {
              applyBlocklyEvent(event, workspace, false);
            });
          });
        }
      };

      workspace.addChangeListener(eventsListener);
      blocklyEvents.observe(eventsObserver);

      cleanupFunc = () => {
        workspace.removeChangeListener(eventsListener);
        blocklyEvents.unobserve(eventsObserver);
        provider.destroy();
      };
    }

    init();

    return cleanupFunc;
  }, []);

  useEffect(() => {
    console.log('clients', clients);
  }, [clients]);

  const addSprite = () => {
    phaserRef.current?.scene?.addStar?.();
  };

  const currentScene = (scene: { scene: { key: string } }) => {
    setCanMoveSprite(scene.scene.key !== "MainMenu");
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
    if (!projectId) return;

    const workspace: Blockly.Workspace = blocklyRef.current?.getWorkspace()!;
    const workspaceState: { [key: string]: any } =
      Blockly.serialization.workspaces.save(workspace);

    const phaserState = createPhaserState(phaserRef?.current!);

    projectsApi(parseInt(projectId!.toString())).update({
      blocks: workspaceState,
      game_state: phaserState,
      sprites: spriteInstances,
    })
    .then(res =>
      showSnackbar('Project saved successfully!', 'success')
    )
    .catch(err =>
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

  const attachBlockToOnStart = (
    workspace: Blockly.WorkspaceSvg,
    block: Blockly.BlockSvg
  ) => {
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
  };

  const handleSpriteDrop = (event: DragEvent<HTMLDivElement>) => {
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
    const scene = phaserRef.current.scene;
    const workspace =
      blocklyRef.current.getWorkspace() as Blockly.WorkspaceSvg | null;
    if (!game || !scene || !workspace || !game.canvas) return;

    const canvasRect = game.canvas.getBoundingClientRect();
    const relativeX = event.clientX - canvasRect.left;
    const relativeY = event.clientY - canvasRect.top;

    if (
      relativeX < 0 ||
      relativeY < 0 ||
      relativeX > canvasRect.width ||
      relativeY > canvasRect.height
    ) {
      return;
    }

    console.log(canvasRect.width, game.scale.width);
    console.log(canvasRect.height, game.scale.height);

    const worldX = Math.round(
      (relativeX / canvasRect.width) * game.scale.width
    );
    const worldY = Math.round(
      (relativeY / canvasRect.height) * game.scale.height
    );

    console.log(relativeX, worldX);
    console.log(relativeY, worldY);

    const safeBase = payload.texture.replace(/[^\w]/g, '') || 'sprite';
    const duplicateCount = spriteInstances.filter(
      (instance) => instance.texture === payload.texture
    ).length;
    const variableName = `${safeBase}${duplicateCount + 1}`;
    const spriteId = `sprite-${Date.now()}-${Math.round(Math.random() * 1e4)}`;

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
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
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

  return (
    <>
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="flex-1 min-h-0 min-w-0">
          <BlocklyEditor
            ref={blocklyRef}
            onWorkspaceReady={handleWorkspaceReady}
          />
        </div>

        <div className="flex flex-col h-[calc(100vh-4rem)] p-3">
          <div
            className="rounded-xl border border-dashed border-slate-400 dark:border-slate-600
                    p-2  bg-light-secondary dark:bg-dark-secondary"
            onDragOver={handleDragOver}
            onDrop={handleSpriteDrop}
            onPointerDown={handlePhaserPointerDown}
          >
            <PhaserGame ref={phaserRef} phaserState={phaserState} />
          </div>

          <div className="flex justify-around my-3">
            <Button
              className="btn-deny"
              onClick={changeScene}
              title="Change Scene"
            >
              Change Scene
            </Button>

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

            <Button
              onClick={saveProject}
              className="btn-alt2"
              title="Save"
            >
              Save
            </Button>

            <Button
              onClick={exportWorkspaceState}
              className="btn-neutral w-1/3"
              title="Export Workspace"
            >
              Export Workspace
            </Button>

            {/* currently adding this fucks the dimensions of the entire column and thus the phaser window :/ */}
            {/* <div
              className="w-full rounded-lg border border-slate-800
                   dark:border-slate-300 px-2 py-1 align-middle text-xs"
            >
              <pre className="mt-1">{`Sprite Position: { x: ${spritePosition.x}, y: ${spritePosition.y} }`}</pre>
            </div> */}
          </div>

          <SpriteEditor
            sprites={spriteInstances}
            onRemoveSprite={handleRemoveSprite}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectView;
