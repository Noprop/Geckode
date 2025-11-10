import { javascriptGenerator, Order } from "blockly/javascript";

const setProperty = {
  type: "setProperty",
  tooltip: "Set the property of a sprite",
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
  colour: "%{BKY_SPRITES_HUE}"
}

javascriptGenerator.forBlock['setProperty'] = function (block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Order.NONE);
  return `scene.player.set${block.getFieldValue('PROPERTY')}(${value})\n`;
};

const changeProperty = {
  type: "changeProperty",
  tooltip: "Change the property of a sprite by a certain amount",
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
  colour: "%{BKY_SPRITES_HUE}"
}

javascriptGenerator.forBlock['changeProperty'] = function (block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Order.NONE);
  return `scene.player.body.${block.getFieldValue('PROPERTY')} += ${value}\n`;
};

const getProperty = {
  type: "getProperty",
  tooltip: "Get the property of a sprite",
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
  colour: "%{BKY_SPRITES_HUE}"
}

javascriptGenerator.forBlock['getProperty'] = function (block, generator) {
  const code = `scene.player.${block.getFieldValue('PROPERTY')}`
  return [code, Order.NONE];
};

export const spriteBlocks = [
  setProperty,
  changeProperty,
  getProperty,
];