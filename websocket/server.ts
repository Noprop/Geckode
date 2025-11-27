import { Document, Server } from '@hocuspocus/server';
import * as Y from 'yjs';
import * as Blockly from 'blockly';
import { customBlocks } from './customBlocks.js';

const ORIGIN_RESET_TAG = 'document-reset';
const ORIGIN_VALIDATION_TAG = 'server-validation';
const BLOCKLY_EVENTS_ARRAY_NAME = 'blockly-events';
const workspaces: Record<string, Blockly.Workspace> = {};

Blockly.defineBlocksWithJsonArray(customBlocks);

type SaveDocumentInputs = {
  document: Document,
  documentName: string;
  context: any;
}

async function saveDocument({ document, documentName, context }: SaveDocumentInputs) {
  if (!context?.token) return;

  const update = Y.encodeStateAsUpdate(document);
  const blocks = Blockly.serialization.workspaces.save(workspaces[documentName]);

  console.log('attempting to store');
  console.dir(blocks, { depth: null, colors: true });

  const res = await fetch(`http://localhost:8000/api/projects/${documentName}/websocket-save/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${context.token}`,
    },
    body: JSON.stringify({
      "blocks": blocks,
      "update": Buffer.from(update).toString('base64'),
    }),
  });

  if (!res.ok) console.error('Failed to save the workspace');

  // Reset the document (it only needs to have the blockly events from last save)
  document.transact(() => {
    Array.from(document.share.keys()).forEach(key => {
      const type = document.get(key);

      if (type instanceof Y.Text || type instanceof Y.Array) {
        type.delete(0, type.length);
      } else if (type instanceof Y.Map) {
        type.forEach((_value, key) => type.delete(key));
      }
    });
  }, ORIGIN_RESET_TAG);
}

const server = new Server({
  port: 1234,
  debounce: 3000,
  maxDebounce: 10000,

  async onAuthenticate({ token, documentName, connectionConfig }) {
    console.log('token', token);
    if (!token || !documentName) return false;

    try {
      const res = await fetch(`http://localhost:8000/api/projects/${documentName}/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Invalid token");

      const data = await res.json();
      console.log('after auth', data);

      if (data.permission === 'view') {
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

    const workspace = new Blockly.Workspace();
    workspaces[documentName] = workspace;

    const res = await fetch(`http://localhost:8000/api/projects/${documentName}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${context.token}`,
      },
    });

    if (!res.ok) throw new Error("Invalid token onLoadDocument");

    const data = await res.json();

    if (Object.keys(data?.blocks ?? {}).length) {
      Blockly.serialization.workspaces.load(data.blocks, workspace);
    }

    const blocklyEvents = document.getArray<Blockly.Events.AbstractEventJson>(BLOCKLY_EVENTS_ARRAY_NAME);

    blocklyEvents.observe((yEvent, transaction) => {
      if ([ORIGIN_RESET_TAG, ORIGIN_VALIDATION_TAG].includes(transaction.origin)) {
        return;
      }

      const deletedIndices: number[] = [];
      let currentIndex = 0;

      yEvent.delta.forEach(change => {
        if (change.insert) {
          const insert = change.insert as Blockly.Events.AbstractEventJson[];

          insert.forEach((event, contentIndex) => {
            try {
              const blocklyEvent = Blockly.Events.fromJson(event, workspace);
              blocklyEvent.run(true);
              console.log("Applied blockly event successfully!", event);
            } catch (error) {
              console.error("Error applying remote Blockly event:", error);
              deletedIndices.push(currentIndex + contentIndex);
            }
          });
          currentIndex += insert.length; 
        } else if (change.retain) {
          currentIndex += change.retain;
        }
      });

      if (deletedIndices.length) {
        document.transact(() => {
          deletedIndices.reverse().forEach(index => {
            console.log('Deleting event due to invalid event', index);
            blocklyEvents.delete(index, 1);
          });
        }, ORIGIN_VALIDATION_TAG);
      }
    });

    return document;
  },

  async onStoreDocument(data) {
    await saveDocument(data);
  },

  async afterUnloadDocument({ documentName }) {
    if (workspaces.hasOwnProperty(documentName)) {
      if (workspaces[documentName]) {
        workspaces[documentName].dispose();
      }
      delete workspaces[documentName];
    }
  },

  async onConnect(data) {
    console.log("CONNECT");
  },

  async onDisconnect({ clientsCount, ...data }) {
    console.log("DISCONNECT");

    if (clientsCount === 0) {
      console.log(`Last client disconnected from ${data.documentName}. Forcing final save...`);
      saveDocument(data);
    }
  },
});

server.listen();
console.log('Hocuspocus server running at ws://localhost:1234');