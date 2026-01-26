import * as Y from 'yjs';

export let ydoc = new Y.Doc();

export const initYDoc = () => {
  ydoc?.destroy();
  ydoc = new Y.Doc();
}