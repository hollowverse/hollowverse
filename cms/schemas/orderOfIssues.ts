export const orderOfIssues = {
  title: 'Order of issues',

  name: 'orderOfTopics',

  type: 'document',

  fields: [
    {
      name: 'topics',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'topic' }],
        },
      ],
    },
  ],
};
