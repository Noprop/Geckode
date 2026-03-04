import { Server } from "@hocuspocus/server";
import Redis from "ioredis";
import * as Y from "yjs";

const redis = new Redis();
const redisSubscriber = new Redis();

const projectMetaMapKey = "meta";
const updatedProjectNames: Record<string, string> = {};

const server = new Server({
  port: 1234,
  debounce: 3000,
  maxDebounce: 10000,

  async onAuthenticate({ token, documentName, connectionConfig }) {
    console.log('token', token);
    if (!token || !documentName) return false;

    // This is temporary for development on the main page
    if (documentName.length === 0) return true;

    try {
      const res = await fetch(`http://localhost:8000/api/projects/${documentName}/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Invalid token");

      const data = await res.json();

      if (data.permission === "view") {
        connectionConfig.readOnly = true;
      }

      return {
        token,
        permission: data.permission,
        sentPermission: false,
      };
    } catch (err) {
      console.log("Authentication failed:", err);
      return false;
    }
  },

  async connected({ connection, context, documentName }) {
    const tokenRefreshInterval = setInterval(() => {
      console.log(`Requesting token sync for client ${connection.document.clientID}`);
      connection.requestToken();
    }, 4 * 60 * 1000);

    connection.onClose(() => {
      clearInterval(tokenRefreshInterval);
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

  async onDisconnect({ clientsCount, ...data }) {
    console.log("DISCONNECT");

    if (clientsCount === 0) {
      console.log(`Last client disconnected from ${data.documentName}.`);
    }
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

  (async () => {
    try {
      if (channel === PROJECT_UPDATE_CHANNEL) {
        const { id: documentName, name, yjs_blob } = payload as {
          id: string;
          name?: string | null;
          yjs_blob?: string | null;
        };

        console.log(
          `[Hocuspocus][Redis] Opening direct connection for document ${documentName}...`,
        );

        const docConnection = await hocuspocus.openDirectConnection(documentName);

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

        await docConnection.disconnect();

        console.log(
          `[Hocuspocus][Redis] Applied external project update for document ${documentName}.`,
        );
      } else if (channel === PROJECT_COLLABORATOR_UPDATE_CHANNEL) {
        const { project_id, collaborator_id, permission } = payload as {
          project_id: string;
          collaborator_id: string;
          permission: string;
        };

        console.log(
          `[Hocuspocus][Redis] Broadcasting collaborator permission update for project ${project_id} to connected clients...`,
        );

        const docConnection = await hocuspocus.openDirectConnection(project_id);

        // Broadcast to all clients in this project document
        docConnection.document.broadcastStateless(
          JSON.stringify({
            type: "project_collaborator_permission",
            collaboratorId: collaborator_id,
            permission,
          }),
        );

        await docConnection.disconnect();
      }
    } catch (innerErr) {
      console.error(
        `[Hocuspocus][Redis] Error while applying Redis update:`,
        innerErr,
      );
    }
  })();
});