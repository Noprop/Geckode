// This is temporary and should be pulled from the database to be synced with the frontend
const customBlocks = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
    type: "keyPressed",
    tooltip: "return \"true\" if a specific key is pressed ",
    helpUrl: "",
    message0: "key %1 pressed %2",
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
        type: "input_dummy",
        name: "DUMMY"
      }
    ],
    output: "Boolean",
  },
  {
    type: "setProperty",
    tooltip: "Set the property of a sprite",
    helpUrl: "",
    message0: "set %1 to %2",
    args0: [
      {
        type: "field_dropdown",
        name: "PROPERTY",
        options: [
          [
            "x",
            "X"
          ],
          [
            "y",
            "Y"
          ],
          [
            "velocityX",
            "VelocityX"
          ],
          [
            "velocityY",
            "VelocityY"
          ]
        ]
      },
      {
        type: "input_value",
        name: "VALUE"
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "createSprite",
    tooltip: "Create a sprite on the canvas",
    helpUrl: "",
    message0: "create sprite %1 using %2 at x %3 y %4",
    args0: [
      {
        type: "field_input",
        name: "NAME",
        text: "sprite1",
      },
      {
        type: "field_dropdown",
        name: "TEXTURE",
        options: [
          ["Star", "star"],
        ],
      },
      {
        type: "field_number",
        name: "X",
        value: 0,
      },
      {
        type: "field_number",
        name: "Y",
        value: 0,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "%{BKY_SPRITES_HUE}",
  },
  {
    type: "changeProperty",
    tooltip: "Change the property of a sprite by a certain amount",
    helpUrl: "",
    message0: "change %1 by %2",
    args0: [
      {
        type: "field_dropdown",
        name: "PROPERTY",
        options: [
          [
            "x",
            "x"
          ],
          [
            "y",
            "y"
          ],
          [
            "velocityX",
            "velocity.x"
          ],
          [
            "velocityY",
            "velocity.y"
          ]
        ]
      },
      {
        type: "input_value",
        name: "VALUE"
      }
    ],
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "getProperty",
    tooltip: "Get the property of a sprite",
    helpUrl: "",
    message0: "%1 %2",
    args0: [
      {
        type: "field_dropdown",
        name: "PROPERTY",
        options: [
          [
            "x",
            "x"
          ],
          [
            "y",
            "y"
          ],
          [
            "velocityX",
            "velocity.x"
          ],
          [
            "velocityY",
            "velocity.y"
          ]
        ]
      },
      {
        type: "input_dummy",
        name: "DUMMY"
      }
    ],
    output: null,
  }
];

module.exports = { customBlocks };