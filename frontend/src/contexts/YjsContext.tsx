import { authApi } from "@/lib/api/auth";
import projectsApi from "@/lib/api/handlers/projects";
import { AwarenessError, HocuspocusProvider } from "@hocuspocus/provider";
import { createContext, useEffect } from "react";
import * as Y from "yjs";
import { Awareness } from "y-protocols/awareness";
import { IndexeddbPersistence } from "y-indexeddb";
import { documentRegistry } from "@/lib/types/yjs/documents";
import { ProjectCollaborator } from "@/lib/types/api/projects/collaborators";
import { ProjectOrganization } from "@/lib/types/api/projects/organizations";

const WEBSOCKET_FALLBACK_DELAY_MS = 2500;
export const PROJECT_COLLABORATOR_CHANGE_EVENT =
  "yjs:project-collaborator-change";
export const PROJECT_ORGANIZATION_CHANGE_EVENT =
  "yjs:project-organization-change";
export const PROJECT_SHARE_LINK_CHANGE_EVENT =
  "yjs:project-share-link-change";
export const PROJECT_DEFAULT_SHARE_LINK_CHANGE_EVENT =
  "yjs:project-default-share-link-change";
export const PROJECT_SAVE_STATUS_EVENT = "yjs:project-save-status";
export const PROJECT_WEBSOCKET_STATUS_EVENT = "yjs:project-websocket-status";

