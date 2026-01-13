/**
 * A massive workspace for manual UI performance testing.
 * Contains approximately 1000 blocks across multiple event handlers.
 *
 * To use: change the import in workspaces/index.ts to export this as activeWorkspace
 */

interface BlockJSON {
  type: string;
  id: string;
  x?: number;
  y?: number;
  fields?: Record<string, string | number | boolean>;
  inputs?: Record<string, { block?: BlockJSON; shadow?: BlockJSON }>;
  next?: { block: BlockJSON };
}

let idCounter = 0;
function genId(): string {
  return `massive_${idCounter++}`;
}

function mathNum(v: number): BlockJSON {
  return { type: 'math_number', id: genId(), fields: { NUM: v } };
}

function setProp(prop: string, val: number): BlockJSON {
  return {
    type: 'setProperty',
    id: genId(),
    fields: { PROPERTY: prop },
    inputs: { VALUE: { block: mathNum(val) } },
  };
}

function changeProp(prop: string, val: number): BlockJSON {
  return {
    type: 'changeProperty',
    id: genId(),
    fields: { PROPERTY: prop },
    inputs: { VALUE: { block: mathNum(val) } },
  };
}

function keyPressed(key: string): BlockJSON {
  return { type: 'keyPressed', id: genId(), fields: { KEY: key } };
}

function ifBlock(cond: BlockJSON, doBlock: BlockJSON): BlockJSON {
  return {
    type: 'controls_if',
    id: genId(),
    inputs: { IF0: { block: cond }, DO0: { block: doBlock } },
  };
}

function chain(blocks: BlockJSON[]): BlockJSON | undefined {
  if (!blocks.length) return undefined;
  for (let i = 0; i < blocks.length - 1; i++) {
    blocks[i].next = { block: blocks[i + 1] };
  }
  return blocks[0];
}

function onStart(x: number, y: number, inner?: BlockJSON): BlockJSON {
  const b: BlockJSON = { type: 'onStart', id: genId(), x, y };
  if (inner) b.inputs = { INNER: { block: inner } };
  return b;
}

function onUpdate(x: number, y: number, inner?: BlockJSON): BlockJSON {
  const b: BlockJSON = { type: 'onUpdate', id: genId(), x, y };
  if (inner) b.inputs = { INNER: { block: inner } };
  return b;
}

// Generate the massive workspace
function generateMassiveWorkspace() {
  idCounter = 0;
  const topLevel: BlockJSON[] = [];
  const props = ['X', 'Y', 'VelocityX', 'VelocityY'];
  const keys = ['left', 'right', 'up', 'down'];
  const changeProps = ['x', 'y'];

  // Create 10 onStart blocks, each with 40 setProperty blocks (= 400 blocks + 10 onStart = ~410)
  for (let e = 0; e < 10; e++) {
    const inner: BlockJSON[] = [];
    for (let b = 0; b < 40; b++) {
      inner.push(setProp(props[b % props.length], b * 5 + e));
    }
    topLevel.push(onStart(38 + (e % 5) * 400, 38 + Math.floor(e / 5) * 600, chain(inner)));
  }

  // Create 10 onUpdate blocks, each with 20 if-statement blocks
  // Each if has condition + action = 3 blocks, so 20 ifs = 60 blocks per onUpdate
  // 10 onUpdate = 600 blocks + 10 onUpdate = ~610
  for (let e = 0; e < 10; e++) {
    const inner: BlockJSON[] = [];
    for (let b = 0; b < 20; b++) {
      const key = keys[b % keys.length];
      const prop = changeProps[b % changeProps.length];
      const val = b % 2 === 0 ? -5 : 5;
      inner.push(ifBlock(keyPressed(key), changeProp(prop, val)));
    }
    topLevel.push(onUpdate(38 + (e % 5) * 400, 700 + Math.floor(e / 5) * 600, chain(inner)));
  }

  return {
    blocks: {
      languageVersion: 0,
      blocks: topLevel,
    },
  };
}

const massiveWorkspace = generateMassiveWorkspace();

export default massiveWorkspace;
