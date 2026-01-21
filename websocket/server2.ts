import { Server } from '@hocuspocus/server';
import * as Blockly from 'blockly';
import { customBlocks } from './customBlocks.js';

const workspaces: Record<string, Blockly.Workspace> = {};

Blockly.defineBlocksWithJsonArray(customBlocks);

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
      //console.log('after auth', data);

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

    const blocksMap = document.getMap('blocks');

    blocksMap.observe((event) => {
      console.log('blocks', blocksMap.toJSON());
      console.log('var block', (blocksMap.get('NfP}Jcq}LwhS!Q=z63am') as any)?.fields?.VAR)
    });

    return document;
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
      console.log(`Last client disconnected from ${data.documentName}.`);
    }
  },
});

server.listen();
console.log('Hocuspocus server running at ws://localhost:1234');