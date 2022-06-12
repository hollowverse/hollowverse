export const orderOfTopics = {
  title: 'Order of topics',

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
