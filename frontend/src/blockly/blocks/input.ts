import { javascriptGenerator, Order } from "blockly/javascript";

const keyPressed = {
  type: "keyPressed",
  tooltip: "return \"true\" if a specific key is pressed ",
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
  output: "Boolean",
  colour: "%{BKY_INPUT_HUE}"
}

javascriptGenerator.forBlock['keyPressed'] = function (block, generator) {
  const code = `scene.cursors.${block.getFieldValue('KEY')}.isDown`
  return [code, Order.NONE];
};

export const inputBlocks = [
  keyPressed,
];