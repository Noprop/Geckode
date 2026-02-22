import { javascriptGenerator, Order } from "blockly/javascript";
import { useGeckodeStore } from '@/stores/geckodeStore';
import { isIsolated } from '@/blockly/index';


const cameraToXY = {
  type: 'cameraToXY',
  tooltip: 'Center the camera on a position',
  helpUrl: '',
  message0: 'Center camera x:%1 y:%2',
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
  colour: '%{BKY_SPRITES_HUE}',
};

javascriptGenerator.forBlock['cameraToXY'] = function (block, generator) {
  const x = generator.valueToCode(block, 'x', Order.NONE) || 0;
  const y = generator.valueToCode(block, 'y', Order.NONE) || 0;

  return `scene.cameras.main.centerOn(${x},-(${y}))\n`;
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
  colour: '%{BKY_SPRITES_HUE}',
};

javascriptGenerator.forBlock['resetCamera'] = function (block, generator) {
  return `scene.cameras.main.centerOn(scene.scale.width/2, scene.toWorldY(scene.scale.height/2));`;
};


export const cameraBlocks = [
  cameraToXY,
  resetCamera
];
