import { Server } from "@hocuspocus/server";
import Redis from "ioredis";
import * as Y from "yjs";

const redis = new Redis();
const redisSubscriber = new Redis();

const projectMetaMapKey = "meta";
const updatedProjectNames: Record<string, string> = {};

const CLIENT_MAP_PREFIX = "yjs:clients";

const getClientMapKey = (documentName: string) => `${CLIENT_MAP_PREFIX}:${documentName}`;

const resetClientMaps = async () => {
  try {
    const keys = await redis.keys(`${CLIENT_MAP_PREFIX}:*`);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
    console.log("[Hocuspocus][Clients] Reset client maps on startup.");
  } catch (err) {
    console.error("[Hocuspocus][Clients] Failed to reset client maps on startup:", err);
  }
};

const addClientToDocument = async ({
  documentName,
  userId,
  clientId,
}: {
  documentName: string;
  userId: string | number;
  clientId: string | number;
}) => {
  if (!documentName || !userId || clientId === undefined || clientId === null) return;

  const key = getClientMapKey(documentName);
  const field = String(userId);
  const existing = await redis.hget(key, field);

  let clients: string[] = [];
  if (existing) {
    try {
      clients = JSON.parse(existing);
    } catch {
      clients = [];
    }
  }

  const clientIdStr = String(clientId);
  if (!clients.includes(clientIdStr)) {
    clients.push(clientIdStr);
    await redis.hset(key, { [field]: JSON.stringify(clients) });
  }
};

const removeClientFromDocument = async ({
  documentName,
  userId,
  clientId,
}: {
  documentName: string;
  userId: string | number;
  clientId: string | number;
}) => {
  if (!documentName || !userId || clientId === undefined || clientId === null) return;

  const key = getClientMapKey(documentName);
  const field = String(userId);
  const existing = await redis.hget(key, field);

  if (!existing) {
    return;
  }

  let clients: string[] = [];
  try {
    clients = JSON.parse(existing);
  } catch {
    clients = [];
  }

  const clientIdStr = String(clientId);
  const nextClients = clients.filter((id) => id !== clientIdStr);

  if (nextClients.length === 0) {
    await redis.hdel(key, field);
  } else {
    await redis.hset(key, { [field]: JSON.stringify(nextClients) });
  }
};

const clearDocumentClients = async (documentName: string) => {
  if (!documentName) return;
  const key = getClientMapKey(documentName);
  await redis.del(key);
};

/** Returns true if the document has at least one connected client (in Redis). */
const documentHasConnectedClients = async (documentName: string): Promise<boolean> => {
  if (!documentName) return false;
  const key = getClientMapKey(documentName);
  const count = await redis.hlen(key);
  return count > 0;
};

// Clear any stale client maps when the server starts.
resetClientMaps();

const server = new Server({
  port: 1234,
  debounce: 3000,
  maxDebounce: 10000,

  async onAuthenticate({ token, documentName, connectionConfig }) {
    console.log('token', token);
    if (!token || !documentName) return false;

    // This is temporary for development on the main page
    if (documentName.length === 0) return true;

    const res = await fetch(`http://localhost:8000/api/projects/${documentName}/check-user-permission/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Throwing an error refuses the connection
    if (!res.ok) throw new Error("Invalid token");

    const data = await res.json();

    if (data.permission === "view") {
      connectionConfig.readOnly = true;
    }

    return {
      token,
      userId: data.user_id,
      permission: data.permission,
      sentPermission: false,
    };
  },

  async connected({ connection, context, documentName }) {
    const tokenRefreshInterval = setInterval(() => {
      console.log(`Requesting token sync for client ${connection.document.clientID}`);
      connection.requestToken();
    }, 4 * 60 * 1000);

    const userId = context?.userId;
    const clientId = connection.document.clientID;

    if (documentName && userId) {
      addClientToDocument({
        documentName,
        userId,
        clientId,
      }).catch((err) => {
        console.error("[Hocuspocus][Clients] Failed to add client to document:", err);
      });
    }

    connection.onClose(() => {
      clearInterval(tokenRefreshInterval);

      if (documentName && userId) {
        removeClientFromDocument({
          documentName,
          userId,
          clientId,
        }).catch((err) => {
          console.error("[Hocuspocus][Clients] Failed to remove client from document:", err);
        });
      }
    });

    if (documentName.length > 0 && !context?.sentPermission) {
      context.sentPermission = true;
      connection.sendStateless(
        JSON.stringify({
          type: "project_permission",
          permission: context.permission,
        }),
      );
    }
  },

  async onLoadDocument({ document, documentName, context }) {
    console.log("LOAD", {
      source: context?.source || "unknown",
    });

    if (documentName === 'undefined' || !documentName || documentName.trim() === '') {
      console.error('Attempted connection with an empty room ID.');
      return document;
    }

    console.log('documentName', documentName);

    const res = await fetch(`http://localhost:8000/api/projects/${documentName}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${context.token}`,
      },
    });

    if (!res.ok) throw new Error("Invalid token");

    const data = await res.json();

    if (data.yjs_blob) {
      console.log("applying yjs blob update on initial document load");
      Y.applyUpdate(document, Buffer.from(data.yjs_blob, 'base64'));
    }

    const projectMetaMap = document.getMap<any>(projectMetaMapKey);
    projectMetaMap.set("name", data.name ?? '');

    projectMetaMap.observe((event: Y.YMapEvent<any>) => {
      event.changes.keys.forEach((change, key) => {
        if (key === "name" && change.action === "update") {
          updatedProjectNames[documentName] = projectMetaMap.get(key);
        }
      });
    });

    return document;
  },

  async onStoreDocument({ document, documentName }) {
    console.log("storing document", documentName);
    if (!documentName.length) return;

    let bufferObject = {
      blob: Buffer.from(Y.encodeStateAsUpdate(document)),
    };

    if (documentName in updatedProjectNames) {
      bufferObject["name"] = updatedProjectNames[documentName];
      delete updatedProjectNames[documentName];
    }

    await redis.hset(`yjs:buffer:${documentName}`, bufferObject);
    await redis.lpush('yjs:updates_queue', documentName);
    console.log('stored document', documentName);
  },

  async onConnect(data) {
    console.log("CONNECT");
  },

  async onDisconnect({ clientsCount, documentName }) {
    console.log("DISCONNECT");

    if (clientsCount === 0) {
      console.log(`Last client disconnected from ${documentName}.`);
    }
  },

  async afterUnloadDocument({ documentName }) {
    clearDocumentClients(documentName);
  },
});

