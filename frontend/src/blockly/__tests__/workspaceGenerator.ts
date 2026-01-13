/**
 * Utility functions to programmatically generate Blockly workspace JSON
 * for performance testing.
 */

export interface BlockJSON {
  type: string;
  id: string;
  x?: number;
  y?: number;
  fields?: Record<string, string | number | boolean>;
  inputs?: Record<string, { block?: BlockJSON; shadow?: BlockJSON }>;
  next?: { block: BlockJSON };
}

export interface WorkspaceState {
  blocks: {
    languageVersion: number;
    blocks: BlockJSON[];
  };
}

let idCounter = 0;

function generateId(): string {
  return `perf_test_${idCounter++}`;
}

export function resetIdCounter(): void {
  idCounter = 0;
}

function createMathNumberBlock(value: number): BlockJSON {
  return {
    type: 'math_number',
    id: generateId(),
    fields: { NUM: value },
  };
}

function createSetPropertyBlock(
  property: 'X' | 'Y' | 'VelocityX' | 'VelocityY',
  value: number
): BlockJSON {
  return {
    type: 'setProperty',
    id: generateId(),
    fields: { PROPERTY: property },
    inputs: {
      VALUE: { block: createMathNumberBlock(value) },
    },
  };
}

function createChangePropertyBlock(
  property: 'x' | 'y' | 'velocity.x' | 'velocity.y',
  value: number
): BlockJSON {
  return {
    type: 'changeProperty',
    id: generateId(),
    fields: { PROPERTY: property },
    inputs: {
      VALUE: { block: createMathNumberBlock(value) },
    },
  };
}

function createKeyPressedBlock(key: 'left' | 'right' | 'up' | 'down' | 'space'): BlockJSON {
  return {
    type: 'keyPressed',
    id: generateId(),
    fields: { KEY: key },
  };
}

function createControlsIfBlock(condition: BlockJSON, doBlock: BlockJSON): BlockJSON {
  return {
    type: 'controls_if',
    id: generateId(),
    inputs: {
      IF0: { block: condition },
      DO0: { block: doBlock },
    },
  };
}

function chainBlocks(blocks: BlockJSON[]): BlockJSON | undefined {
  if (blocks.length === 0) return undefined;
  if (blocks.length === 1) return blocks[0];

  for (let i = 0; i < blocks.length - 1; i++) {
    blocks[i].next = { block: blocks[i + 1] };
  }
  return blocks[0];
}

function createOnStartBlock(x: number, y: number, innerBlock?: BlockJSON): BlockJSON {
  const block: BlockJSON = {
    type: 'onStart',
    id: generateId(),
    x,
    y,
  };
  if (innerBlock) {
    block.inputs = { INNER: { block: innerBlock } };
  }
  return block;
}

function createOnUpdateBlock(x: number, y: number, innerBlock?: BlockJSON): BlockJSON {
  const block: BlockJSON = {
    type: 'onUpdate',
    id: generateId(),
    x,
    y,
  };
  if (innerBlock) {
    block.inputs = { INNER: { block: innerBlock } };
  }
  return block;
}

/**
 * Generate a flat workspace with a specified number of setProperty blocks
 * inside an onStart block.
 */
export function generateFlatWorkspace(blockCount: number): WorkspaceState {
  resetIdCounter();

  const properties: ('X' | 'Y' | 'VelocityX' | 'VelocityY')[] = ['X', 'Y', 'VelocityX', 'VelocityY'];
  const blocks: BlockJSON[] = [];

  for (let i = 0; i < blockCount; i++) {
    const property = properties[i % properties.length];
    blocks.push(createSetPropertyBlock(property, i));
  }

  const innerBlock = chainBlocks(blocks);
  const onStart = createOnStartBlock(38, 38, innerBlock);

  return {
    blocks: {
      languageVersion: 0,
      blocks: [onStart],
    },
  };
}

/**
 * Generate a workspace with deeply nested if-statements.
 */
export function generateNestedWorkspace(depth: number): WorkspaceState {
  resetIdCounter();

  const keys: ('left' | 'right' | 'up' | 'down')[] = ['left', 'right', 'up', 'down'];

  // Build from innermost to outermost
  let currentBlock: BlockJSON = createChangePropertyBlock('x', 1);

  for (let i = depth - 1; i >= 0; i--) {
    const key = keys[i % keys.length];
    currentBlock = createControlsIfBlock(
      createKeyPressedBlock(key),
      currentBlock
    );
  }

  const onUpdate = createOnUpdateBlock(38, 38, currentBlock);

  return {
    blocks: {
      languageVersion: 0,
      blocks: [onUpdate],
    },
  };
}

/**
 * Generate a realistic game workspace with multiple event handlers,
 * each containing if-statements and property changes.
 */
export function generateRealisticWorkspace(
  eventCount: number,
  blocksPerEvent: number
): WorkspaceState {
  resetIdCounter();

  const topLevelBlocks: BlockJSON[] = [];
  const keys: ('left' | 'right' | 'up' | 'down')[] = ['left', 'right', 'up', 'down'];
  const properties: ('x' | 'y')[] = ['x', 'y'];

  // Create onStart blocks
  for (let e = 0; e < Math.ceil(eventCount / 2); e++) {
    const innerBlocks: BlockJSON[] = [];
    for (let b = 0; b < blocksPerEvent; b++) {
      const property = properties[b % 2] === 'x' ? 'X' : 'Y';
      innerBlocks.push(createSetPropertyBlock(property as 'X' | 'Y', b * 10));
    }
    const inner = chainBlocks(innerBlocks);
    topLevelBlocks.push(createOnStartBlock(38, 38 + e * 300, inner));
  }

  // Create onUpdate blocks with if-statements
  for (let e = 0; e < Math.floor(eventCount / 2); e++) {
    const innerBlocks: BlockJSON[] = [];
    for (let b = 0; b < blocksPerEvent; b++) {
      const key = keys[b % keys.length];
      const property = properties[b % 2];
      const value = b % 2 === 0 ? -10 : 10;
      innerBlocks.push(
        createControlsIfBlock(
          createKeyPressedBlock(key),
          createChangePropertyBlock(property, value)
        )
      );
    }
    const inner = chainBlocks(innerBlocks);
    topLevelBlocks.push(createOnUpdateBlock(400, 38 + e * 300, inner));
  }

  return {
    blocks: {
      languageVersion: 0,
      blocks: topLevelBlocks,
    },
  };
}

/**
 * Calculate the approximate block count for a workspace state.
 * This counts all blocks including nested ones.
 */
export function countBlocks(state: WorkspaceState): number {
  let count = 0;

  function countBlock(block: BlockJSON | undefined): void {
    if (!block) return;
    count++;

    if (block.inputs) {
      for (const input of Object.values(block.inputs)) {
        if (input.block) countBlock(input.block);
        if (input.shadow) countBlock(input.shadow);
      }
    }

    if (block.next?.block) {
      countBlock(block.next.block);
    }
  }

  for (const block of state.blocks.blocks) {
    countBlock(block);
  }

  return count;
}
