/**
 * Custom Blockly blocks used by the Blockly editor.
 */

import * as Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';

const foreverBlockDefinition = {
  type: 'forever',
  message0: 'forever %1 %2',
  args0: [
    {
      // type: 'input_dummy',
      type: 'input_end_row',
    },
    {
      type: 'input_statement',
      name: 'DO',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  style: 'loop_blocks',
  tooltip: 'Repeat the enclosed statements forever.',
  helpUrl: '',
};

Blockly.Blocks['forever'] = {
  init: function () {
    this.jsonInit(foreverBlockDefinition);
  },
};

javascriptGenerator.forBlock['forever'] = function (block, generator) {
  const branch = generator.statementToCode(block, 'DO');
  const loopBody = branch ? branch : '';
  return `while (true) {\n${loopBody}}\n`;
};
