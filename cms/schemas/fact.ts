import { LogLink } from '../components/LogLink';
import { OpenGraphImage } from '../components/OpenGraphImage';
import { isUniqueField } from '../lib/isUniqueField';
import { getForumTopicId } from '../shared/lib/getForumTopicId';

const isNotQuoteType = ({ parent }) => parent?.type !== 'quote';
const isNotFactType = ({ parent }) => parent?.type !== 'fact';
const requiredForType = (type: 'quote' | 'fact') => (Rule) =>
  Rule.custom((field, context) => {
    return context.parent.type === type && field === undefined
      ? 'This field must not be empty'
      : true;
  });

export const fact = {
  title: 'Fact',

  name: 'fact',

  type: 'document',

  fields: [
    {
      title: 'Celebrity',
      name: 'celeb',
      type: 'reference',
      to: [{ type: 'celeb' }],
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Date added',
      name: 'dateAdded',
      type: 'datetime',
      readOnly: true,
      initialValue: new Date().toISOString(),
    },

    {
      title: 'Date',
      name: 'date',
      description: 'When did this fact happen?',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Source',
      name: 'source',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Open Graph image',
      name: 'openGraphImage',
      type: 'url',
      inputComponent: OpenGraphImage,
    },

    {
      title: 'Forum link',
      name: 'forumLink',
      type: 'url',
      description: 'The link to the forum post where the Fact was submitted',
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          const topicId = getForumTopicId(value);

          if (!topicId) {
            return "This doesn't look like a valid forum link";
          }

          const isUnique = await isUniqueField(
            'fact',
            'forumLink',
            value,
            context,
          );

          if (!isUnique) {
            return 'Forum link is not unique. Use search to find out where it was used.';
          }

          if (value !== value.trim()) {
            return 'Please remove the spaces before or after the link';
          }

          return true;
        }),
    },

    {
      title: 'Type',
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Quote', value: 'quote' },
          { title: 'General', value: 'fact' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Context',
      description: 'In what context did they say that?',
      name: 'context',
      type: 'string',
      hidden: isNotQuoteType,
      validation: requiredForType('quote'),
    },

    {
      title: 'Quote',
      name: 'quote',
      type: 'text',
      hidden: isNotQuoteType,
      validation: requiredForType('quote'),
    },

    {
      title: 'Content',
      name: 'content',
      type: 'text',
      hidden: isNotFactType,
      validation: requiredForType('fact'),
    },

    {
      name: 'topics',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'topic' }],
        },
      ],
      readOnly: true,
      hidden: true,
    },

    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{ type: 'tagLink' }],
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'likes',
      type: 'number',
      hidden: true,
    },

    {
      name: 'dislikes',
      type: 'number',
      hidden: true,
    },

    {
      title: 'logs',
      name: 'show_system_logs',
      type: 'string',
      inputComponent: LogLink,
    },
  ],

  preview: {
    select: {
      title: 'celeb.name',
      type: 'type',
      content: 'content',
      quote: 'quote',
      media: 'celeb.picture',
    },
    prepare(selection) {
      const { title, type, content, quote, media } = selection;
      const preview = content || quote;

      return {
        title: `${title} (${type})`,
        subtitle: `${preview.slice(0, 40)}...`,
        media,
      };
    },
  },
};
