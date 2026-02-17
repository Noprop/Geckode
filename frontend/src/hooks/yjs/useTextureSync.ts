import { useGeckodeStore } from "@/stores/geckodeStore";
import { useYjs } from "./useYjs"
import { useEffect } from "react";
import * as Y from 'yjs';
import EditorScene from "@/phaser/scenes/EditorScene";

export const useTextureSync = (documentName: string) => {
  const { doc } = useYjs(documentName);
  const texturesMap = doc.getMap<string>('textures');
  const textures = useGeckodeStore((s) => s.textures);

  useEffect(() => {
    if (!texturesMap) return;

    doc.transact(() => {
      Object.entries(textures).forEach(([key, value]) => {
        if (texturesMap.get(key) !== value) {
          texturesMap.set(key, value);
        }
      });

      texturesMap.forEach((_, key) => {
        if (!(key in textures)) {
          texturesMap.delete(key);
        }
      });
    }, doc.clientID);
  }, [texturesMap, textures]);

  useEffect(() => {
    if (!texturesMap) return;

    const observer = (event: Y.YMapEvent<string>, transaction: Y.Transaction) => {
      if (transaction.origin === doc.clientID) return;

      event.changes.keys.forEach((change, key) => {
        if (change.action === "delete") {
          useGeckodeStore.setState((s) => {
            const { [key]: _, ...updatedTextures } = s.textures;
            const { [key]: __, ...updatedLoadingState } = s.textureLoadingState;

            return {
              textures: updatedTextures,
              textureLoadingState: updatedLoadingState,
            };
          });
        } else {
          const base64Image = texturesMap.get(key) ?? '';
          useGeckodeStore.setState((s) => ({
            textures: {
              ...s.textures,
              [key]: base64Image,
            },
            textureLoadingState: {
              ...s.textureLoadingState,
              [key]: 'pending',
            },
          }));

          // Trigger async texture loading in Phaser
          const { phaserScene, textureLoadingState } = useGeckodeStore.getState();
          if (phaserScene instanceof EditorScene && textureLoadingState[key] !== 'loading') {
            useGeckodeStore.getState().setTextureLoadState(key, 'loading');
            phaserScene.loadSpriteTextureAsync(key, base64Image).then(() => {
              console.log(`Texture ${key} loaded successfully, processing pending sprites`);
              useGeckodeStore.getState().setTextureLoadState(key, 'loaded');
              
              // Process any pending sprites waiting for this texture
              phaserScene.processPendingSpritesForTexture(key);
            }).catch((err) => {
              console.error(`Failed to load texture ${key}:`, err);
              useGeckodeStore.getState().setTextureLoadState(key, 'error');
            });
          }
        }
      });
    };

    texturesMap.observe(observer);

    return () => texturesMap.unobserve(observer);
  }, [texturesMap]);
}