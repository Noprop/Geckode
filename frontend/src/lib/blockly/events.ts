import * as Blockly from "blockly/core";

export const applyBlocklyEvent = (event: any, workspace: Blockly.Workspace, forward: boolean = true) => {
  try {
    const blocklyEvent = Blockly.Events.fromJson(event, workspace);
    Blockly.Events.disable();
    blocklyEvent.run(forward);
  } catch (error) {
    console.error("Error applying Blockly event:", error);
  } finally {
    Blockly.Events.enable();
  }
};