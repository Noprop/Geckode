import { javascriptGenerator, Order } from "blockly/javascript";
import { getSpriteDropdownOptions } from "@/blockly/spriteRegistry";
import { registerFieldAngle } from '@blockly/field-angle';
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

registerFieldAngle();
const setRotation = {
  type: "setRotation",
  tooltip: "Set the rotation of a sprite",
  helpUrl: "",
  message0: "set rotation to %1",
  args0: [
    {
      type: "field_angle",
      name: "VALUE",
      clockwise: true,
      offset: 90,
      value: 90,
      symbol: ""
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_SPRITES_HUE}"
}

javascriptGenerator.forBlock['setRotation'] = function (block, generator) {
  var value = block.getFieldValue("VALUE");
  value = (value - 90) % 360;
  return `scene.player.angle = ${value}\n`;
};

const pointAtXY = {
  type: "pointAtXY",
  tooltip: "Point at a positin",
  helpUrl: "",
  message0: "point at x:%1 y:%2",
  args0: [
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
  colour: "%{BKY_SPRITES_HUE}",
  inlineInputs: true
}

javascriptGenerator.forBlock['pointAtXY'] = function (block, generator) {
  const x = generator.valueToCode(block, 'x', Order.NONE) || 0;
  const y = generator.valueToCode(block, 'y', Order.NONE) || 0;

  return `scene.player.rotation = Phaser.Math.Angle.Between(scene.player.x, scene.player.y, ${x}, ${y})\n`;
};

export const spriteBlocks = [
  setProperty,
  changeProperty,
  getProperty,
  setRotation,
  pointAtXY,
];
