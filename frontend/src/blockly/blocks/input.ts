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
  if (block.getFieldValue('PRESSED_TYPE') == "pressed") {
    const code = `scene.cursors.${block.getFieldValue('KEY')}.isDown`
    return [code, Order.NONE];
  } else if (block.getFieldValue('PRESSED_TYPE') == "just_pressed") {
    const code = `scene.getJustPressed(scene.cursors.${block.getFieldValue('KEY')})`
    return [code, Order.NONE];
  }
  
  const code = `scene.getJustReleased(scene.cursors.${block.getFieldValue('KEY')})`
  return [code, Order.NONE];
};

export const inputBlocks = [
  keyPressed,
];