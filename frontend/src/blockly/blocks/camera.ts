import { javascriptGenerator, Order } from "blockly/javascript";
import { useGeckodeStore } from '@/stores/geckodeStore';
import { isIsolated } from '@/blockly/index';


const cameraToXY = {
  type: 'cameraToXY',
  tooltip: 'Center the camera on a position',
  helpUrl: '',
  message0: 'center camera x:%1 y:%2',
  args0: [
    {
      type: 'input_value',
      name: 'x',
    },
    {
      type: 'input_value',
      name: 'y',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  colour: '%{BKY_CAMERA_HUE}',
};

javascriptGenerator.forBlock['cameraToXY'] = function (block, generator) {
  const x = generator.valueToCode(block, 'x', Order.NONE) || 0;
  const y = generator.valueToCode(block, 'y', Order.NONE) || 0;

  return `scene.cameras.main.x = scene.worldToCameraX(${x})\nscene.cameras.main.y = scene.worldToCameraY(${y})\n`;
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

  return property == 'x' ? `scene.cameras.main.x += ${value}\n`: `scene.cameras.main.y -= ${value}\n`;
};

const resetCamera = {
  type: 'resetCamera',
  tooltip: 'Return the camera to the default position',
  helpUrl: '',
  message0: 'Reset Camera',
  args0: [

  ],
  previousStatement: null,
  nextStatement: null,
  inputsInline: true,
  colour: '%{BKY_CAMERA_HUE}',
};

javascriptGenerator.forBlock['resetCamera'] = function (block, generator) {
  return `scene.cameras.main.centerOn(scene.scale.width/2, scene.toWorldY(scene.scale.height/2));`;
};


export const cameraBlocks = [
  cameraToXY,
  changeCamera,
  resetCamera
];
