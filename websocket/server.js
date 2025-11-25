import { Server } from '@hocuspocus/server';
import { Client } from 'pg';
import * as Y from 'yjs';

const pgClient = new Client({
  host: 'localhost',
  port: 5432,
  user: 'node',
  password: 'testing',
  database: 'geckode',
});

await pgClient.connect();
console.log('Connected to Postgres');

const server = new Server({
  port: 1234,

  // async onAuthenticate({ token, documentName, context }) {
  //   console.log('token', token);
  //   if (!token || !documentName) return;

  //   try {
  //     const res = await fetch(`http://localhost:8000/api/projects/${documentName}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!res.ok) throw new Error("Invalid token");

  //     const data = await res.json();
  //     console.log('after auth', data);
  //     context.permission = data.permission;

  //     return true;
  //   } catch (err) {
  //     console.log("Authentication failed:", err);
  //     return false;
  //   }
  // },

  // async beforeHandleMessage({ document, update, context }) {
  //   const tempDoc = new Y.Doc();
  //   Y.applyUpdate(tempDoc, Y.encodeStateAsUpdate(document));

  //   try {
  //     Y.applyUpdate(tempDoc, update);
  //   } catch (error) {
  //     //console.log(context);
  //     //throw new Error('Malformed Yjs update received.');
  //   }

  //   const eventsArray = document.getArray('blockly-events');
  //   const tempEventsArray = tempDoc.getArray('blockly-events');

  //   if (eventsArray.length > tempEventsArray.length) {
  //     throw new Error('Blockly events cannot be deleted.');
  //   }

  //   for (let i = eventsArray.length; i < tempEventsArray.length; i++) {
  //     console.log(tempEventsArray[i]);
  //     // TODO: Push these events to blockly
  //   }
  // },

  // async onLoadDocument({ document, documentName, context }) {
  //   console.log("LOAD", {
  //     source: context?.source || "unknown",
  //   });

  //   if (documentName === 'undefined' || !documentName || documentName.trim() === '') {
  //     console.error('Attempted connection with an empty room ID.');
  //     return document;
  //   }

  //   console.log('documentName', documentName);

  //   const res = await pgClient.query(
  //     'SELECT blocks_binary FROM projects_project WHERE id = $1 LIMIT 1',
  //     [documentName]
  //   );

  //   if (res.rows.length > 0) {
  //     let updateData = res.rows[0].blocks_binary;

  //     if (updateData instanceof Buffer) {
  //       updateData = new Uint8Array(updateData);
  //     }

  //     if (updateData.length > 0) {
  //       Y.applyUpdate(document, updateData);
  //     }
  //   }

  //   return document;
  // },

  // // --- B. Store Document Hook (WRITE to DB) ---
  // async onStoreDocument({ documentName, document }) {
  //   const update = Y.encodeStateAsUpdate(document);

  //   //console.log(document.getArray('blockly-events').toJSON());

  //   // await pgClient.query(
  //   //   `
  //   //   INSERT INTO projects_project (id, blocks_binary)
  //   //   VALUES ($1, $2)
  //   //   ON CONFLICT (id) DO UPDATE
  //   //   SET blocks_binary = EXCLUDED.blocks_binary;
  //   //   `,
  //   //   [documentName, update]
  //   // );
  // },

  // async onChange({ document, documentName }) {
  //   //console.log(document.getArray('blockly-events').toJSON())

  //   const blocklyEvents = document.getArray('blockly-events').toJSON();
  // },

  // async onConnect(data) {
  //   console.log("CONNECT");
  // },

  // async onDisconnect() {
  //   console.log("DISCONNECT");
  // },
});

server.listen();
console.log('Hocuspocus server running at ws://localhost:1234');