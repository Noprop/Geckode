import { javascriptGenerator, Order } from "blockly/javascript";

const runJS = {
  type: "runJS",
  tooltip: "Runs input JS code",
  helpUrl: "",
  message0: "execute JS code %1",
  args0: [
    {
      type: "field_input",
      name: "CODE",
      text: `console.log("hello world!")`,
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_SPRITES_HUE}"
}

javascriptGenerator.forBlock['runJS'] = function (block, generator) {
  const value = block.getFieldValue("CODE");
  return value + "\n";
  //return 'console.log("hello world!")\n'
};


const consoleLog = {
  type: "consoleLog",
  tooltip: "Prints input to console",
  helpUrl: "",
  message0: "Log %1",
  args0: [
    {
      type: "input_value",
      name: "VALUE",
    }
    
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "%{BKY_SPRITES_HUE}"
}


javascriptGenerator.forBlock['consoleLog'] = function (block, generator) {
  const value = generator.valueToCode(block, 'VALUE', Order.NONE);
  return `console.log(${value})\n`;
};

export const developmentBlocks = [
  runJS,
  consoleLog
];
