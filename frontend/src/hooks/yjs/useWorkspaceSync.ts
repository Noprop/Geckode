import { SpriteInstance, useGeckodeStore } from "@/stores/geckodeStore";
import { useYjs } from "./useYjs";
import * as Y from 'yjs';
import { useEffect } from "react";
import { blocksMapChangesHandler, useBlockSync } from "./useBlockSync";
import { useVariableSync } from "./useVariableSync";
import { documentRegistry } from "@/lib/types/yjs/documents";
import { useAssetSync } from "./useAssetSync";
import EditorScene from "@/phaser/scenes/EditorScene";
import * as Blockly from "blockly/core";
import { useProjectNameSync } from "./useProjectNameSync";
import { starterSpriteWorkspaces, starterTextures } from "@/blockly/workspaces/starter";
import { Block } from "@/lib/types/yjs/blocks";
import { useTilesetSync } from "./useTilesetSync";
import { useTilemapSync } from "./useTilemapSync";
import { useTileCollidableSync } from "./useTileCollidableSync";
import { refreshSpriteGhostBlocks } from "@/lib/blockly/blocks";

const createSpriteObserver = (id: string, spriteMap: Y.Map<SpriteInstance>, doc: Y.Doc) => {
  const spriteObserver = (event: Y.YMapEvent<SpriteInstance>, transaction: Y.Transaction) => {
    if (transaction.origin === doc.clientID) return;

    const updates: Partial<SpriteInstance> = {};

    event.changes.keys.forEach((change, key) => {
      if (change.action === "delete") return;
      updates[key as keyof SpriteInstance] = spriteMap.get(key) as any;
    });

    useGeckodeStore.getState().updateSpriteInstance(id, updates, false);
  };

  spriteMap.observe(spriteObserver);
  return () => spriteMap.unobserve(spriteObserver);
};

let spriteUnobservers: Record<string, () => void> = {};
console.log('spriteUnobservers', spriteUnobservers);

const loadInitialWorkspaces = (
  workspaces: Y.Array<Y.Map<any>>,
  doc: Y.Doc,
  blocklyWorkspace: Blockly.Workspace | null
): boolean => {
  if (!workspaces || !workspaces.length) return false;

  const storeState = useGeckodeStore.getState();
  const newSpriteInstances: SpriteInstance[] = [];
  const spriteWorkspaces: Record<string, Blockly.Workspace> = {};

  // First pass: load all existing workspaces from the document
  for (let i = 0; i < workspaces.length; i++) {
    const workspace = workspaces.get(i);
    const spriteMap = workspace.get('sprite');
    if (!(spriteMap instanceof Y.Map)) continue;

    const spriteInstance = spriteMap.toJSON() as SpriteInstance;
    newSpriteInstances.push(spriteInstance);
    
    const spriteId = spriteInstance.id;
    spriteWorkspaces[spriteId] = new Blockly.Workspace();

    // Set up observer for sprite changes
    spriteUnobservers[spriteId] = createSpriteObserver(spriteId, spriteMap, doc);

    // Create Phaser sprite if scene is available
    if (storeState.phaserScene instanceof EditorScene) {
      console.log('creating phaser sprite from initial load');
      storeState.phaserScene.createSprite(spriteInstance);
    }
  }

  // Add sprite instances to the store now so that the dropdowns are populated
  if (newSpriteInstances.length > 0) {
    console.log('loading initial sprite instances', newSpriteInstances);
    useGeckodeStore.setState({
      spriteInstances: newSpriteInstances,
      spriteWorkspaces: {
        ...storeState.spriteWorkspaces,
        ...spriteWorkspaces,
      },
    });
  }

  // Second pass: load blocks for each sprite now that the dropdowns are populated
  for (let i = 0; i < workspaces.length; i++) {
    const workspace = workspaces.get(i);
    const spriteMap = workspace.get('sprite');
    if (!(spriteMap instanceof Y.Map)) continue;

    const spriteId = spriteMap.get('id') as string;

    // Load blocks for this sprite
    const blocksMap = workspace.get('blocks');
    if (blocksMap instanceof Y.Map && blocksMap.size > 0) {
      blocksMapChangesHandler(
        spriteId,
        spriteWorkspaces[spriteId],
        blocksMap,
        new Map(Array.from(blocksMap.keys()).map((key) => [
          key,
          {
            action: "add" as const,
            oldValue: undefined,
          },
        ])),
      );
    }
  }

  return true;
};

