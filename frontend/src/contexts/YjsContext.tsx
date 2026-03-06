import { authApi } from "@/lib/api/auth";
import projectsApi from "@/lib/api/handlers/projects";
import { AwarenessError, HocuspocusProvider } from "@hocuspocus/provider";
import { createContext, useEffect } from "react";
import * as Y from "yjs";
import { Awareness } from "y-protocols/awareness";
import { IndexeddbPersistence } from "y-indexeddb";
import { documentRegistry } from "@/lib/types/yjs/documents";

const WEBSOCKET_FALLBACK_DELAY_MS = 2500;

interface YjsContextType {
  getProvider: (name: string) => HocuspocusProvider;
  getDoc: (name: string) => Y.Doc;
  getAwareness: (name: string) => Awareness;
  getPersistence: (name: string) => IndexeddbPersistence | null;
  isSynced: (name: string) => boolean;
  onSynced: (name: string, callback: () => void) => () => void;
  enablePersistence: (name: string) => void;
  disablePersistence: (name: string) => void;
}

export const YjsContext = createContext<YjsContextType | null>(null);

interface InstanceData {
  doc: Y.Doc;
  provider: HocuspocusProvider;
  persistence: IndexeddbPersistence | null;
  synced: boolean;
}

const instances = new Map<string, InstanceData>();
const syncCallbacks = new Map<string, Set<() => void>>();
const pendingSetups = new Map<string, Promise<void>>();
let providerCount = 0;

const getPersistenceKey = (name: string) =>
  name.length === 0 ? "yjs-doc-homepage" : `yjs-doc-${name}`;

const ensureInstance = (name: string): InstanceData => {
  let instance = instances.get(name);
  if (instance) {
    return instance;
  }

  const doc = new Y.Doc();
  documentRegistry.register(name, doc);

  instance = {
    doc,
    provider: null as unknown as HocuspocusProvider,
    persistence: null,
    synced: false,
  };
  instances.set(name, instance);

  if (
    typeof indexedDB !== "undefined" &&
    typeof indexedDB.databases === "function"
  ) {
    const persistenceKey = getPersistenceKey(name);
    indexedDB
      .databases()
      .then((dbs) => {
        const current = instances.get(name);
        if (!current || current.persistence) return;
        if (dbs.some((db) => db.name === persistenceKey)) {
          current.persistence = new IndexeddbPersistence(persistenceKey, doc);
        }
      });
  }

  return instance;
};

const setupProvider = async (name: string): Promise<void> => {
  if (pendingSetups.has(name)) {
    return pendingSetups.get(name)!;
  }

  const setupPromise = new Promise<void>((resolve) => {
    const instance = ensureInstance(name);
    const { doc } = instance;
    const persistence = instance.persistence;

    // If a provider already exists for this doc, just ensure we hook up
    // the sync logic and return.
    if (instance.provider) {
      const existingInstance = instances.get(name);
      if (existingInstance && existingInstance !== instance) {
        existingInstance.provider.destroy();
      }

      const current = instances.get(name);
      if (current) {
        instances.set(name, {
          doc,
          provider: instance.provider,
          persistence: current.persistence,
          synced: current.synced,
        });
      }

      pendingSetups.delete(name);
      resolve();
      return;
    }

    const markDocReady = () => {
      const current = instances.get(name);
      if (current) {
        current.synced = true;
        syncCallbacks.get(name)?.forEach((cb) => cb());
      }
    };

    const provider = new HocuspocusProvider({
      url: "ws://localhost:1234",
      name,
      document: doc,
      token: name.length === 0 ? () => "" : authApi.getAccessToken,
      onStateless: (event) => {
        const payload = JSON.parse(event.payload);

        // Update the user's project permission from the websocket server
        if (payload.type === "project_permission") {
          void import("@/stores/geckodeStore").then(({ useGeckodeStore }) => {
            if (!payload.permission) window.location.href = "/projects";
            useGeckodeStore.getState().setProjectPermission(payload.permission)
          });
        }
      },
    });

    const current = instances.get(name);
    instances.set(name, {
      doc,
      provider,
      persistence: current?.persistence ?? null,
      synced: current?.synced ?? false,
    });

    if (!persistence || persistence.synced) {
      markDocReady();
    } else {
      persistence.on("synced", () => markDocReady());
    }

    // When document name is a project ID, fall back to Django if websocket never connects
    if (name.length > 0) {
      let fallbackTimeoutId: NodeJS.Timeout | null = null;
      let fallbackApplied = false;

      const clearFallback = () => {
        if (fallbackTimeoutId !== null) {
          clearTimeout(fallbackTimeoutId);
          fallbackTimeoutId = null;
        }
      };

      const applyBackendFallback = async () => {
        if (fallbackApplied) return;
        fallbackApplied = true;
        clearFallback();
        try {
          const project = await projectsApi(name).get();
          if (project?.yjs_blob) {
            const update = new Uint8Array(
              typeof Buffer !== "undefined"
                ? Buffer.from(project.yjs_blob, "base64")
                : Uint8Array.from(atob(project.yjs_blob), (c) => c.charCodeAt(0))
            );
            Y.applyUpdate(doc, update);
          }
          if (project?.name) {
            const projectMetaMap = doc.getMap<any>("meta");
            projectMetaMap.set("name", project.name);
          }
          if (project?.permission) {
            void import("@/stores/geckodeStore").then(({ useGeckodeStore }) =>
              useGeckodeStore.getState().setProjectPermission(project.permission)
            );
          }
          const inst = instances.get(name);
          if (inst && !inst.synced) markDocReady();
        } catch (err) {
          console.error(`Yjs Django fallback for project ${name}:`, err);
        }
      };

      // Clear fallback when websocket syncs so we don't fetch from Django
      provider.on("synced", () => clearFallback());

      fallbackTimeoutId = setTimeout(applyBackendFallback, WEBSOCKET_FALLBACK_DELAY_MS);
    } else {
      void import("@/stores/geckodeStore").then(({ useGeckodeStore }) =>
        useGeckodeStore.getState().setProjectPermission("code")
      );
    }

    pendingSetups.delete(name);
    resolve();
  });

  pendingSetups.set(name, setupPromise);
  return setupPromise;
};

