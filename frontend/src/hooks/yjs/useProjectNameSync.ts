import { useGeckodeStore } from "@/stores/geckodeStore";
import { useYjs } from "./useYjs";
import { useEffect } from "react";
import * as Y from "yjs";
import { ydoc } from "@/lib/types/yjs/document";

export const useProjectNameSync = (documentName: string) => {
  const { doc } = useYjs(documentName);
  const projectNameText = doc.getText('projectName');
  const setProjectName = useGeckodeStore((s) => s.setProjectName);

  useEffect(() => {
    const projectNameTextObserver = (event: Y.YTextEvent, transaction: Y.Transaction) => {
      if (transaction.origin === doc.clientID) return;
      setProjectName(projectNameText.toString(), false);
    };

    projectNameText.observe(projectNameTextObserver);

    return () => projectNameText.unobserve(projectNameTextObserver);
  }, []);
};

export const projectNameSync = (projectName: string) => {
  const projectNameText = ydoc.getText('projectName');

  ydoc.transact(() => {
    projectNameText.delete(0, projectNameText.length);
    projectNameText.insert(0, projectName);
  }, ydoc.clientID);
};