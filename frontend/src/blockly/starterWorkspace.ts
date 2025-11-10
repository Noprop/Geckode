const starterWorkspace = {
  blocks: {
    languageVersion: 0,
    blocks: [
      {
        type: 'onStart',
        id: 'starter_on_start',
        x: 38,
        y: 38,
        inputs: {
          INNER: {
            block: {
              type: 'setProperty',
              id: 'starter_set_property',
              fields: {
                PROPERTY: 'X',
              },
              inputs: {
                VALUE: {
                  block: {
                    type: 'math_number',
                    id: 'starter_math_number',
                    fields: {
                      NUM: 0,
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
};

export default starterWorkspace;
