export const user = {
  title: 'User',

  name: 'user',

  type: 'document',

  fields: [
    {
      title: 'Vote',
      name: 'votes',
      type: 'array',
      of: [
        {
          type: 'vote',
        },
      ],
      readOnly: true,
    },
  ],

  preview: {
    select: {
      title: '_id',
      votes: 'votes',
    },
    prepare(selection) {
      const { title, votes } = selection;

      return {
        title,
        subtitle: `Total votes: ${votes.length}`,
      };
    },
  },
};
