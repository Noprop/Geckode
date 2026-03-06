import { javascriptGenerator, Order } from "blockly/javascript";
import { useGeckodeStore } from '@/stores/geckodeStore';
import { isIsolated } from '@/blockly/index';


const setCameraTarget = {
  type: 'setCameraTarget',
  tooltip: 'Start following a sprite with the camera',
  helpUrl: '',
  message0: 'set camera target to %1',
  args0: [
    {
      type: 'input_value',
      name: 'SPRITE',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  colour: '%{BKY_CAMERA_HUE}',
};

javascriptGenerator.forBlock['setCameraTarget'] = function (block, generator) {
  const spriteKey = generator.valueToCode(block, 'SPRITE', Order.NONE) || '';
  const currentSpriteId = useGeckodeStore.getState().getCurrentSpriteId();
  const spriteName = spriteKey === `"${currentSpriteId}"` ? 'thisSprite' : spriteKey;
  const spriteRef = `scene.getSprite(${spriteName})`;

  return `scene.cameras.main.startFollow(${spriteRef})\n`;
};

const setCamera = {
  type: 'setCamera',
  tooltip: 'Set the position of the camera',
  helpUrl: '',
  message0: 'set camera %1 to %2',
  args0: [
    {
      type: 'field_dropdown',
      name: 'PROPERTY',
      options: [['x','x'], ['y','y']],
    },
    {
      type: 'input_value',
      name: 'VALUE',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  colour: '%{BKY_CAMERA_HUE}',
};

javascriptGenerator.forBlock['setCamera'] = function (block, generator) {
  const property = block.getFieldValue('PROPERTY');
  const value = generator.valueToCode(block, 'VALUE', Order.NONE) || 0;

  return property == 'x' ? `scene.cameras.main.centerOnX(${value})\n`: `scene.cameras.main.centerOnY(-${value})\n`;
};

const changeCamera = {
  type: 'changeCamera',
  tooltip: 'Change the position of the camera',
  helpUrl: '',
  message0: 'change camera %1 by %2',
  args0: [
    {
      type: 'field_dropdown',
      name: 'PROPERTY',
      options: [['x','x'], ['y','y']],
    },
    {
      type: 'input_value',
      name: 'VALUE',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  colour: '%{BKY_CAMERA_HUE}',
};

javascriptGenerator.forBlock['changeCamera'] = function (block, generator) {
  const property = block.getFieldValue('PROPERTY');
  const value = generator.valueToCode(block, 'VALUE', Order.NONE) || 0;

  return property == 'x' ? `scene.cameras.main.scrollX += ${value}\n`
  : `scene.cameras.main.scrollY -= ${value}\n`;
};

const resetCamera = {
  type: 'resetCamera',
  tooltip: 'Stop following a sprite with the camera',
  helpUrl: '',
  message0: 'stop camera follow',
  args0: [

  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  colour: '%{BKY_CAMERA_HUE}',
};

javascriptGenerator.forBlock['resetCamera'] = function (block, generator) {
  return `scene.cameras.main.stopFollow()\n`;
};


export const cameraBlocks = [
  setCameraTarget,
  setCamera,
  changeCamera,
  resetCamera
];
