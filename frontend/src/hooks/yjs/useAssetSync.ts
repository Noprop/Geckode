import { useGeckodeStore } from "@/stores/geckodeStore";
import { useYjs } from "./useYjs"
import { useEffect } from "react";
import * as Y from 'yjs';
import { ydoc } from "@/lib/types/yjs/document";
import { AssetType } from "@/stores/slices/types";
import EditorScene from "@/phaser/scenes/EditorScene";

export const useAssetSync = (documentName: string, assetType: AssetType) => {
  const { doc } = useYjs(documentName);
  const assetsMap = doc.getMap<string>(assetType);
  // const textures = useGeckodeStore((s) => s.textures);

  // useEffect(() => {
  //   if (!texturesMap) return;

  //   doc.transact(() => {
  //     Object.entries(textures).forEach(([key, value]) => {
  //       if (texturesMap.get(key) !== value) {
  //         texturesMap.set(key, value);
  //       }
  //     });

  //     texturesMap.forEach((_, key) => {
  //       if (!(key in textures)) {
  //         texturesMap.delete(key);
  //       }
  //     });
  //   }, doc.clientID);
  // }, [texturesMap, textures]);

  useEffect(() => {
    if (!assetsMap) return;

    const observer = (event: Y.YMapEvent<string>, transaction: Y.Transaction) => {
      if (transaction.origin === doc.clientID) return;

      const storeState = useGeckodeStore.getState();

      event.changes.keys.forEach((change, key) => {
        if (change.action === "delete") {
          storeState.removeAsset(key, assetType, false);
        } else {
          const base64Image = assetsMap.get(key) ?? '';
          storeState.setAsset(key, base64Image, assetType, false);

          if (assetType === "textures" && storeState.phaserScene instanceof EditorScene) {
            console.log('loading texture from sync');
            storeState.phaserScene.updateSpriteTextureAsync(key, base64Image);
          }
        }
      });
    };

    assetsMap.observe(observer);

    return () => assetsMap.unobserve(observer);
  }, [assetsMap]);
}

export const setAssetSync = (name: string, base64Image: string, type: string) => {
  const assetsMap = ydoc.getMap<string>(type);
  if (!assetsMap) return;

  ydoc.transact(() => {
    assetsMap.set(name, base64Image);
  }, ydoc.clientID);
};

export const deleteAssetSync = (name: string, type: string) => {
  const assetsMap = ydoc.getMap<string>(type);
  if (!assetsMap) return;

  ydoc.transact(() => {
    assetsMap.delete(name);
  }, ydoc.clientID);
};