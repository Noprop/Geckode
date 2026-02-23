import * as Blockly from 'blockly/core';
import "blockly/blocks";
import '@/blockly/messages';
import * as locale from "blockly/msg/en";
import '@blockly/toolbox-search';

import { spriteBlocks } from '@/blockly/blocks/sprites';
import { eventBlocks } from '@/blockly/blocks/events';
import { inputBlocks } from '@/blockly/blocks/input';
import { developmentBlocks } from '@/blockly/blocks/development';
import { ghostBlocks } from '@/blockly/blocks/ghosts';
import { cameraBlocks } from '@/blockly/blocks/camera';

import { javascriptGenerator } from 'blockly/javascript';

type UpdateHandler = {
  spriteId: string;
  functionName: string;
};

type StartHandler = {
  spriteId: string;
  functionName: string;
};

type KeyPressHandler = {
  spriteId: string;
  functionName: string;
  key: 'left' | 'right' | 'up' | 'down' | 'space';
  eventType: 'just_pressed' | 'pressed' | 'released';
};

const customBlocks = [...spriteBlocks, ...eventBlocks, ...inputBlocks, ...developmentBlocks, ...ghostBlocks, ...cameraBlocks];

let isRegistered = false;

export const registerBlockly = () => {
  if (typeof window === 'undefined') return;
  if (isRegistered) return;

  Blockly.setLocale(locale as any);
  Blockly.defineBlocksWithJsonArray(customBlocks);

  isRegistered = true;
};

export function getUpdateRegistry(generator: any): UpdateHandler[] {
  if (!generator.updateHandlers) generator.updateHandlers = [];
  return generator.updateHandlers;
}

export function getStartRegistry(generator: any): StartHandler[] {
  if (!generator.startHandlers) generator.startHandlers = [];
  return generator.startHandlers;
}

export function getKeyPressRegistry(generator: any): KeyPressHandler[] {
  if (!generator.keyPressHandlers) generator.keyPressHandlers = [];
  return generator.keyPressHandlers;
}

export function isIsolated(block: Blockly.Block): boolean {
  let currentBlock: Blockly.Block | null = block;

  // Traverse up to the parent block
  while (currentBlock) {
    if (currentBlock.type === 'onUpdate' || currentBlock.type === 'onStart' || currentBlock.type === 'onKey') return false;
    currentBlock = currentBlock.getSurroundParent();
  }

  return true;
}

const oldScrub = javascriptGenerator.scrub_;

javascriptGenerator.scrub_ = function (block, code, thisOnly) {
  // Allow event blocks themselves
  if (
    block.type === 'onUpdate' ||
    block.type === 'onStart' ||
    block.type === 'onKey'
  ) {
    return oldScrub.call(this, block, code, thisOnly);
  }

  // Strip code if not inside an event
  if (isIsolated(block)) {
    return '';
  }
  
  return oldScrub.call(this, block, code, thisOnly);
};

if (typeof window !== 'undefined') {
  const originalInit = javascriptGenerator.init;

  javascriptGenerator.init = function (workspace) {
    originalInit.call(this, workspace);
    (this as any).updateHandlers = [];
    (this as any).startHandlers = [];
    (this as any).keyPressHandlers = [];
  };
}

// MIGHT USE THIS LATER

// const originalFinish = javascriptGenerator.finish;

// javascriptGenerator.finish = function (code: string) {
//   const handlers: UpdateHandler[] = (this as any).updateHandlers ?? [];

//   if (!handlers.length) {
//     return originalFinish.call(this, code);
//   }

//   const body = handlers
//     .map(h => `  ${h.functionName}('${h.spriteId}');`)
//     .join('\n');

//   const combinedUpdate = `
//     scene.update = () => {
//     ${body}
//     };
//   `;

//   return originalFinish.call(this, code + combinedUpdate);
// };