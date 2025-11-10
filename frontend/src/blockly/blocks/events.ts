import { javascriptGenerator } from "blockly/javascript";

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
  return `scene.update = () => {\n${inner}}\n`;
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
  return `scene.start = () => {\n${inner}}\n`;
};

export const eventBlocks = [
  onUpdate,
  onStart,
];