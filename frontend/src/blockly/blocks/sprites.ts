import { javascriptGenerator, Order } from "blockly/javascript";
import { getSpriteDropdownOptions } from '@/blockly/spriteRegistry';
import { useEditorStore } from '@/stores/editorStore';
import { useSpriteStore } from "@/stores/spriteStore";

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
  const spriteKey = generator.valueToCode(block, 'SPRITE', Order.NONE) || '';

  if (useSpriteStore.getState().spriteInstances.map(s => s.id).includes(spriteKey)){
    return `scene.getSprite(${spriteKey === useEditorStore.getState().spriteId ? 'thisSprite' : '"' + spriteKey + '"'}).set${block.getFieldValue(
      'PROPERTY'
    )}(${value})\n`;
  }

  return '';
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
  const spriteKey = generator.valueToCode(block, 'SPRITE', Order.NONE) || '';

  if (useSpriteStore.getState().spriteInstances.map(s => s.id).includes(spriteKey)){
    return `scene.getSprite(${spriteKey === useEditorStore.getState().spriteId ? 'thisSprite' : '"' + spriteKey + '"'}).body.${block.getFieldValue(
      'PROPERTY'
    )} += ${value}\n`;
  }

  return '';
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
  const spriteKey = generator.valueToCode(block, 'SPRITE', Order.NONE) || '';
  if (useSpriteStore.getState().spriteInstances.map(s => s.id).includes(spriteKey)){
    const code = `scene.getSprite(${spriteKey === useEditorStore.getState().spriteId ? 'thisSprite' : '"' + spriteKey + '"'}).${block.getFieldValue(
      'PROPERTY'
    )}`;
    return [code, Order.NONE];
  }
  return['', Order.NONE];
  
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
  const spriteKey = generator.valueToCode(block, 'SPRITE', Order.NONE) || '';

  if (useSpriteStore.getState().spriteInstances.map(s => s.id).includes(spriteKey)){
    return `scene.getSprite(${spriteKey === useEditorStore.getState().spriteId ? 'thisSprite' : '"' + spriteKey + '"'}).angle = (${value}-90) % 360\n`;
  }
  return '';
};

const pointAtXY = {
  type: "pointAtXY",
  tooltip: "Point at a position",
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
  const spriteKey = generator.valueToCode(block, 'SPRITE', Order.NONE) || '';
  if (useSpriteStore.getState().spriteInstances.map(s => s.id).includes(spriteKey)){
    const spriteName = `scene.getSprite(${spriteKey === useEditorStore.getState().spriteId ? 'thisSprite' : '"' + spriteKey + '"'})`
    return `${spriteName}.rotation = Phaser.Math.Angle.Between(${spriteName}.x, ${spriteName}.y, ${x}, ${y})\n`;
  }
  return '';
};

const isTouching = {
  type: "isTouching",
  tooltip: "Test for collision",
  helpUrl: "",
  message0: "%1 touching %2 ?",
  args0: [
    {
      type: 'input_value',
      name: 'SPRITE1',
    },
    {
      type: "input_value",
      name: 'SPRITE2',
    },
  ],
  inputsInline: true,
  output: "Boolean",
  colour: "%{BKY_SPRITES_HUE}",
  
}

javascriptGenerator.forBlock['isTouching'] = function (block, generator) {

  const spriteKey1 = generator.valueToCode(block, 'SPRITE1', Order.NONE) || '';
  const spriteKey2 = generator.valueToCode(block, 'SPRITE2', Order.NONE) || '';
  if (useSpriteStore.getState().spriteInstances.map(s => s.id).includes(spriteKey1)
      && useSpriteStore.getState().spriteInstances.map(s => s.id).includes(spriteKey2)){
    const spriteName1 = `scene.getSprite(${spriteKey1 === useEditorStore.getState().spriteId ? 'thisSprite' : '"' + spriteKey1 + '"'})`;
    const spriteName2 = `scene.getSprite(${spriteKey2 === useEditorStore.getState().spriteId ? 'thisSprite' : '"' + spriteKey2 + '"'})`;
    
    return [`scene.physics.world.overlap(${spriteName1}, ${spriteName2})`, Order.NONE];
  }
  return [`false`, Order.NONE];
};


export const spriteBlocks = [
  setProperty,
  changeProperty,
  getProperty,
  setRotation,
  pointAtXY,
  isTouching
];
