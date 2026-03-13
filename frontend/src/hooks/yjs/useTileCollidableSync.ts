import { useEffect } from "react";
import * as Y from "yjs";
import { useGeckodeStore } from "@/stores/geckodeStore";
import { useYjs } from "./useYjs";
import { getYDoc } from "@/lib/types/yjs/documents";

export const useTileCollidableSync = (documentName: string) => {
  const { doc, isSynced, onSynced } = useYjs(documentName);
  const tileCollidablesMap = doc.getMap<boolean>("tileCollidables");

  useEffect(() => {
    if (!tileCollidablesMap) return;

    const handleSync = () => {
      const currentLocal = useGeckodeStore.getState().tileCollidables;
      const synced: Record<string, boolean> = {};
      tileCollidablesMap.forEach((value, key) => {
        synced[key] = value;
      });

      useGeckodeStore.setState({
        tileCollidables: {
          ...currentLocal,
          ...synced,
        },
      });

      const observer = (event: Y.YMapEvent<boolean>, transaction: Y.Transaction) => {
        if (transaction.origin === doc.clientID) return;

        useGeckodeStore.setState((s) => {
          const next = { ...s.tileCollidables };
          event.changes.keys.forEach((change, key) => {
            if (change.action === "delete") {
              delete next[key];
              return;
            }
            next[key] = tileCollidablesMap.get(key) ?? false;
          });
          return { tileCollidables: next };
        });
      };

      tileCollidablesMap.observe(observer);
      return () => tileCollidablesMap.unobserve(observer);
    };

    const cleanup = onSynced(handleSync);

    if (isSynced()) {
      const observerCleanup = handleSync();
      return () => {
        cleanup();
        observerCleanup?.();
      };
    }

    return cleanup;
  }, [tileCollidablesMap, doc, isSynced, onSynced]);
};

export const setTileCollidableSync = (tileKey: string, collidable: boolean) => {
  const doc = getYDoc();
  if (!doc) return;

  const tileCollidablesMap = doc.getMap<boolean>("tileCollidables");
  if (!tileCollidablesMap) return;

  doc.transact(() => {
    if (collidable) {
      tileCollidablesMap.set(tileKey, true);
    } else {
      tileCollidablesMap.delete(tileKey);
    }
  }, doc.clientID);
};
