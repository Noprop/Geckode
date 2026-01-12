import { javascriptGenerator } from "blockly/javascript";
import { useEditorStore } from '@/stores/editorStore';
import { getUpdateRegistry, getStartRegistry } from 'blockly/index';

const onUpdate = {
  type: "onUpdate",
  tooltip: "Runs code once per frame",
  helpUrl: "",
  message0: "on update %1 %2",
  args0: [
    {
      type: "input_dummy",
      name: "LABEL"
    },
    {
      type: "input_statement",
      name: "INNER"
    }
  ],
  colour: "%{BKY_EVENTS_HUE}"
}

javascriptGenerator.forBlock['onUpdate'] = function (block, generator) {
  const inner = generator.statementToCode(block, 'INNER');
  const spriteId = useEditorStore.getState().spriteId;
  const updateId = useEditorStore.getState().updateId;

  console.log("updateId: " + updateId);

  const spriteFunction = generator.provideFunction_(`${spriteId}_update_${updateId}`,
    [
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(thisSprite) {`,
      `${inner}`,
      `}`
    ]
  )

  useEditorStore.setState( {updateId: updateId + 1} )

  getUpdateRegistry(generator).push({
    spriteId: `${spriteId}`,
    functionName: spriteFunction
  });

  return '';
};

const onStart = {
  type: "onStart",
  tooltip: "Runs code once when the game starts",
  helpUrl: "",
  message0: "on start %1 %2",
  args0: [
    {
      type: "input_dummy",
      name: "LABEL"
    },
    {
      type: "input_statement",
      name: "INNER"
    }
  ],
  colour: "%{BKY_EVENTS_HUE}"
}

javascriptGenerator.forBlock['onStart'] = function (block, generator) {
  const inner = generator.statementToCode(block, 'INNER');
  const spriteId = useEditorStore.getState().spriteId;
  const startId = useEditorStore.getState().startId;

  console.log("startId: " + startId);

  const spriteFunction = generator.provideFunction_(`${spriteId}_start_${startId}`,
    [
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(thisSprite) {`,
      `${inner}`,
      `}`
    ]
  )

  useEditorStore.setState( { startId: startId + 1} )

  getStartRegistry(generator).push({
    spriteId: `${spriteId}`,
    functionName: spriteFunction
  });

  return '';

  // const inner = generator.statementToCode(block, 'INNER');
  // return `scene.start = () => {\n${inner}}\n`;
};

export const eventBlocks = [
  onUpdate,
  onStart,
];