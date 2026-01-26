import { YjsContext } from "@/contexts/YjsContext";
import { useContext } from "react";

export const useYjs = (documentName: string) => {
  const context = useContext(YjsContext);

  if (!context) {
    throw new Error("useYjs must be used within a YjsProvider");
  }
  
  return {
    doc: context.getDoc(documentName),
    provider: context.getProvider(documentName),
    awareness: context.getAwareness(documentName),
  };
};