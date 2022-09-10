export const position = {
  title: 'Position',

  type: 'document',

  name: 'position',

  fields: [
    {
      title: 'Public Figure',
      name: 'celeb',
      type: 'reference',
      to: [{ type: 'celeb' }],
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Issue name',
      name: 'issue',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Stance',
      name: 'stance',
      type: 'string',
    },

    {
      title: 'Summary',
      name: 'summary',
      type: 'string',
    },
  ],

  preview: {
    select: {
      title: 'celeb.name',
      issue: 'issue',
      stance: 'stance',
      summary: 'summary',
      media: 'celeb.picture',
    },
    prepare(selection) {
      const { title, issue, stance, summary, media } = selection;
      const preview = `${stance ? `${stance}: ` : ''}${summary}`;

      return {
        title: `${title} (${issue})`,
        subtitle: `${preview.slice(0, 40)}...`,
        media,
      };
    },
  },
};
