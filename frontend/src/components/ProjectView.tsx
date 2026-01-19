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
import { HocuspocusProvider } from "@hocuspocus/provider";
import type { Transaction, YMapEvent } from 'yjs';
import { authApi } from "@/lib/api/auth";
import { useAuth } from "@/contexts/AuthContext";
import { PublicUser, toPublicUser } from "@/lib/types/api/users";

type Block = Omit<
  Blockly.serialization.blocks.State,
  "id" | "inputs" | "next"
> & Partial<{
  "isShadow": boolean;
  "parentId": string;
  "inputName": string;
}>;

interface SerializedBlock extends Omit<Block, "isShadow" | "parentId"> {
  id: string;
  inputs?: Record<string, Record<"block" | "shadow", string>>;
  next?: Record<string, Record<"block" | "shadow", string>>;
}

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
          project.blocks,
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

      const blocksMap = yDoc.getMap<Block>('blocks');

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

        if (![
          Blockly.Events.BLOCK_CREATE,
          Blockly.Events.BLOCK_DELETE,
          Blockly.Events.BLOCK_MOVE,
          Blockly.Events.BLOCK_CHANGE,
        ].some(type => type === event.type)) {
          return;
        }

        console.log('event', event.toJson());
        console.log('event group', event.group);

        const serializeBlock = (blockId: string): SerializedBlock => {
          const block = workspace.getBlockById(blockId);
          console.log('original block object', block);

          if (!block) throw Error;

          console.log('original block json', Blockly.serialization.blocks.save(
            block,
            {
              addCoordinates: true,
              addInputBlocks: true,
              addNextBlocks: true,
              doFullSerialization: false
            }
          ));

          const inputs = Object.fromEntries(block.inputList.map((input) => {
            const shadowBlock = input.connection?.getShadowState();
            const targetBlock = input.connection?.targetBlock();

            return [
              input.name,
              {
                ...(shadowBlock && {
                  shadow: shadowBlock.id,
                }),
                ...(targetBlock && !targetBlock.isShadow() && {
                  block: targetBlock.id,
                }),
              }
            ];
          }).filter(input => Object.keys(input[1]).length));

          const nextShadowBlock = block.nextConnection?.getShadowState(true);
          const nextTargetBlock = block.nextConnection?.targetBlock();

          const next = {
            ...(nextShadowBlock && {
              shadow: nextShadowBlock.id,
            }),
            ...(nextTargetBlock && !nextTargetBlock.isShadow() && {
              block: nextTargetBlock.id,
            }),
          };

          const parentBlock = block.getParent();
          const inputName = parentBlock?.inputList.filter((input) => (
            input.connection?.targetBlock() === block
          ))?.[0]?.name;
          //const inputName = (block.outputConnection || block.previousConnection)?.getParentInput()?.name;
          const extraState = block.saveExtraState?.();
          const collapsed = block.isCollapsed();
          const deletable = block.isDeletable();
          const movable = block.isMovable();
          const editable = block.isEditable();
          const enabled = block.isEnabled();
          const inline = block.inputsInline

          const methodMapping: Partial<Record<keyof Block, keyof Blockly.Block>> = {
            "extraState": "saveExtraState",
            "isShadow": "isShadow",
            "collapsed": "isCollapsed",
            "deletable": "isDeletable",
            "movable": "isMovable",
            "editable": "isEditable",
            "enabled": "isEnabled",
            "inline": "inputsInline",
            "data": "data",
          };

          return {
            ...Blockly.serialization.blocks.save(
              block, {
                addCoordinates: true,
                addInputBlocks: false,
                addNextBlocks: false,
              }
            ),
            ...(Object.keys(inputs).length && {inputs: inputs}),
            ...(Object.keys(next).length && {next: next}),
            ...(block.isShadow() && {
              isShadow: true,
            }),
            ...(parentBlock?.id && {
              parentId: parentBlock?.id,
            }),
            ...(inputName && {
              inputName,
            }),
            ...Object.fromEntries(Object.entries(methodMapping).map(
              ([field, method]) => ([
                field,
                (typeof block[method]) === 'function'
                  ? (block[method] as Function)()
                  : block[method],
              ])
            ).filter(([_, value]) => value)),
          } as SerializedBlock;
        };

        const addShadowBlockToBlockList = (
          blocks: Record<string, Block>,
          block: Blockly.Block,
          parentId: string,
        ): void => {
          block.inputList.forEach((input) => {
            const targetBlock = input.connection?.targetBlock();
            if (targetBlock?.isShadow()) {
              const shadowBlock = Blockly.serialization.blocks.save(
                targetBlock,
              );
              if (!shadowBlock?.id) return;
              console.log('shadow block here', shadowBlock);
              blocks[shadowBlock.id] = {
                type: shadowBlock.type,
                parentId: parentId,
                inputName: input.name,
                isShadow: true,
                ...Object.fromEntries(Object.entries(shadowBlock).filter(
                  ([field, _]) =>
                    !["inputs", "icons", "disabledReasons", "icons", "next"].includes(field)
                ))
              };

              if (shadowBlock?.inputs) {
                addShadowBlockToBlockList(
                  blocks,
                  targetBlock,
                  shadowBlock.id,
                );
              }
            }
          });
        }

        const getBlocksFromSerializedBlock = (
          block: SerializedBlock,
        ): Record<string, Block> => {
          let blocks = {
            [block.id]: {
              ...Object.fromEntries(
                (["type", "fields", "x", "y", "parentId", "isShadow",
                  "inputName", "extraState", "collapsed", "deletable",
                  "movable", "editable", "enabled", "inline", "data"])
                  .map((field) => (
                    [field, block[field as keyof SerializedBlock]])
                  )
              ),
              ...(block?.inputs && {
                inputs: new Set(Object.keys(block.inputs))
              }),
            }
          } as Record<string, Block>;

          Object.entries(block?.inputs ?? {}).forEach(([inputName, value]) => {
            if (value?.block) {
              blocks = {
                ...blocks,
                ...getBlocksFromSerializedBlock(
                  {...serializeBlock(value.block), inputName},
                ),
              };
            }
            if (value?.shadow) {
              const blocklyBlock = workspace.getBlockById(block.id);
              if (!blocklyBlock) return;
              addShadowBlockToBlockList(
                blocks,
                blocklyBlock,
                block.id,
              );
            }
          });

          return blocks;
        }

        if (event.type === Blockly.Events.BLOCK_DELETE) {
          stopDragPolling(); // This stops the polling when dragging the block to the toolbox to delete
          const deleteEvent = event as Blockly.Events.BlockDelete;
          if (deleteEvent.wasShadow) return;
          yDoc.transact(() => {
            (deleteEvent.ids ?? []).forEach((id) => {
              blocksMap.delete(id);
            });
          }, yDoc.clientID);
          return;
        }

        if (event.type === Blockly.Events.BLOCK_MOVE) {
          const moveEvent = event as Blockly.Events.BlockMove;
          const prevData = blocksMap.get(moveEvent.blockId ?? '');
          if (!prevData) return;
          yDoc.transact(() => {
            blocksMap.set(
              moveEvent.blockId!,
              {
                ...prevData,
                parentId: moveEvent.newParentId,
                inputName: moveEvent.newInputName,
                x: moveEvent.newCoordinate?.x,
                y: moveEvent.newCoordinate?.y,
              }
            )
          }, yDoc.clientID);
          return;
        }

        const blockEvent = event as Blockly.Events.BlockCreate | Blockly.Events.BlockChange;

        const serializedBlock = serializeBlock(blockEvent.blockId ?? '');
        console.log(event.type, serializedBlock);
        console.log('blocks from getBlocksFromSerializedBlock', getBlocksFromSerializedBlock(serializedBlock));

        const blocks = getBlocksFromSerializedBlock(
          serializeBlock(
            blockEvent.blockId ?? '',
          ),
        );
        console.log('blocks created/updated', blocks);

        yDoc.transact(() => {
          Object.keys(blocks).forEach((id) => {
            blocksMap.set(id, blocks[id]);
          });
        }, yDoc.clientID);
      };

      const blocksMapObserver = (yEvent: YMapEvent<Block>, transaction: Transaction) => {
        if (transaction.origin === yDoc.clientID) return;

        Blockly.Events.disable();

        yEvent.changes.keys.forEach((change, key) => {
          if (change.action === 'add') {
            const data = blocksMap.get(key);
            if (!data) return;
            console.log('yEvent add', key, data)
            Blockly.serialization.blocks.append({
              id: key,
              ...(Object.fromEntries(Object.entries(data).filter(
                ([field, _]) => !["isShadow", "parentId", "inputName"].includes(field)
              )) as Blockly.serialization.blocks.State),
            }, workspace, {
              recordUndo: false,
            });
            const block = workspace.getBlockById(key);
            if (!block) return;
            block.setShadow(data.isShadow ?? false);
            block.setDisabledReason(!(data.enabled ?? true), '');
          } else if (change.action === 'update') {
            const data = blocksMap.get(key);
            if (!data) return;

            let block;

            if (data?.isShadow) {
              let currData: Block | undefined = data;
              let prevInputName: string = data.inputName ?? '';
              let prevKey = key;
              const path: string[] = [];
              while (currData?.isShadow) {
                path.unshift(prevInputName);
                prevKey = currData.parentId ?? '';
                currData = blocksMap.get(currData.parentId ?? '');
                prevInputName = currData?.inputName ?? '';
              }
              block = workspace.getBlockById(prevKey);
              console.log('non-shadow block obtained', block);
              if (!block) return;
              for (const inputName of path) {
                if (!block) return;
                block = block.getInputTargetBlock(inputName);
              }
              console.log('final block obtained', block);
            } else {
              block = workspace.getBlockById(key);
            }

            if (!block) return;

            Object.entries(data.fields ?? {}).forEach(([name, value]) => {
              block.setFieldValue(value, name);
            });

            if (data?.extraState) {
              block.loadExtraState?.(data.extraState);
            }

            if (!block.getParent()) {
              const coordinates = block.getRelativeToSurfaceXY();
              block.moveBy(
                (data.x ?? coordinates.x) - coordinates.x,
                (data.y ?? coordinates.y) - coordinates.y,
              );
            }

            const methodMapping: Partial<Record<keyof Block, keyof Blockly.Block>> = {
              "extraState": "loadExtraState",
              "isShadow": "setShadow",
              "collapsed": "setCollapsed",
              "deletable": "setDeletable",
              "movable": "setMovable",
              "editable": "setEditable",
              "enabled": "setDisabledReason",
              "inline": "inputsInline",
              "data": "data",
            };

            Object.entries(methodMapping).forEach(([field, method]) => {
              if ((typeof block[method] === 'function')) {
                if (method === 'setDisabledReason') {
                  (block[method] as Function)(!(data[field as keyof Block] ?? true));
                } else {
                  (block[method] as Function)(
                    data[field as keyof Block] ?? (
                      method === "loadExtraState" ? {} : false
                    )
                  );
                }
              } else {
                (block[method] as any) = block[method];
              }
            });
          } else if (change.action === 'delete') {
            console.log('attempting to remove block by id', key);
            workspace.getBlockById(key)?.dispose();
          }
        });

        yEvent.changes.keys.forEach((change, key) => {
          if (change.action === 'delete') return;
          const data = blocksMap.get(key);
          if (!data?.parentId) return;
          const parentData = blocksMap.get(data.parentId);
          if (!data) return;
          console.log('block ids', key, data.parentId);
          const childBlock = workspace.getBlockById(key);
          const parentBlock = workspace.getBlockById(data.parentId);
          if (!childBlock || !parentBlock) return;
          console.log('attempting to get input', data.inputName, parentBlock.getInput(data.inputName ?? '')?.connection);
          const inputConnection = (
            data.inputName
            ? parentBlock.getInput(data.inputName)?.connection
            : parentBlock.nextConnection
          );
          const childConnection = childBlock.outputConnection || childBlock.previousConnection;
          console.log('connections', inputConnection, childConnection);
          if ((!data?.isShadow || parentData?.isShadow) && inputConnection && childConnection
            && inputConnection.targetConnection !== childConnection) {
            inputConnection.connect(childConnection);
          }
        });

        // Add the shadow states to the blocks
        yEvent.changes.keys.forEach((change, key) => {
          if (change.action !== 'add') return;
          const data = blocksMap.get(key);
          if (!data?.parentId || !data?.isShadow) return;
          const shadowBlock = workspace.getBlockById(key);
          const parentBlock = workspace.getBlockById(data.parentId);
          if (!shadowBlock || !parentBlock || parentBlock.isShadow()) return;
          const shadowState = Blockly.serialization.blocks.save(
            shadowBlock,
            {
              doFullSerialization: true,
            }
          );
          parentBlock.getInput(data.inputName ?? '')?.connection?.setShadowState(shadowState);
        });

        // Dispose the shadow blocks (no longer needed)
        yEvent.changes.keys.forEach((change, key) => {
          if (change.action !== 'add') return;
          const data = blocksMap.get(key);
          if (!data?.isShadow) return;
          workspace.getBlockById(key)?.dispose();
        });

        Blockly.Events.enable();
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

      workspace.addChangeListener(eventsListener);
      blocksMap.observe(blocksMapObserver);

      cleanupFunc = () => {
        workspace.removeChangeListener(eventsListener);
        blocksMap.unobserve(blocksMapObserver);
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