export const useWorkspaceSync = (documentName: string) => {
  const { doc, isSynced, onSynced, persistence } = useYjs(documentName);
  const blocklyWorkspace = useGeckodeStore((s) => s.blocklyWorkspace);
  const workspaces = doc.getArray<Y.Map<any>>('workspaces');

  useBlockSync(documentName);
  useVariableSync(documentName);
  useProjectNameSync(documentName);
  useAssetSync(documentName, "textures");
  useAssetSync(documentName, "tiles");
  useTilesetSync(documentName);
  useTilemapSync(documentName);
  useTileCollidableSync(documentName);

  useEffect(() => {
    useGeckodeStore.setState({
      persistence,
    });
  }, [persistence]);

  // Wait for sync before setting up observers and loading initial data.
  // blocklyWorkspace is null in play/share mode; loadInitialWorkspaces still runs and uses spriteWorkspaces only.
  useEffect(() => {
    if (!workspaces) return;

    let observerCleanup: (() => void) | null = null;
    let initialLoadComplete = false;
    let remoteActivity = false;
    let defaultSeedTimeout: NodeJS.Timeout | null = null;

    const handleSync = () => {
      // Prevent duplicate calls
      if (initialLoadComplete) return;
      initialLoadComplete = true;

      // Load initial data after sync (blocklyWorkspace may be null in share/play mode)
      const hadInitialWorkspaces = loadInitialWorkspaces(workspaces, doc, blocklyWorkspace);

      // Now set up observer for future changes (only processes changes after this point)
      const workspacesDeepObserver = (events: Y.YEvent<any>[], transaction: Y.Transaction) => {
        // Skip events from our own client
        if (transaction.origin === doc.clientID) return;

        // Any remote transaction counts as remote activity; this is used to decide
        // whether it's safe to seed default workspaces/assets.
        remoteActivity = true;

        let storeState = useGeckodeStore.getState();

        events.forEach((event) => {
          console.log('event path', event.path);
          if (event.path.length === 0) {
            let index = 0;
            let newSpriteInstances = [...storeState.spriteInstances];
            let addedSpriteIds: string[] = [];
            let deletedSpriteIds: string[] = [];

            event.changes.delta.forEach(op => {
              if (op.retain) {
                index += op.retain;
              } else if (op.insert) {
                (op.insert as Y.Map<any>[]).forEach((workspace) => {
                  console.log('workspace getting synced', workspace);
                  const spriteInstance = workspace.get('sprite').toJSON() as SpriteInstance;
                  newSpriteInstances.splice(index, 0, spriteInstance);
                  addedSpriteIds.push(spriteInstance.id);

                  if (storeState.phaserScene instanceof EditorScene) {
                    console.log('creating phaser sprite from sync');
                    storeState.phaserScene.createSprite(spriteInstance);
                  }

                  index += 1;
                });
              } else if (op.delete) {
                const id = newSpriteInstances[index].id;
                deletedSpriteIds.push(id);

                spriteUnobservers[id]?.();
                delete spriteUnobservers[id];

                storeState.spriteWorkspaces[id]?.dispose();

                if (storeState.phaserScene instanceof EditorScene) {
                  storeState.phaserScene.removeSprite(id);
                }

                newSpriteInstances.splice(index, op.delete);
              }
            });

            console.log('changing sprite instances', newSpriteInstances);

            // Need to call removeSpriteInstance specifically because it has a lot of important logic
            deletedSpriteIds.forEach((id) => {
              storeState.removeSpriteInstance(id, false);
            });

            useGeckodeStore.setState((s) => ({
              spriteInstances: newSpriteInstances,
              spriteWorkspaces: {
                ...Object.fromEntries(
                  addedSpriteIds.map((id) => [id, new Blockly.Workspace()])
                ),
                ...Object.fromEntries(
                  Object.entries(s.spriteWorkspaces).filter(
                    ([id, _]) => !deletedSpriteIds.includes(id),
                  )
                ),
              },
              spriteIdsUpdated: [...new Set([...s.spriteIdsUpdated, ...addedSpriteIds])],
            }));

            storeState = useGeckodeStore.getState();

            // Refresh the spriteGhost dropdowns for the newly added sprites
            if (addedSpriteIds.length) {
              Object.entries(storeState.spriteWorkspaces).forEach(([id, workspace]) => {
                if (!addedSpriteIds.includes(id)) {
                  refreshSpriteGhostBlocks(
                    storeState.selectedSpriteId === id
                      ? storeState.blocklyWorkspace
                      : workspace,
                  );
                }
              });
            }

            addedSpriteIds.forEach((id) => {
              const blocksMap = workspaces.get(
                storeState.spriteInstances.findIndex((instance) => instance.id === id)
              ).get('blocks');

              if (!(blocksMap instanceof Y.Map)) return;

              blocksMapChangesHandler(
                id,
                storeState.spriteWorkspaces[id],
                blocksMap,
                new Map(Array.from(blocksMap.keys()).map((key) => [
                  key,
                  {
                    action: "add",
                    oldValue: undefined,
                  },
                ])),
              );
            });
          } else if (event.path[1] === "sprite") {
            const spriteMap = workspaces.get(event.path[0] as number)?.get(event.path[1]);
            if (!(spriteMap instanceof Y.Map)) return;

            const updates: Partial<SpriteInstance> = {};

            event.changes.keys.forEach((change, key) => {
              if (change.action === "delete") return;
              updates[key as keyof SpriteInstance] = spriteMap.get(key) as any;
            });

            storeState.updateSpriteInstance(spriteMap.get('id'), updates, false);
          } else if (event.path[1] === "blocks") {
            const blocksMap = workspaces.get(event.path[0] as number)?.get(event.path[1]);
            if (!(blocksMap instanceof Y.Map)) return;

            const spriteId = storeState.spriteInstances[event.path[0] as number].id;
            const workspace = storeState.spriteWorkspaces[spriteId];
            if (!(workspace instanceof Blockly.Workspace)) return;
            console.log('workspace is Blockly.Workspace');

            const targetWorkspace =
              blocklyWorkspace && storeState.selectedSpriteId === spriteId
                ? blocklyWorkspace
                : workspace;
            if (!targetWorkspace) return;
            blocksMapChangesHandler(
              spriteId,
              targetWorkspace,
              blocksMap,
              event.changes.keys,
            );
          }
        });
      };

      workspaces.observeDeep(workspacesDeepObserver);

      if (!hadInitialWorkspaces && !useGeckodeStore.getState().projectId) {
        // Set a timeout to seed the default workspaces/assets due underterministic loading times
        defaultSeedTimeout = setTimeout(() => {
          if (remoteActivity) return;

          if (workspaces.length > 0) return;

          const texturesMap = doc.getMap<string>('textures');
          if (texturesMap.size > 0) return;
          
          Object.entries(starterTextures).forEach(([textureName, base64Image]) => {
            texturesMap.set(textureName, base64Image);
          });
      
          starterSpriteWorkspaces.forEach((workspace) => {
            const spriteMap = new Y.Map<SpriteInstance>();
            const blocksMap = new Y.Map<Block>();
      
            Object.entries(workspace.sprite).forEach(([key, value]) => {
              spriteMap.set(key, value as any);
            });
      
            Object.entries(workspace.blocks).forEach(([id, block]) => {
              blocksMap.set(id, block);
            });
      
            const workspaceMap = new Y.Map<any>();
            workspaceMap.set('sprite', spriteMap);
            workspaceMap.set('blocks', blocksMap);
      
            workspaces.push([workspaceMap]);
          });
        }, 500);
      }

      observerCleanup = () => {
        workspaces.unobserveDeep(workspacesDeepObserver);
        if (defaultSeedTimeout !== null) {
          clearTimeout(defaultSeedTimeout);
        }
      };
    };

    // Register sync callback
    const syncCleanup = onSynced(handleSync);

    // If already synced, call immediately
    if (isSynced()) {
      handleSync();
    }

    return () => {
      syncCleanup();
      observerCleanup?.();
    };
  }, [workspaces, blocklyWorkspace, doc, isSynced, onSynced]);
};

