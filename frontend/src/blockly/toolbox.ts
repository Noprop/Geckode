const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'search',
      name: 'Search',
      contents: [],
    },
    {
      kind: 'category',
      name: 'Events',
      contents: [
        {
          kind: 'block',
          type: 'onStart',
        },
        {
          kind: 'block',
          type: 'onUpdate',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Sprites',
      contents: [
        {
          kind: 'block',
          type: 'createSprite',
        },
        {
          kind: 'block',
          type: 'setProperty',
          inputs: {
            VALUE: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 0,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'changeProperty',
          inputs: {
            VALUE: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 0,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'getProperty',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Input',
      contents: [
        {
          kind: 'block',
          type: 'keyPressed',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Control',
      contents: [
        {
          kind: 'block',
          type: 'controls_if',
          inputs: {
            IF0: {
              shadow: {
                type: 'logic_boolean',
                fields: {
                  BOOL: 'TRUE',
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'controls_ifelse',
        },
        {
          kind: 'block',
          type: 'logic_compare',
          inputs: {
            A: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 0,
                },
              },
            },
            B: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 0,
                },
              },
            },
          },
        },
        {
          kind: 'block',
          type: 'logic_operation',
          fields: {
            OP: 'AND',
          },
        },
        {
          kind: 'block',
          type: 'logic_operation',
          fields: {
            OP: 'OR',
          },
        },
        {
          kind: 'block',
          type: 'logic_negate',
        },
        {
          kind: 'block',
          type: 'logic_boolean',
        },
      ],
    },
    {
      kind: 'category',
      name: 'Math',
      contents: [
        {
          kind: 'block',
          type: 'math_number',
        },
        {
          kind: 'block',
          type: 'math_arithmetic',
          inputs: {
            A: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 0,
                },
              },
            },
            B: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 0,
                },
              },
            },
          },
        },
      ],
    },
    {
      kind: 'category',
      name: 'Variables',
      custom: 'CUSTOM_VARIABLES',
    },
    {
      kind: 'category',
      name: 'Typed Variables',
      custom: 'VARIABLE_DYNAMIC',
    },
    {
      kind: 'category',
      name: 'Development',
      contents: [
        {
          kind: 'block',
          type: 'runJS',
        },
        {
          kind: 'block',
          type: 'consoleLog',
          inputs: {
            VALUE: {
              shadow: {
                type: 'math_number',
                fields: {
                  NUM: 0,
                },
              },
            },
          },
        },
      ],
    },
    {
      kind: 'block',
      type: 'logic_compare',
    },
    {
      kind: 'block',
      type: 'logic_operation',
    },
    {
      kind: 'block',
      type: 'controls_repeat_ext',
      inputs: {
        TIMES: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: 20,
            },
          },
        },
      },
    },
    {
      kind: 'block',
      type: 'logic_operation',
    },
    {
      kind: 'block',
      type: 'logic_negate',
    },
    {
      kind: 'block',
      type: 'logic_boolean',
    },
    {
      kind: 'block',
      type: 'logic_null',
      disabled: true,
    },
    {
      kind: 'block',
      type: 'logic_ternary',
    },
    {
      kind: 'block',
      type: 'text_charAt',
      inputs: {
        VALUE: {
          block: {
            type: 'variables_get',
            fields: {
              VAR: 'text',
            },
          },
        },
      },
    },
    {
      kind: 'block',
      type: 'setProperty',
      inputs: {
        VALUE: {
          shadow: {
            type: 'math_number',
            fields: {
              NUM: 0,
            },
          },
        },
      },
    },
    {
      kind: 'block',
      type: 'getProperty',
    },
    {
      kind: 'block',
      type: 'math_number',
    },
    {
      kind: 'block',
      type: 'math_arithmetic',
    },
  ],
};

export default toolbox;