server.listen();
console.log('Hocuspocus server running at ws://localhost:1234');

// Listen for project updates coming from Django via Redis pub/sub
const PROJECT_UPDATE_CHANNEL = "yjs:project_updates";
const PROJECT_COLLABORATOR_UPDATE_CHANNEL = "yjs:project_collaborator_updates";
const PROJECT_UPDATE_CHANNELS = [PROJECT_UPDATE_CHANNEL, PROJECT_COLLABORATOR_UPDATE_CHANNEL];

redisSubscriber.subscribe(...PROJECT_UPDATE_CHANNELS, (err, count) => {
  if (err) {
    console.error("Failed to subscribe to project update channels:", err);
    return;
  }
});

redisSubscriber.on("message", (channel, message) => {
  console.log("[Hocuspocus][Redis] Message received:", { channel, message });

  if (!PROJECT_UPDATE_CHANNELS.includes(channel)) {
    return;
  }

  // Use a direct connection so we can always access the Y.Doc,
  // even if there is no currently active WebSocket connection.
  const hocuspocus = server.hocuspocus;

  if (!hocuspocus || !hocuspocus.openDirectConnection) {
    console.log(
      "[Hocuspocus][Redis] hocuspocus instance or openDirectConnection not available, skipping.",
    );
    return;
  }

  const payload = JSON.parse(message) as any;
  const { project_id: projectId } = payload as {
    project_id: number;
  };
  const documentName = String(projectId);

  (async () => {
    try {
      const hasClients = await documentHasConnectedClients(documentName);
      if (!hasClients) {
        console.log(
          `[Hocuspocus][Redis] Skipping update for document ${documentName} (no connected clients).`,
        );
        return;
      }

      const docConnection = await hocuspocus.openDirectConnection(documentName);

      if (channel === PROJECT_UPDATE_CHANNEL) {
        const { name, yjs_blob } = payload as {
          name?: string | null;
          yjs_blob?: string | null;
        };

        console.log(
          `[Hocuspocus][Redis] Opening direct connection for document ${documentName}...`,
        );

        await docConnection.transact((ydoc: Y.Doc) => {
          // Merge incoming Yjs state if provided
          if (yjs_blob) {
            try {
              const updateBuffer = Buffer.from(yjs_blob, "base64");
              console.log(
                `[Hocuspocus][Redis] Applying Yjs blob update for document ${documentName} (size: ${updateBuffer.length} bytes).`,
              );
              Y.applyUpdate(ydoc, updateBuffer);
            } catch (decodeErr) {
              console.error(
                `[Hocuspocus][Redis] Failed to decode/apply yjs_blob for document ${documentName}:`,
                decodeErr,
              );
            }
          }

          // Update project meta name if provided
          if (typeof name === "string") {
            const projectMetaMap = ydoc.getMap<any>(projectMetaMapKey);
            projectMetaMap.set("name", name);
          }
        });

        console.log(
          `[Hocuspocus][Redis] Applied external project update for document ${documentName}.`,
        );
      } else if (channel === PROJECT_COLLABORATOR_UPDATE_CHANNEL) {
        const {
          project_id,
          collaborators,
          event,
          collaborator_id,
          organization_id,
          project_organization_id,
          permission,
          project_collaborator,
          project_organization,
        } = payload as {
          project_id: number;
          collaborators: Record<number, string | null>;
          event?: string;
          collaborator_id?: number;
          organization_id?: number;
          project_organization_id?: number;
          permission?: string | null;
          project_collaborator?: Record<string, any> | null;
          project_organization?: Record<string, any> | null;
        };

        console.log(
          `[Hocuspocus][Redis] Broadcasting collaborator permission update for project ${project_id} to connected clients...`,
        );

        docConnection.document.getConnections().forEach(connection => {
          const userId = connection.context?.userId;

          if (userId in collaborators) {
            connection.readOnly = collaborators[userId] === "view";
            connection.sendStateless(
              JSON.stringify({
                type: "project_permission",
                permission: collaborators[userId],
              }),
            );
          }

          if (
            event &&
            collaborator_id !== undefined &&
            collaborator_id !== null &&
            event.startsWith("collaborator_")
          ) {
            connection.sendStateless(
              JSON.stringify({
                type: "project_collaborator_change",
                event,
                project_id,
                collaborator_id,
                permission: permission ?? null,
                project_collaborator: project_collaborator ?? null,
              }),
            );
          } else if (
            event &&
            organization_id !== undefined &&
            organization_id !== null &&
            event.startsWith("organization_")
          ) {
            connection.sendStateless(
              JSON.stringify({
                type: "project_organization_change",
                event,
                project_id,
                organization_id,
                project_organization_id,
                permission: permission ?? null,
                project_organization: project_organization ?? null,
              }),
            );
          }
        });
      }

      await docConnection.disconnect();
    } catch (innerErr) {
      console.error(
        `[Hocuspocus][Redis] Error while applying Redis update:`,
        innerErr,
      );
    }
  })();
});