import { Server } from "@hocuspocus/server";
import Redis from "ioredis";
import * as Y from "yjs";

const redis = new Redis();

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
      };
    } catch (err) {
      console.log("Authentication failed:", err);
      return false;
    }
  },

  async connected({ connection }) {
    const tokenRefreshInterval = setInterval(() => {
      console.log(`Requesting token sync for client ${connection.document.clientID}`);
      connection.requestToken();
    }, 4 * 60 * 1000);

    connection.onClose(() => {
      clearInterval(tokenRefreshInterval);
    });
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
      bufferObject['name'] = updatedProjectNames[documentName];
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