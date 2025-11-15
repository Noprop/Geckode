import * as Blockly from 'blockly/core';
import "blockly/blocks";
import '@/blockly/messages';
import * as locale from "blockly/msg/en";
import { Geckode } from '@/blockly/theme';
import '@blockly/toolbox-search';

import { spriteBlocks } from '@/blockly/blocks/sprites';
import { eventBlocks } from '@/blockly/blocks/events';
import { inputBlocks } from '@/blockly/blocks/input';
import { miscBlocks } from '@/blockly/blocks/misc';

const customBlocks = [
  ...spriteBlocks,
  ...eventBlocks,
  ...inputBlocks,
  ...miscBlocks,
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