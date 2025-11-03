/**
 * Custom Blockly blocks used by the Blockly editor.
 */

import * as Blockly from 'blockly/core';
import { javascriptGenerator, Order } from 'blockly/javascript';

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

const setPropertyDefinition = {
  type: "setProperty",
  tooltip: "Set a property of a sprite",
  helpUrl: "",
  message0: "set %1 to %2",
  args0: [
    {
      type: "field_dropdown",
      name: "PROPERTY",
      options: [
        [
          "x",
          "X"
        ],
        [
          "y",
          "Y"
        ],
        [
          "velocityX",
          "VelocityX"
        ],
        [
          "velocityY",
          "VelocityY"
        ]
      ]
    },
    {
      type: "input_value",
      name: "VALUE"
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 225
}
                    
Blockly.Blocks['setProperty'] = {
  init: function () {
    this.jsonInit(setPropertyDefinition);
  },
};

javascriptGenerator.forBlock['setProperty'] = function (block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Order.NONE);
  return `scene.player.set${block.getFieldValue('PROPERTY')}(${value})\n`;
};

const changePropertyDefinition = {
  type: "changeProperty",
  tooltip: "Change a property of a sprite by a certain amount",
  helpUrl: "",
  message0: "change %1 by %2",
  args0: [
    {
      type: "field_dropdown",
      name: "PROPERTY",
      options: [
        [
          "x",
          "x"
        ],
        [
          "y",
          "y"
        ],
        [
          "velocityX",
          "velocity.x"
        ],
        [
          "velocityY",
          "velocity.y"
        ]
      ]
    },
    {
      type: "input_value",
      name: "VALUE"
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 225
}
                    
Blockly.Blocks['changeProperty'] = {
  init: function () {
    this.jsonInit(changePropertyDefinition);
  },
};

javascriptGenerator.forBlock['changeProperty'] = function (block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Order.NONE);
  return `scene.player.body.${block.getFieldValue('PROPERTY')} += ${value}\n`;
};

const getPropertyDefinition = {
  type: "getProperty",
  tooltip: "Get a property of a sprite",
  helpUrl: "",
  message0: "%1 %2",
  args0: [
    {
      type: "field_dropdown",
      name: "PROPERTY",
      options: [
        [
          "x",
          "x"
        ],
        [
          "y",
          "y"
        ],
        [
          "velocityX",
          "velocity.x"
        ],
        [
          "velocityY",
          "velocity.y"
        ]
      ]
    },
    {
      type: "input_dummy",
      name: "DUMMY"
    }
  ],
  output: null,
  colour: 225
}

Blockly.Blocks['getProperty'] = {
  init: function () {
    this.jsonInit(getPropertyDefinition);
  },
};

javascriptGenerator.forBlock['getProperty'] = function (block, generator) {
  const code = `scene.player.${block.getFieldValue('PROPERTY')}`
  return [code, Order.NONE];
};

const onUpdateDefinition = {
  type: "onUpdate",
  tooltip: "",
  helpUrl: "",
  message0: "on update %1",
  args0: [
    {
      type: "input_statement",
      name: "INNER",
      align: "CENTRE"
    }
  ],
  colour: 225
}                

Blockly.Blocks['onUpdate'] = {
  init: function () {
    this.jsonInit(onUpdateDefinition);
  },
};

javascriptGenerator.forBlock['onUpdate'] = function (block, generator) {
  const inner = generator.statementToCode(block, 'INNER');
  return `scene.update = () => {\n${inner}}\n`;
};

const onStartDefinition = {
  type: "onStart",
  tooltip: "",
  helpUrl: "",
  message0: "on start %1",
  args0: [
    {
      type: "input_statement",
      name: "INNER",
      align: "CENTRE"
    }
  ],
  colour: 225
}                

Blockly.Blocks['onStart'] = {
  init: function () {
    this.jsonInit(onStartDefinition);
  },
};

javascriptGenerator.forBlock['onStart'] = function (block, generator) {
  const inner = generator.statementToCode(block, 'INNER');
  return `scene.start = () => {\n${inner}}\n`;
};

const keyPressedDefinition = {
  type: "keyPressed",
  tooltip: "",
  helpUrl: "",
  message0: "key %1 pressed %2",
  args0: [
    {
      type: "field_dropdown",
      name: "KEY",
      options: [
        [
          "left",
          "left"
        ],
        [
          "right",
          "right"
        ],
        [
          "up",
          "up"
        ],
        [
          "down",
          "down"
        ],
        [
          "space",
          "space"
        ]
      ]
    },
    {
      type: "input_dummy",
      name: "DUMMY"
    }
  ],
  "output": null,
  "colour": 225
}
                                  

Blockly.Blocks['keyPressed'] = {
  init: function () {
    this.jsonInit(keyPressedDefinition);
  },
};

javascriptGenerator.forBlock['keyPressed'] = function (block, generator) {
  const code = `scene.cursors.${block.getFieldValue('KEY')}.isDown`
  return [code, Order.NONE];
};