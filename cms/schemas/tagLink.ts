export const tagLink = {
  title: 'Tag',

  type: 'object',

  name: 'tagLink',

  fields: [
    {
      description: 'How confident are we?',
      title: 'Maybe/possibly',
      name: 'isLowConfidence',
      type: 'boolean',
    },
    {
      description: "This tag is about the celebrity's upbringing or background",
      title: 'Background',
      name: 'isBackground',
      type: 'boolean',
    },
    {
      title: 'Tag',
      name: 'tag',
      type: 'reference',
      to: [{ type: 'tag' }],
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      tagName: 'tag.name',
      isLowConfidence: 'isLowConfidence',
    },
    prepare(selection) {
      const { tagName, isLowConfidence } = selection;

      return {
        title: `${tagName}${isLowConfidence ? ' (Low confidence)' : ''}`,
      };
    },
  },
};
