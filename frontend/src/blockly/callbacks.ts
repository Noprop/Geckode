import * as Blockly from 'blockly/core';

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