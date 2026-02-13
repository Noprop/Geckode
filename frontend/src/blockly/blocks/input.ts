import { javascriptGenerator, Order } from "blockly/javascript";

const keyPressed = {
  type: "keyPressed",
  tooltip: "return \"true\" if a specific key is pressed ",
  helpUrl: "",
  message0: "key %1 %2",
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
      type: "field_dropdown",
      name: "PRESSED_TYPE",
      options: [
        [
          "just pressed",
          "just_pressed"
        ],
        [
          "pressed",
          "pressed"
        ],
        [
          "released",
          "released"
        ],
      ]
    }
  ],
  output: "Boolean",
  colour: "%{BKY_INPUT_HUE}"
}

javascriptGenerator.forBlock['keyPressed'] = function (block, generator) {
  //const code = `scene.cursors.${block.getFieldValue('KEY')}.isDown`
  const code = `Phaser.Input.Keyboard.JustDown(scene.cursors.${block.getFieldValue('KEY')})`
  return [code, Order.NONE];
};

export const inputBlocks = [
  keyPressed,
];