import { javascriptGenerator, Order } from "blockly/javascript";
import { useGeckodeStore } from '@/stores/geckodeStore';
import { getKeyPressRegistry } from 'blockly/index';

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

const onKey = {
  type: 'onKey',
  tooltip: 'Runs code when a key is pressed, just pressed, or released',
  helpUrl: '',
  message0: 'on key %1 %2 %3 %4',
  args0: [
    {
      type: 'field_dropdown',
      name: 'KEY',
      options: [
        ['left', 'left'],
        ['right', 'right'],
        ['up', 'up'],
        ['down', 'down'],
        ['space', 'space'],
      ],
    },
    {
      type: 'field_dropdown',
      name: 'EVENT_TYPE',
      options: [
        ['just pressed', 'just_pressed'],
        ['pressed', 'pressed'],
        ['released', 'released'],
      ],
    },
    {
      type: 'input_dummy',
      name: 'LABEL',
    },
    {
      type: 'input_statement',
      name: 'INNER',
    },
  ],
  colour: '%{BKY_INPUT_HUE}',
};

javascriptGenerator.forBlock['onKey'] = function (block, generator) {
  const inner = generator.statementToCode(block, 'INNER');
  const spriteId = useGeckodeStore.getState().getCurrentSpriteId() ?? '';
  const keyId = block.id;
  const key = block.getFieldValue('KEY');
  const eventType = block.getFieldValue('EVENT_TYPE');

  const spriteFunction = generator.provideFunction_(`${spriteId}_key_${key}_${eventType}_${keyId}`, [
    `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(thisSprite) {`,
    `${inner}`,
    `}`,
  ]);

  getKeyPressRegistry(generator).push({
    spriteId: `${spriteId}`,
    functionName: spriteFunction,
    key: key,
    eventType: eventType,
  });

  return '';
};

export const inputBlocks = [
  keyPressed,
  onKey,
];