interface YjsContextType {
  getProvider: (name: string) => HocuspocusProvider | null;
  getDoc: (name: string) => Y.Doc;
  getAwareness: (name: string) => Awareness | null;
  getPersistence: (name: string) => IndexeddbPersistence | null;
  isSynced: (name: string) => boolean;
  onSynced: (name: string, callback: () => void) => () => void;
  enablePersistence: (name: string) => void;
  disablePersistence: (name: string) => void;
  registerShareDoc: (name: string, yjsBlobBase64: string) => void;
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
const initialPermissionReceived = new Set<string>();
let providerCount = 0;

const getPersistenceKey = (name: string) =>
  name.length === 0 ? "yjs-doc-homepage" : `yjs-doc-${name}`;

interface ProjectCollaboratorChangePayload {
  type: "project_collaborator_change";
  event: "collaborator_added" | "collaborator_permission_updated" | "collaborator_removed";
  project_id: number;
  collaborator_id: number;
  permission?: string | null;
  project_collaborator?: ProjectCollaborator | null;
}

interface ProjectOrganizationChangePayload {
  type: "project_organization_change";
  event: "organization_added" | "organization_permission_updated" | "organization_removed";
  project_id: number;
  organization_id: number;
  project_organization_id?: number;
  permission?: string | null;
  project_organization?: ProjectOrganization | null;
}

interface ProjectShareLinkChangePayload {
  type: "project_share_link_change";
  event: "share_link_created" | "share_link_updated" | "share_link_deleted";
  project_id: number;
  share_link: any;
}

interface ProjectDefaultShareLinkChangePayload {
  type: "project_default_share_link_change";
  project_id: number;
  default_share_link_id: number | null;
}

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

const reconnectProviderForDocument = (name: string): void => {
  const instance = instances.get(name);
  if (!instance?.provider) return;

  initialPermissionReceived.delete(name);
  instance.provider.destroy();
  instance.provider = null as unknown as HocuspocusProvider;
  instance.synced = false;
  pendingSetups.delete(name);
  setupProvider(name).catch((err) =>
    console.error(`Yjs reconnect for ${name}:`, err),
  );
};

const setupProvider = async (name: string): Promise<void> => {
  if (pendingSetups.has(name)) {
    return pendingSetups.get(name)!;
  }

  const setupPromise = new Promise<void>((resolve) => {
    const existing = instances.get(name);
    if (existing?.synced && !existing.provider) {
      pendingSetups.delete(name);
      resolve();
      return;
    }
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
      onStatus: (event) => {
        window.dispatchEvent(
          new CustomEvent<{
            type: "project_websocket_status";
            status: "connecting" | "connected" | "disconnected";
          }>(PROJECT_WEBSOCKET_STATUS_EVENT, {
            detail: {
              type: "project_websocket_status",
              status: event.status,
            },
          }),
        );
      },
      onStateless: (event) => {
        let payload: any;

        try {
          payload = JSON.parse(event.payload);
        } catch (err) {
          console.error("Failed to parse stateless websocket payload:", err);
          return;
        }

        // Update the user's project permission; reconnect only when it actually changed
        if (payload.type === "project_permission") {
          void import("@/stores/geckodeStore").then(({ useGeckodeStore }) => {
            if (!payload.permission) window.location.href = "/projects";

            const isFirstMessage = !initialPermissionReceived.has(name);
            initialPermissionReceived.add(name);

            const storeState = useGeckodeStore.getState();
            storeState.setProjectPermission(payload.permission);

            if (!isFirstMessage) {
              setTimeout(() => reconnectProviderForDocument(name), 0);
            }
          });
        } else if (payload.type === "project_collaborator_change") {
          window.dispatchEvent(
            new CustomEvent<ProjectCollaboratorChangePayload>(
              PROJECT_COLLABORATOR_CHANGE_EVENT,
              { detail: payload as ProjectCollaboratorChangePayload },
            ),
          );
        } else if (payload.type === "project_organization_change") {
          window.dispatchEvent(
            new CustomEvent<ProjectOrganizationChangePayload>(
              PROJECT_ORGANIZATION_CHANGE_EVENT,
              { detail: payload as ProjectOrganizationChangePayload },
            ),
          );
        } else if (payload.type === "project_share_link_change") {
          window.dispatchEvent(
            new CustomEvent<ProjectShareLinkChangePayload>(
              PROJECT_SHARE_LINK_CHANGE_EVENT,
              { detail: payload as ProjectShareLinkChangePayload },
            ),
          );
        } else if (payload.type === "project_default_share_link_change") {
          window.dispatchEvent(
            new CustomEvent<ProjectDefaultShareLinkChangePayload>(
              PROJECT_DEFAULT_SHARE_LINK_CHANGE_EVENT,
              { detail: payload as ProjectDefaultShareLinkChangePayload },
            ),
          );
        } else if (payload.type === "project_save_status") {
          window.dispatchEvent(
            new CustomEvent<{
              type: "project_save_status";
              status: "saving" | "saved";
            }>(PROJECT_SAVE_STATUS_EVENT, {
              detail: payload as {
                type: "project_save_status";
                status: "saving" | "saved";
              },
            }),
          );
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
  const instance = instances.get(name);
  // Share docs are pre-registered with synced=true and no provider; skip setup
  if (instance?.synced && !instance.provider) {
    return instance.doc;
  }

  const inst = ensureInstance(name);
  setupProvider(name).catch((err) =>
    console.error(`Yjs setup for ${name}:`, err),
  );
  return inst.doc;
};

/**
 * Register a Y.Doc with state from a base64-encoded Yjs update (e.g. share link).
 * No WebSocket provider; doc is marked synced immediately so onSynced callbacks run.
 */
const registerShareDocInternal = (name: string, yjsBlobBase64: string): void => {
  if (instances.has(name)) {
    console.warn(`Yjs: doc "${name}" already registered, skipping registerShareDoc`);
    return;
  }
  const doc = new Y.Doc();
  const update = Uint8Array.from(atob(yjsBlobBase64), (c) => c.charCodeAt(0));
  Y.applyUpdate(doc, update);
  documentRegistry.register(name, doc);
  instances.set(name, {
    doc,
    provider: null as unknown as HocuspocusProvider,
    persistence: null,
    synced: true,
  });
  syncCallbacks.get(name)?.forEach((cb) => cb());
};

const getProviderInternal = (name: string): HocuspocusProvider | null => {
  const instance = instances.get(name);
  // Share docs have no WebSocket provider; return null so callers can skip provider/awareness logic.
  if (instance?.synced && !instance.provider) {
    return null;
  }

  ensureInstance(name);
  setupProvider(name).catch((err) =>
    console.error(`Yjs provider setup for ${name}:`, err),
  );

  const current = instances.get(name);
  if (!current?.provider) {
    throw new Error(`Yjs provider for "${name}" is not ready yet`);
  }

  return current.provider;
};

const getAwarenessInternal = (name: string): Awareness | null => {
  const provider = getProviderInternal(name);
  if (!provider) return null;
  const awareness = provider.awareness;
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
          provider?.destroy();
          persistence?.destroy();
          doc?.destroy();
          documentRegistry.unregister(name);
        });
        instances.clear();
        syncCallbacks.clear();
        pendingSetups.clear();
        initialPermissionReceived.clear();
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
        registerShareDoc: registerShareDocInternal,
      }}
    >
      {children}
    </YjsContext.Provider>
  );
};

