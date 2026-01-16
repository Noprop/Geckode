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

import { javascriptGenerator } from 'blockly/javascript';
import { useEditorStore } from '@/stores/editorStore';

type UpdateHandler = {
  spriteId: string;
  functionName: string;
};

type StartHandler = {
  spriteId: string;
  functionName: string;
};


const customBlocks = [
  ...spriteBlocks,
  ...eventBlocks,
  ...inputBlocks,
  ...developmentBlocks,
  ...ghostBlocks,
];

let isRegistered = false;

export const registerBlockly = () => {
  if (typeof window === 'undefined') return;
  if (isRegistered) return;

  Blockly.setLocale(locale as any);
  Blockly.defineBlocksWithJsonArray(customBlocks);

  isRegistered = true;
};

export function getUpdateRegistry(generator: any): UpdateHandler[] {
  if (!generator.updateHandlers) {
    generator.updateHandlers = [];
  }
  return generator.updateHandlers;
}

export function getStartRegistry(generator: any): StartHandler[] {
  if (!generator.startHandlers) {
    generator.startHandlers = [];
  }
  return generator.startHandlers;
}

if (typeof window !== 'undefined') {
  const originalInit = javascriptGenerator.init;

  javascriptGenerator.init = function (workspace) {
    originalInit.call(this, workspace);
    (this as any).updateHandlers = [];
    (this as any).startHandlers = [];
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