const getDocInternal = (name: string) => {
  const instance = ensureInstance(name);

  // Fire and forget provider setup
  setupProvider(name).catch((err) =>
    console.error(`Yjs setup for ${name}:`, err),
  );

  return instance.doc;
};

const getProviderInternal = (name: string) => {
  // Ensure the instance exists and the shared setup path runs.
  ensureInstance(name);
  setupProvider(name).catch((err) =>
    console.error(`Yjs provider setup for ${name}:`, err),
  );

  const instance = instances.get(name);
  if (!instance?.provider) {
    throw new Error(`Yjs provider for "${name}" is not ready yet`);
  }

  return instance.provider;
};

const getAwarenessInternal = (name: string) => {
  const awareness = getProviderInternal(name).awareness;
  if (!awareness) throw AwarenessError;
  return awareness;
};

const getPersistenceInternal = (name: string) =>
  instances.get(name)?.persistence ?? null;

const isSyncedInternal = (name: string) =>
  instances.get(name)?.synced ?? false;

const onSyncedInternal = (name: string, callback: () => void) => {
  setupProvider(name);
  const instance = instances.get(name);
  if (instance?.synced) {
    callback();
    return () => {};
  }
  if (!syncCallbacks.has(name)) {
    syncCallbacks.set(name, new Set());
  }
  syncCallbacks.get(name)!.add(callback);
  return () => syncCallbacks.get(name)?.delete(callback);
};

const enablePersistenceInternal = (name: string) => {
  let instance = instances.get(name);
  if (!instance) {
    const doc = getDocInternal(name);
    instance = instances.get(name)!;
    instance.doc = doc;
  }

  if (instance.persistence) {
    return;
  }

  const persistenceKey = getPersistenceKey(name);
  instance.persistence = new IndexeddbPersistence(persistenceKey, instance.doc);
};

const disablePersistenceInternal = (name: string) => {
  const instance = instances.get(name);
  if (!instance || !instance.persistence) {
    return;
  }

  const persistenceKey = getPersistenceKey(name);

  try {
    instance.persistence.clearData();
  } catch {}

  instance.persistence.destroy();
  instance.persistence = null;

  try {
    indexedDB.deleteDatabase(persistenceKey);
  } catch {}
};

/** Exported for use by editorSlice - enables calling persistence without React context */
export const enablePersistence = enablePersistenceInternal;
export const disablePersistence = disablePersistenceInternal;
export const getPersistence = getPersistenceInternal;

export const YjsProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    providerCount += 1;
    return () => {
      providerCount -= 1;
      if (providerCount === 0) {
        instances.forEach(({ doc, provider, persistence }, name) => {
          provider.destroy();
          persistence?.destroy();
          doc.destroy();
          documentRegistry.unregister(name);
        });
        instances.clear();
        syncCallbacks.clear();
        pendingSetups.clear();
      }
    };
  }, []);

  return (
    <YjsContext.Provider
      value={{
        getDoc: getDocInternal,
        getProvider: getProviderInternal,
        getAwareness: getAwarenessInternal,
        getPersistence: getPersistenceInternal,
        isSynced: isSyncedInternal,
        onSynced: onSyncedInternal,
        enablePersistence: enablePersistenceInternal,
        disablePersistence: disablePersistenceInternal,
      }}
    >
      {children}
    </YjsContext.Provider>
  );
};

