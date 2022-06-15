export const tag = {
  title: 'Tag',

  name: 'tag',

  type: 'document',

  fields: [
    {
      title: 'Tag',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Issue',
      name: 'topic',
      description: 'What is the ideological topic that this TAG is about?',
      type: 'reference',
      to: [{ type: 'topic' }],
    },
  ],
};
