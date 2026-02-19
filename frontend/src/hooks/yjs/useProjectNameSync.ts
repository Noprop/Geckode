import { useGeckodeStore } from "@/stores/geckodeStore";
import { useYjs } from "./useYjs";
import { useEffect } from "react";
import * as Y from "yjs";
import { ydoc } from "@/lib/types/yjs/document";

export const useProjectNameSync = (documentName: string) => {
  const { doc, isSynced, onSynced } = useYjs(documentName);
  const projectNameText = doc.getText('projectName');
  const setProjectName = useGeckodeStore((s) => s.setProjectName);

  useEffect(() => {
    const handleSync = () => {
      // Load initial project name
      const initialName = projectNameText.toString();
      if (initialName) {
        setProjectName(initialName, false);
      }

      // Set up observer for future changes
      const projectNameTextObserver = (event: Y.YTextEvent, transaction: Y.Transaction) => {
        if (transaction.origin === doc.clientID) return;
        setProjectName(projectNameText.toString(), false);
      };

      projectNameText.observe(projectNameTextObserver);

      return () => projectNameText.unobserve(projectNameTextObserver);
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
  }, [doc, projectNameText, setProjectName, onSynced, isSynced]);
};

export const projectNameSync = (projectName: string) => {
  const projectNameText = ydoc.getText('projectName');

  ydoc.transact(() => {
    projectNameText.delete(0, projectNameText.length);
    projectNameText.insert(0, projectName);
  }, ydoc.clientID);
};