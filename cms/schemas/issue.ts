export const issue = {
  title: 'Issue',

  name: 'topic',

  type: 'document',

  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'This issue is an Affiliation',
      name: 'isAffiliation',
      type: 'boolean',
      description: `If checked, the issue will be referred to as "Elon Musk's [issue name]", eg. "Elon Musk's Political Affiliation" rather than "Elon Musk's views on [issue name]", eg. "Elon Musk's views on Political Affiliation".`,
      validation: (Rule) => Rule.required(),
    },
  ],
};
