import { javascriptGenerator, Order } from "blockly/javascript";
import { getSpriteDropdownOptions } from '@/blockly/spriteRegistry';
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
      type: 'input_value',
      name: 'SPRITE',
    },
    {
      type: 'input_value',
      name: 'VALUE',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  colour: '%{BKY_SPRITES_HUE}',
};

javascriptGenerator.forBlock['setProperty'] = function (block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Order.NONE) || 0;
  const spriteKey = generator.valueToCode(block, 'SPRITE', Order.NONE) || 0;

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
      type: 'input_value',
      name: 'SPRITE',
    },
    {
      type: 'input_value',
      name: 'VALUE',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  colour: '%{BKY_SPRITES_HUE}',
};

javascriptGenerator.forBlock['changeProperty'] = function (block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Order.NONE) || 0;
  const spriteKey = generator.valueToCode(block, 'SPRITE', Order.NONE) || 0;

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
      type: 'input_value',
      name: 'SPRITE',
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
  const spriteKey = generator.valueToCode(block, 'SPRITE', Order.NONE) || 0;
  
  const code = `scene.getSprite(${spriteKey === useEditorStore.getState().spriteId ? 'thisSprite' : '"' + spriteKey + '"'}).${block.getFieldValue(
    'PROPERTY'
  )}`;
  return [code, Order.NONE];
};

const setRotation = {
  type: "setRotation",
  tooltip: "Set the rotation of a sprite",
  helpUrl: "",
  message0: "rotate %1 to %2",
  args0: [
    {
      type: 'input_value',
      name: 'SPRITE',
    },
    {
      type: 'input_value',
      name: 'VALUE',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  colour: "%{BKY_SPRITES_HUE}"
}

javascriptGenerator.forBlock['setRotation'] = function (block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Order.NONE) || 0;
  const spriteKey = generator.valueToCode(block, 'SPRITE', Order.NONE) || 0;

  return `scene.getSprite(${spriteKey === useEditorStore.getState().spriteId ? 'thisSprite' : '"' + spriteKey + '"'}).angle = (${value}-90) % 360\n`;
};

const pointAtXY = {
  type: "pointAtXY",
  tooltip: "Point at a positin",
  helpUrl: "",
  message0: "point %1 at x:%2 y:%3",
  args0: [
    {
      type: 'input_value',
      name: 'SPRITE',
    },
    {
      type: "input_value",
      name: "x",
      value: 0,
    },
    {
      type: "input_value",
      name: "y",
      value: 0,
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  colour: "%{BKY_SPRITES_HUE}",
  
}

javascriptGenerator.forBlock['pointAtXY'] = function (block, generator) {
  const x = generator.valueToCode(block, 'x', Order.NONE) || 0;
  const y = generator.valueToCode(block, 'y', Order.NONE) || 0;
  const spriteKey = generator.valueToCode(block, 'SPRITE', Order.NONE) || 0;
  const spriteName = `scene.getSprite(${spriteKey === useEditorStore.getState().spriteId ? 'thisSprite' : '"' + spriteKey + '"'})`


  return `${spriteName}.rotation = Phaser.Math.Angle.Between(${spriteName}.x, ${spriteName}.y, ${x}, ${y})\n`;
};

export const spriteBlocks = [
  setProperty,
  changeProperty,
  getProperty,
  setRotation,
  pointAtXY,
];
