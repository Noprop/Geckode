import { YjsContext } from "@/contexts/YjsContext";
import { useCallback, useContext } from "react";

export const useYjs = (documentName: string) => {
  const context = useContext(YjsContext);

  if (!context) {
    throw new Error("useYjs must be used within a YjsProvider");
  }

  const isSynced = useCallback(
    () => context.isSynced(documentName),
    [context, documentName]
  );
  const onSynced = useCallback(
    (callback: () => void) => context.onSynced(documentName, callback),
    [context, documentName]
  );
  
  return {
    doc: context.getDoc(documentName),
    provider: context.getProvider(documentName),
    awareness: context.getAwareness(documentName),
    isSynced,
    onSynced,
  };
};