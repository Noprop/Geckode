import { authApi } from "@/lib/api/auth";
import { AwarenessError, HocuspocusProvider } from "@hocuspocus/provider";
import { useRef, createContext, useEffect, useState, useCallback } from "react";
import * as Y from 'yjs';
import { Awareness } from "y-protocols/awareness";
import { ydoc, initYDoc } from "@/lib/types/yjs/document";

interface YjsContextType {
  getProvider: (name: string) => HocuspocusProvider;
  getDoc: (name: string) => Y.Doc;
  getAwareness: (name: string) => Awareness;
  isSynced: (name: string) => boolean;
  onSynced: (name: string, callback: () => void) => () => void;
}

export const YjsContext = createContext<YjsContextType | null>(null);

export const YjsProvider = ({ children }: { children: React.ReactNode }) => {
  const instances = useRef<Map<string, { doc: Y.Doc; provider: HocuspocusProvider; synced: boolean }>>(new Map());
  const syncCallbacks = useRef<Map<string, Set<() => void>>>(new Map());

  useEffect(() => {
    return () => {
      instances.current.forEach(({ doc, provider }) => {
        provider.destroy();
        doc.destroy();
      });
      initYDoc();
      instances.current.clear();
      syncCallbacks.current.clear();
    };
  }, []);

  const setupProvider = (name: string) => {
    if (instances.current.has(name)) return;
    const provider = new HocuspocusProvider({
      url: "ws://localhost:1234",
      name: name,
      document: ydoc,
      token: name.length === 0 ? () => '' : authApi.getAccessToken,
      onSynced: () => {
        const instance = instances.current.get(name);
        if (instance) {
          instance.synced = true;
          // Call all registered callbacks
          const callbacks = syncCallbacks.current.get(name);
          if (callbacks) {
            callbacks.forEach(callback => callback());
          }
        }
      },
    });
    instances.current.set(name, { doc: provider.document, provider, synced: false });
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

  const isSynced = (name: string) => {
    return instances.current.get(name)?.synced ?? false;
  };

  const onSynced = (name: string, callback: () => void) => {
    setupProvider(name);
    const instance = instances.current.get(name);
    
    // If already synced, call immediately and don't register
    if (instance?.synced) {
      callback();
      return () => {}; // Return no-op cleanup
    }
    
    // Otherwise, register callback (will be called when sync happens)
    if (!syncCallbacks.current.has(name)) {
      syncCallbacks.current.set(name, new Set());
    }
    syncCallbacks.current.get(name)!.add(callback);
    
    // Return cleanup function
    return () => {
      syncCallbacks.current.get(name)?.delete(callback);
    };
  };

  return (
    <YjsContext.Provider value={{ getDoc, getProvider, getAwareness, isSynced, onSynced }}>
      {children}
    </YjsContext.Provider>
  );
};