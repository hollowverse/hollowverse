export const vote = {
  title: 'Vote',

  type: 'object',

  name: 'vote',

  fields: [
    {
      title: 'Fact ID',
      name: 'factId',
      type: 'string',
      readOnly: true,
    },
    {
      title: 'Choice',
      name: 'choice',
      type: 'string',
      readOnly: true,
    },
  ],
};
