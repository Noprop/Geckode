import { authApi } from "@/lib/api/auth";
import { AwarenessError, HocuspocusProvider } from "@hocuspocus/provider";
import { useRef, createContext, useEffect } from "react";
import * as Y from 'yjs';
import { Awareness } from "y-protocols/awareness";
import { IndexeddbPersistence } from "y-indexeddb";
import { documentRegistry } from "@/lib/types/yjs/documents";

interface YjsContextType {
  getProvider: (name: string) => HocuspocusProvider;
  getDoc: (name: string) => Y.Doc;
  getAwareness: (name: string) => Awareness;
  getPersistence: (name: string) => IndexeddbPersistence;
  isSynced: (name: string) => boolean;
  onSynced: (name: string, callback: () => void) => () => void;
}

export const YjsContext = createContext<YjsContextType | null>(null);

interface InstanceData {
  doc: Y.Doc;
  provider: HocuspocusProvider;
  persistence: IndexeddbPersistence;
  synced: boolean;
}

export const YjsProvider = ({ children }: { children: React.ReactNode }) => {
  const instances = useRef<Map<string, InstanceData>>(new Map());
  const syncCallbacks = useRef<Map<string, Set<() => void>>>(new Map());
  const pendingSetups = useRef<Map<string, Promise<void>>>(new Map());

  useEffect(() => {
    return () => {
      instances.current.forEach(({ doc, provider, persistence }, name) => {
        provider.destroy();
        persistence.destroy();
        doc.destroy();
        documentRegistry.unregister(name);
      });
      instances.current.clear();
      syncCallbacks.current.clear();
      pendingSetups.current.clear();
    };
  }, []);

  const setupProvider = async (name: string): Promise<void> => {
    const existing = instances.current.get(name);
    if (existing?.provider) {
      return; // already fully set up
    }

    if (pendingSetups.current.has(name)) {
      return pendingSetups.current.get(name)!;
    }

    const setupPromise = new Promise<void>((resolve) => {
      let doc: Y.Doc;
      let persistence: IndexeddbPersistence;

      if (existing) {
        doc = existing.doc;
        persistence = existing.persistence;
      } else {
        doc = new Y.Doc();
        documentRegistry.register(name, doc);
        const persistenceKey = name.length === 0 ? 'yjs-doc-homepage' : `yjs-doc-${name}`;
        persistence = new IndexeddbPersistence(persistenceKey, doc);
        instances.current.set(name, {
          doc,
          provider: null as unknown as HocuspocusProvider,
          persistence,
          synced: false,
        });
      }

      const markDocReady = () => {
        const instance = instances.current.get(name);
        if (instance) {
          instance.synced = true;
          syncCallbacks.current.get(name)?.forEach((cb) => cb());
        }
      };

      const createProvider = () => {
        // Document is ready as soon as IndexedDB has loaded (works offline / when WebSocket fails)
        markDocReady();

        const existingInstance = instances.current.get(name);
        if (existingInstance?.provider) {
          existingInstance.provider.destroy();
        }

        const provider = new HocuspocusProvider({
          url: "ws://localhost:1234",
          name: name,
          document: doc,
          token: name.length === 0 ? () => '' : authApi.getAccessToken,
        });

        instances.current.set(name, { doc, provider, persistence, synced: true });
        pendingSetups.current.delete(name);
        resolve();
      };

      if (persistence.synced) {
        createProvider();
      } else {
        persistence.on('synced', () => createProvider());
      }
    });

    pendingSetups.current.set(name, setupPromise);
    return setupPromise;
  };

  const getDoc = (name: string) => {
    if (instances.current.has(name)) {
      return instances.current.get(name)!.doc;
    }

    const doc = new Y.Doc();
    documentRegistry.register(name, doc);
    const persistenceKey = name.length === 0 ? 'yjs-doc-homepage' : `yjs-doc-${name}`;
    const persistence = new IndexeddbPersistence(persistenceKey, doc);

    instances.current.set(name, {
      doc,
      provider: null as unknown as HocuspocusProvider,
      persistence,
      synced: false,
    });

    setupProvider(name).catch((err) => console.error(`Yjs setup for ${name}:`, err));
    return doc;
  };

  const getProvider = (name: string) => {
    const instance = instances.current.get(name);
    if (instance?.provider) {
      return instance.provider;
    }

    getDoc(name);
    const current = instances.current.get(name)!;
    if (!current.provider) {
      const tempProvider = new HocuspocusProvider({
        url: "ws://localhost:1234",
        name: name,
        document: current.doc,
        token: name.length === 0 ? () => '' : authApi.getAccessToken,
        onSynced: () => {
          const inst = instances.current.get(name);
          if (inst) {
            inst.synced = true;
            syncCallbacks.current.get(name)?.forEach((cb) => cb());
          }
        },
      });
      current.provider = tempProvider;
    }
    return current.provider;
  };

  const getAwareness = (name: string) => {
    const awareness = getProvider(name).awareness;
    if (!awareness) throw AwarenessError;
    return awareness;
  };

  const getPersistence = (name: string) => {
    return instances.current.get(name)!.persistence;
  }

  const isSynced = (name: string) => instances.current.get(name)?.synced ?? false;

  const onSynced = (name: string, callback: () => void) => {
    setupProvider(name);
    const instance = instances.current.get(name);
    if (instance?.synced) {
      callback();
      return () => {};
    }
    if (!syncCallbacks.current.has(name)) {
      syncCallbacks.current.set(name, new Set());
    }
    syncCallbacks.current.get(name)!.add(callback);
    return () => syncCallbacks.current.get(name)?.delete(callback);
  };

  return (
    <YjsContext.Provider value={{ getDoc, getProvider, getAwareness, getPersistence, isSynced, onSynced }}>
      {children}
    </YjsContext.Provider>
  );
};
