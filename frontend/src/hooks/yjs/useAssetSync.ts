import { useGeckodeStore } from "@/stores/geckodeStore";
import { useYjs } from "./useYjs"
import { useEffect } from "react";
import * as Y from 'yjs';
import { AssetType } from "@/stores/slices/types";
import { isEditorScene } from "@/phaser/sceneGuards";
import { getYDoc } from "@/lib/types/yjs/documents";

export const useAssetSync = (documentName: string, assetType: AssetType) => {
  const { doc, isSynced, onSynced } = useYjs(documentName);
  const assetsMap = doc.getMap<string>(assetType);

  useEffect(() => {
    if (!assetsMap) return;

    const handleSync = () => {
      // Load initial assets
      const storeState = useGeckodeStore.getState();
      assetsMap.forEach((base64Image, key) => {
        storeState.setAsset(key, base64Image, assetType, false);

        if (assetType === "textures" && isEditorScene(storeState.phaserScene)) {
          console.log('loading initial texture from sync');
          storeState.phaserScene.updateSpriteTextureAsync(key, base64Image);
        }
      });

      // Set up observer for future changes
      const observer = (event: Y.YMapEvent<string>, transaction: Y.Transaction) => {
        if (transaction.origin === doc.clientID) return;

        const storeState = useGeckodeStore.getState();

        event.changes.keys.forEach((change, key) => {
          if (change.action === "delete" && assetType !== "tilesets") {
            storeState.removeAsset(key, assetType, false);
          } else {
            const base64Image = assetsMap.get(key) ?? '';
            storeState.setAsset(key, base64Image, assetType, false);

            if (assetType === "textures" && isEditorScene(storeState.phaserScene)) {
              console.log('loading texture from sync');
              storeState.phaserScene.updateSpriteTextureAsync(key, base64Image);
            }
          }
        });
      };

      assetsMap.observe(observer);

      return () => assetsMap.unobserve(observer);
    };

    // Register sync callback
    const cleanup = onSynced(handleSync);

    // If already synced, call immediately
    if (isSynced()) {
      const observerCleanup = handleSync();
      return () => {
        cleanup();
        observerCleanup?.();
      };
    }

    return cleanup;
  }, [assetsMap, doc, assetType, isSynced, onSynced]);
}

export const setAssetSync = (name: string, base64Image: string, type: string) => {
  const doc = getYDoc();
  if (!doc) return;

  const assetsMap = doc.getMap<string>(type);
  if (!assetsMap) return;

  doc.transact(() => {
    assetsMap.set(name, base64Image);
  }, doc.clientID);
};

export const deleteAssetSync = (name: string, type: string) => {
  const doc = getYDoc();
  if (!doc) return;

  const assetsMap = doc.getMap<string>(type);
  if (!assetsMap) return;

  doc.transact(() => {
    assetsMap.delete(name);
  }, doc.clientID);
};