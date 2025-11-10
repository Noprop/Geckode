import * as Blockly from 'blockly/core';
import "blockly/blocks";
import '@/Blockly/messages';
import * as locale from "blockly/msg/en";
import { Geckode } from '@/Blockly/theme';

import { spriteBlocks } from '@/Blockly/blocks/sprites';
import { eventBlocks } from '@/Blockly/blocks/events';
import { inputBlocks } from '@/Blockly/blocks/input';

const customBlocks = [
  ...spriteBlocks,
  ...eventBlocks,
  ...inputBlocks,
];

let isRegistered = false;

export const registerBlockly = () => {
  if (isRegistered) return;

  Blockly.setLocale(locale as any);
  Blockly.defineBlocksWithJsonArray(customBlocks);

  Blockly.registry.register(
    Blockly.registry.Type.THEME,
    'Geckode',
    Geckode,
  );

  isRegistered = true;
};