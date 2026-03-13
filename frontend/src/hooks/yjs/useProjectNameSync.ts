import { useGeckodeStore } from "@/stores/geckodeStore";
import { useYjs } from "./useYjs";
import { useEffect } from "react";
import * as Y from "yjs";
import { getYDoc } from "@/lib/types/yjs/documents";

export const useProjectNameSync = (documentName: string) => {
  const { doc, isSynced, onSynced } = useYjs(documentName);
  const projectMetaMap = doc.getMap<any>('meta');
  const setProjectName = useGeckodeStore((s) => s.setProjectName);

  useEffect(() => {
    const handleSync = () => {
      // Load initial project name
      const initialName = projectMetaMap.get("name");
      if (typeof initialName === "string") {
        setProjectName(initialName, false);
      }

      // Set up observer for future changes
      const projectMetaMapObserver = (event: Y.YMapEvent<any>, transaction: Y.Transaction) => {
        if (transaction.origin === doc.clientID) return;

        event.changes.keys.forEach((change, key) => {
          if (change.action !== "delete" && key === "name") {
            setProjectName(projectMetaMap.get(key), false);
          }
        });
      };

      projectMetaMap.observe(projectMetaMapObserver);

      return () => projectMetaMap.unobserve(projectMetaMapObserver);
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
  }, [doc, projectMetaMap, setProjectName, onSynced, isSynced]);
};

export const projectNameSync = (projectName: string) => {
  const doc = getYDoc();
  if (!doc) return;

  const projectMetaMap = doc.getMap<any>("meta");

  doc.transact(() => {
    projectMetaMap.set("name", projectName);
  }, doc.clientID);
};