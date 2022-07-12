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
      description: 'What is the ideological issue that this TAG is about?',
      type: 'reference',
      to: [{ type: 'topic' }],
    },

    {
      title: 'This tag is a verb',
      name: 'isVerb',
      type: 'boolean',
      description: `A verb tag will be used as "Elon Musk [tag name]", eg. "Elon Musk Criticizes Biden" rather than "Elon Musk is [tag name]", eg. "Elon Musk is Against Bailouts"`,
      validation: (Rule) => Rule.required(),
    },
  ],
};
