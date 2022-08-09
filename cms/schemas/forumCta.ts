export const forumCta = {
  title: 'Forum CTA',

  name: 'forum-cta',

  type: 'document',

  fields: [
    {
      title: 'Message',
      name: 'message',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
};
