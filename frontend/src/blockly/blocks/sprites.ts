import { javascriptGenerator, Order } from "blockly/javascript";
import { getSpriteDropdownOptions } from '@/blockly/spriteRegistry';
import { useGeckodeStore } from '@/stores/geckodeStore';
import { isIsolated } from '@/blockly/index';

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
  const currentSpriteId = useGeckodeStore.getState().getCurrentSpriteId();
  const spriteName = spriteKey === currentSpriteId ? 'thisSprite' : '"' + spriteKey + '"';

  if (
    useGeckodeStore
      .getState()
      .spriteInstances.map((s) => s.id)
      .includes(spriteKey) &&
    !isIsolated(block)
  ) {
    return `scene.getSprite(${spriteName}).set${block.getFieldValue('PROPERTY')}(${value})\n`;
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

  if (
    useGeckodeStore
      .getState()
      .spriteInstances.map((s) => s.id)
      .includes(spriteKey) &&
    !isIsolated(block)
  ) {
    // TODO: verify that we should be using sprite.body instead of sprite.x (apparently .body is the physics body which
    // is the top left of the sprite, rather than the center)
    const currentSpriteId = useGeckodeStore.getState().getCurrentSpriteId();
    return `scene.getSprite(${
      spriteKey === currentSpriteId ? 'thisSprite' : '"' + spriteKey + '"'
    }).body.${block.getFieldValue('PROPERTY')} += ${value}\n`;
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
  if (
    useGeckodeStore
      .getState()
      .spriteInstances.map((s) => s.id)
      .includes(spriteKey) &&
    !isIsolated(block)
  ) {
    const currentSpriteId = useGeckodeStore.getState().getCurrentSpriteId();
    const code = `scene.getSprite(${
      spriteKey === currentSpriteId ? 'thisSprite' : '"' + spriteKey + '"'
    }).${block.getFieldValue('PROPERTY')}`;
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

  if (
    useGeckodeStore
      .getState()
      .spriteInstances.map((s) => s.id)
      .includes(spriteKey) &&
    !isIsolated(block)
  ) {
    const currentSpriteId = useGeckodeStore.getState().getCurrentSpriteId();
    return `scene.getSprite(${
      spriteKey === currentSpriteId ? 'thisSprite' : '"' + spriteKey + '"'
    }).angle = (${value}-90) % 360\n`;
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
  
  // Example: Check if this block is inside an update loop
  // const inUpdateLoop = isInUpdateLoop(block);
  // You can use this to generate different code based on context
  
  if (
    useGeckodeStore
      .getState()
      .spriteInstances.map((s) => s.id)
      .includes(spriteKey) &&
    !isIsolated(block)
  ) {
    const currentSpriteId = useGeckodeStore.getState().getCurrentSpriteId();
    const spriteName = `scene.getSprite(${spriteKey === currentSpriteId ? 'thisSprite' : '"' + spriteKey + '"'})`;
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
  if (
    useGeckodeStore
      .getState()
      .spriteInstances.map((s) => s.id)
      .includes(spriteKey1) &&
    useGeckodeStore
      .getState()
      .spriteInstances.map((s) => s.id)
      .includes(spriteKey2) &&
    !isIsolated(block)
  ) {
    const currentSpriteId = useGeckodeStore.getState().getCurrentSpriteId();
    const spriteName1 = `scene.getSprite(${spriteKey1 === currentSpriteId ? 'thisSprite' : '"' + spriteKey1 + '"'})`;
    const spriteName2 = `scene.getSprite(${spriteKey2 === currentSpriteId ? 'thisSprite' : '"' + spriteKey2 + '"'})`;

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