export function getYDoc(): Y.Doc | undefined {
  const projectId = useGeckodeStore.getState().projectId;
  return documentRegistry.get(String(projectId ?? ''));
}

export const addSpriteSync = (instance: SpriteInstance, duplicatedFromSpriteIndex?: number) => {
  const doc = getYDoc();
  if (!doc) return;

  const workspaces = doc.getArray<Y.Map<any>>('workspaces');
  if (!workspaces) return;

  doc.transact(() => {
    const wrapperMap = new Y.Map<any>();
    const instanceMap = new Y.Map<SpriteInstance>();

    Object.entries(instance).forEach(([key, value]) => {
      instanceMap.set(key, value as any);
    });

    spriteUnobservers[instance.id] = createSpriteObserver(instance.id, instanceMap, doc);

    wrapperMap.set('sprite', instanceMap);

    const blocksMap = new Y.Map<Block>();
    if (duplicatedFromSpriteIndex !== undefined) {
      const sourceBlocksMap = workspaces.get(duplicatedFromSpriteIndex)?.get('blocks');
      if (sourceBlocksMap instanceof Y.Map) {
        sourceBlocksMap.forEach((block, key) => {
          blocksMap.set(key, block);
        });
      }
    }
    wrapperMap.set('blocks', blocksMap);

    console.log('pushing new ymap to workspaces');

    workspaces.push([wrapperMap]);
  }, doc.clientID);
};

export const updateSpriteSync = (id: string, instance: Partial<SpriteInstance>) => {
  const doc = getYDoc();
  if (!doc) return;

  const workspaces = doc.getArray<Y.Map<any>>('workspaces');
  if (!workspaces) return;

  const instanceMap = workspaces.get(
    useGeckodeStore.getState().spriteInstances.findIndex((instance) => instance.id === id)
  )?.get('sprite');
  if (!instanceMap) return;

  doc.transact(() => {
    Object.entries(instance).forEach(([key, value]) => {
      instanceMap.set(key, value as any);
    });
  }, doc.clientID);
};

export const deleteSpriteSync = (id: string) => {
  const doc = getYDoc();
  if (!doc) return;

  const workspaces = doc.getArray<Y.Map<any>>('workspaces');
  if (!workspaces) return;

  spriteUnobservers[id]?.();
  delete spriteUnobservers[id];

  doc.transact(() => {
    for (let i = 0; i < workspaces.length; i++) {
      if (workspaces.get(i).get('sprite').get('id') === id) {
        workspaces.delete(i);
        break;
      }
    }
  }, doc.clientID);
};