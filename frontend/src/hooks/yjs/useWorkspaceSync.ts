import { SpriteInstance, useGeckodeStore } from "@/stores/geckodeStore";
import { useYjs } from "./useYjs";
import * as Y from 'yjs';
import { useEffect } from "react";
import { useBlockSync } from "./useBlockSync";
import { useVariableSync } from "./useVariableSync";
import { ydoc } from "@/lib/types/yjs/document";
import { useAssetSync } from "./useAssetSync";
import EditorScene from "@/phaser/scenes/EditorScene";
import * as Blockly from "blockly/core";

const createSpriteObserver = (id: string, spriteMap: Y.Map<SpriteInstance>) => {
  const spriteObserver = (event: Y.YMapEvent<SpriteInstance>, transaction: Y.Transaction) => {
    if (transaction.origin === ydoc.clientID) return;

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

export const useWorkspaceSync = (documentName: string) => {
  const { doc } = useYjs(documentName);
  const workspaces = doc.getArray<Y.Map<any>>('workspaces');

  useBlockSync(documentName);
  useVariableSync(documentName);
  useAssetSync(documentName, "textures");

  useEffect(() => {
    if (!workspaces) return;

    let spriteUnobservers: Record<string, () => void> = {};

    const workspacesObserver = (event: Y.YArrayEvent<Y.Map<any>>, transaction: Y.Transaction) => {
      if (transaction.origin === doc.clientID) return;

      const storeState = useGeckodeStore.getState();
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

            spriteUnobservers[spriteInstance.id] = createSpriteObserver(
              spriteInstance.id,
              workspaces.get(index).get('sprite'),
            );
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

      useGeckodeStore.setState((s) => ({
        spriteInstances: newSpriteInstances,
        selectedSpriteId: !deletedSpriteIds.includes(s.selectedSpriteId ?? '')
          ? s.selectedSpriteId
          : newSpriteInstances.length
            ? newSpriteInstances[newSpriteInstances.length - 1].id
            : null,
        spriteWorkspaces: {
          ...Object.fromEntries(
            addedSpriteIds.map((id) => [id, new Blockly.Workspace()])
          ),
          ...Object.fromEntries(
            Object.entries(s.spriteWorkspaces).filter(
              ([id, _]) => !deletedSpriteIds.includes(id),
            )
          ),
        }
      }));
    };

    workspaces.observe(workspacesObserver);

    return () => {
      workspaces.unobserve(workspacesObserver);
      Object.values(spriteUnobservers).forEach((func) => func());
    };
  }, [workspaces]);
};

export const addSpriteSync = (instance: SpriteInstance) => {
  const workspaces = ydoc.getArray<Y.Map<any>>('workspaces');
  if (!workspaces) return;

  ydoc.transact(() => {
    const wrapperMap = new Y.Map<any>();
    const instanceMap = new Y.Map<SpriteInstance>();

    Object.entries(instance).forEach(([key, value]) => {
      instanceMap.set(key, value as any);
    });

    spriteUnobservers[instance.id] = createSpriteObserver(instance.id, instanceMap);

    wrapperMap.set('sprite', instanceMap);
    wrapperMap.set('blocks', new Y.Map());

    console.log('pushing new ymap to workspaces');

    workspaces.push([wrapperMap]);
  }, ydoc.clientID);
};

export const updateSpriteSync = (id: string, instance: Partial<SpriteInstance>) => {
  const workspaces = ydoc.getArray<Y.Map<any>>('workspaces');
  if (!workspaces) return;

  const instanceMap = workspaces.get(
    useGeckodeStore.getState().spriteInstances.findIndex((instance) => instance.id === id)
  )?.get('sprite');
  if (!instanceMap) return;

  ydoc.transact(() => {
    Object.entries(instance).forEach(([key, value]) => {
      instanceMap.set(key, value as any);
    });
  }, ydoc.clientID);
};

export const deleteSpriteSync = (id: string) => {
  const workspaces = ydoc.getArray<Y.Map<any>>('workspaces');
  if (!workspaces) return;

  spriteUnobservers[id]?.();
  delete spriteUnobservers[id];

  ydoc.transact(() => {
    for (let i = 0; i < workspaces.length; i++) {
      if (workspaces.get(i).get('sprite').get('id') === id) {
        workspaces.delete(i);
        break;
      }
    }
  }, ydoc.clientID);
};