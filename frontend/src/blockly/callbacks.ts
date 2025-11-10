import * as Blockly from 'blockly/core';

export const variableCreateButtonCallback = (button: Blockly.FlyoutButton) => {
  const ws = button.getTargetWorkspace();
  const toolbox = ws.getToolbox();
  const selectedItem = toolbox?.getSelectedItem();

  Blockly.Variables.createVariableButtonHandler(ws);

  // This can be a way to do a custom variable name handler (maybe do a nicer pop out for example)
  // const name = prompt('New variable name:');
  // if (!name) {
  //   return;
  // }
  // ws.getVariableMap().createVariable(name);

  if (toolbox && selectedItem) {
    // Re-select the same category so flyout refreshes and stays open (except for an annoying flash)
    setTimeout(() => {
      toolbox.setSelectedItem(selectedItem);
    }, 50);
  }
};

export const variableCategoryCallback = (workspace: Blockly.WorkspaceSvg): Blockly.utils.toolbox.ToolboxItemInfo[] => {
  const variables = workspace.getVariableMap().getAllVariables();

  const blocks: Blockly.utils.toolbox.ToolboxItemInfo[] = [];

  blocks.push({
    kind: 'button',
    text: 'Create variable',
    callbackKey: 'createVariableButton',
  } as any);

  if (variables.length > 0) {
    const lastVar = variables[variables.length - 1];

    blocks.push({
      kind: 'block',
      type: 'variables_set',
      fields: {
        VAR: lastVar,
      },
    });

    blocks.push({
      kind: 'block',
      type: 'math_change',
      fields: {
        VAR: lastVar,
      },
      inputs: {
        DELTA: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: 1,
            },
          },
        },
      },
    });

    for (const variable of variables) {
      blocks.push({
        kind: 'block',
        type: 'variables_get',
        fields: {
          VAR: variable,
        },
      });
    }
  }

  return blocks;
};