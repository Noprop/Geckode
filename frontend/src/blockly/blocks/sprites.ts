import { javascriptGenerator, Order } from "blockly/javascript";
import { getSpriteDropdownOptions } from "@/blockly/spriteRegistry";
import { useEditorStore } from '@/stores/editorStore';

const setProperty = {
  type: 'setProperty',
  tooltip: 'Set the property of a sprite',
  helpUrl: '',
  message0: 'set %1 of %2 to %3',
  args0: [
    {
      type: 'field_dropdown',
      name: 'PROPERTY',
      options: [
        ['x', 'X'],
        ['y', 'Y'],
        ['velocityX', 'VelocityX'],
        ['velocityY', 'VelocityY'],
      ],
    },
    {
      type: 'field_dropdown',
      name: 'SPRITE',
      options: getSpriteDropdownOptions,
    },
    {
      type: 'input_value',
      name: 'VALUE',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_SPRITES_HUE}',
};

javascriptGenerator.forBlock['setProperty'] = function (block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Order.NONE) || 0;
  const spriteKey = block.getFieldValue('SPRITE');

  return `scene.getSprite(${spriteKey === useEditorStore.getState().spriteId ? 'thisSprite' : '"' + spriteKey + '"'}).set${block.getFieldValue(
    'PROPERTY'
  )}(${value})\n`;
};

const changeProperty = {
  type: 'changeProperty',
  tooltip: 'Change the property of a sprite by a certain amount',
  helpUrl: '',
  message0: 'change %1 of %2 by %3',
  args0: [
    {
      type: 'field_dropdown',
      name: 'PROPERTY',
      options: [
        ['x', 'x'],
        ['y', 'y'],
        ['velocityX', 'velocity.x'],
        ['velocityY', 'velocity.y'],
      ],
    },
    {
      type: 'field_dropdown',
      name: 'SPRITE',
      options: getSpriteDropdownOptions,
    },
    {
      type: 'input_value',
      name: 'VALUE',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: '%{BKY_SPRITES_HUE}',
};

javascriptGenerator.forBlock['changeProperty'] = function (block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Order.NONE) || 0;
  const spriteKey = block.getFieldValue('SPRITE');

  return `scene.getSprite(${spriteKey === useEditorStore.getState().spriteId ? 'thisSprite' : '"' + spriteKey + '"'}).body.${block.getFieldValue(
    'PROPERTY'
  )} += ${value}\n`;
};

const getProperty = {
  type: 'getProperty',
  tooltip: 'Get the property of a sprite',
  helpUrl: '',
  message0: 'get %1 %2',
  args0: [
    {
      type: 'field_dropdown',
      name: 'SPRITE',
      options: getSpriteDropdownOptions,
    },
    {
      type: 'field_dropdown',
      name: 'PROPERTY',
      options: [
        ['x', 'x'],
        ['y', 'y'],
        ['velocityX', 'velocity.x'],
        ['velocityY', 'velocity.y'],
      ],
    },
  ],
  output: null,
  colour: '%{BKY_SPRITES_HUE}',
};

javascriptGenerator.forBlock['getProperty'] = function (block, generator) {
  const spriteKey = block.getFieldValue('SPRITE');
  
  const code = `scene.getSprite(${spriteKey === useEditorStore.getState().spriteId ? 'thisSprite' : '"' + spriteKey + '"'}).${block.getFieldValue(
    'PROPERTY'
  )}`;
  return [code, Order.NONE];
};

export const spriteBlocks = [setProperty, changeProperty, getProperty];
