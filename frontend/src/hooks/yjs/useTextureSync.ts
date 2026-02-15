import { useGeckodeStore } from "@/stores/geckodeStore";
import { useYjs } from "./useYjs"
import { useEffect } from "react";
import * as Y from 'yjs';

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
            const { key, ...updatedTextures } = s.textures;

            return {
              textures: updatedTextures,
            };
          });
        } else {
          useGeckodeStore.setState((s) => ({
            textures: {
              ...s.textures,
              [key]: texturesMap.get(key) ?? '',
            },
          }));
        }
      });
    };

    texturesMap.observe(observer);

    return () => texturesMap.unobserve(observer);
  }, [texturesMap]);
}