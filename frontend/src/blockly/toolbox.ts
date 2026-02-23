import { useGeckodeStore } from '@/stores/geckodeStore';
import { Dir } from 'fs';

const getToolbox = () => {
  const spriteId = useGeckodeStore.getState().getCurrentSpriteId() ?? '';

  return {
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
          // Movement section
          {
            kind: 'label',
            text: 'Movement',
          },
          {
            kind: 'block',
            type: 'goToXY',
            inputs: {
              SPRITE: {
                shadow: {
                  type: 'spriteGhost',
                  fields: {
                    SPRITE: spriteId,
                  },
                },
              },
              x: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 0,
                  },
                },
              },
              y: {
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
            type: 'setProperty',
            inputs: {
              SPRITE: {
                shadow: {
                  type: 'spriteGhost',
                  fields: {
                    SPRITE: spriteId,
                  },
                },
              },
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
              SPRITE: {
                shadow: {
                  type: 'spriteGhost',
                  fields: {
                    SPRITE: spriteId,
                  },
                },
              },
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
            inputs: {
              SPRITE: {
                shadow: {
                  type: 'spriteGhost',
                  fields: {
                    SPRITE: spriteId,
                  },
                },
              },
            },
          },
          {
            kind: 'block',
            type: 'moveWithArrows',
            inputs: {
              SPRITE: {
                shadow: {
                  type: 'spriteGhost',
                  fields: {
                    SPRITE: spriteId,
                  },
                },
              },
              VX: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 100,
                  },
                },
              },
              VY: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 100,
                  },
                },
              },
            },
          },
          // Direction section
          {
            kind: 'label',
            text: 'Direction',
          },
          {
            kind: 'block',
            type: 'setRotation',
            inputs: {
              SPRITE: {
                shadow: {
                  type: 'spriteGhost',
                  fields: {
                    SPRITE: spriteId,
                  },
                },
              },
              VALUE: {
                shadow: {
                  type: 'angleGhost',
                },
              },
            },
          },
          {
            kind: 'block',
            type: 'pointAtXY',
            inputs: {
              SPRITE: {
                shadow: {
                  type: 'spriteGhost',
                  fields: {
                    SPRITE: spriteId,
                  },
                },
              },
              x: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 0,
                  },
                },
              },
              y: {
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
            type: 'getRotation',
            inputs: {
              SPRITE: {
                shadow: {
                  type: 'spriteGhost',
                  fields: {
                    SPRITE: spriteId,
                  },
                },
              },
            },
          },
          {
            kind: 'block',
            type: 'setVelocityInDir',
            inputs: {
              SPRITE: {
                shadow: {
                  type: 'spriteGhost',
                  fields: {
                    SPRITE: spriteId,
                  },
                },
              },
              VALUE: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 100,
                  },
                },
              },
              DIRECTION: {
                shadow: {
                  type: 'angleGhost',
                },
              },
            },
          },
          {
            kind: 'block',
            type: 'movementDirection',
            inputs: {
              SPRITE: {
                shadow: {
                  type: 'spriteGhost',
                  fields: {
                    SPRITE: spriteId,
                  },
                },
              },
            },
          },
          // Collision section
          {
            kind: 'label',
            text: 'Collision',
          },
          {
            kind: 'block',
            type: 'isTouching',
            inputs: {
              SPRITE1: {
                shadow: {
                  type: 'spriteGhost',
                  fields: {
                    SPRITE: spriteId,
                  },
                },
              },
              SPRITE2: {
                shadow: {
                  type: 'spriteGhost',
                  fields: {
                    SPRITE: spriteId,
                  },
                },
              },
            },
          },
          {
            kind: 'block',
            type: 'isTouchingSolid',
            inputs: {
              SPRITE: {
                shadow: {
                  type: 'spriteGhost',
                  fields: {
                    SPRITE: spriteId,
                  },
                },
              },
            },
          },
          // Cloning section
          {
            kind: 'label',
            text: 'Cloning',
          },
          {
            kind: 'block',
            type: 'variables_set',
            fields: {
              VAR: { name: 'clone' },
            },
            inputs: {
              VALUE: {
                block: {
                  type: 'makeClone',
                  inputs: {
                    SPRITE: {
                      shadow: {
                        type: 'spriteGhost',
                        fields: {
                          SPRITE: spriteId,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
      {
        kind: 'category',
        name: 'Input',
        contents: [
          {
            kind: 'block',
            type: 'onKey',
          },
          {
            kind: 'block',
            type: 'keyPressed',
            fields: {
              PRESSED_TYPE: 'pressed',
            },
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
        name: 'Camera',
        contents: [
          {
            kind: 'block',
            type: 'cameraToXY',
            inputs: {
              x: {
                shadow: {
                  type: 'math_number',
                  fields: {
                    NUM: 0,
                  },
                },
              },
              y: {
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
            type: 'resetCamera',
          },
        ]
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
};

export default getToolbox;
