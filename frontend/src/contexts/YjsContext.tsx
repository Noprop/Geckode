import { authApi } from "@/lib/api/auth";
import { AwarenessError, HocuspocusProvider } from "@hocuspocus/provider";
import { useRef, createContext, useEffect } from "react";
import * as Y from 'yjs';
import { Awareness } from "y-protocols/awareness";

interface YjsContextType {
  getProvider: (name: string) => HocuspocusProvider;
  getDoc: (name: string) => Y.Doc;
  getAwareness: (name: string) => Awareness;
}

export const YjsContext = createContext<YjsContextType | null>(null);

export const YjsProvider = ({ children }: { children: React.ReactNode }) => {
  const instances = useRef<Map<string, { doc: Y.Doc; provider: HocuspocusProvider }>>(new Map());

  useEffect(() => {
    return () => {
      instances.current.forEach(({ doc, provider }) => {
        provider.destroy();
        doc.destroy();
      });
      instances.current.clear();
    };
  }, []);

  const setupProvider = (name: string) => {
    if (instances.current.has(name)) return;
    const provider = new HocuspocusProvider({
      url: "ws://localhost:1234",
      name: name,
      token: authApi.getAccessToken,
    });
    instances.current.set(name, { doc: provider.document, provider });
  };

  const getDoc = (name: string) => {
    setupProvider(name);
    return instances.current.get(name)!.doc;
  };

  const getProvider = (name: string) => {
    setupProvider(name);
    return instances.current.get(name)!.provider;
  };

  const getAwareness = (name: string) => {
    const awareness = getProvider(name).awareness;
    if (!awareness) throw AwarenessError;
    return awareness;
  };

  return (
    <YjsContext.Provider value={{ getDoc, getProvider, getAwareness }}>
      {children}
    </YjsContext.Provider>
  );
};