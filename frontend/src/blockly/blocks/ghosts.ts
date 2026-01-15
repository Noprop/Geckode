// ghost blocks

import { javascriptGenerator, Order } from 'blockly/javascript';
import { registerFieldAngle } from '@blockly/field-angle';

registerFieldAngle();
const angleGhost = {
  type: 'angleGhost',
  tooltip: 'Manully select an angle',
  helpUrl: '',
  message0: '%1',
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
  output: null,
  colour: '%{BKY_SPRITES_HUE}',
};

javascriptGenerator.forBlock['angleGhost'] = function (block, generator) {
  var value = block.getFieldValue("VALUE");
  const code = `${value}`
  return [code, Order.NONE];
};

export const ghostBlocks = [
  angleGhost,
];