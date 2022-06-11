import { isString } from 'lodash-es';
import { sanityClient } from '../lib/client';
import { getForumTopicId } from '../lib/getForumTopicId';

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
      title: 'Forum link',
      name: 'forumLink',
      type: 'url',
      description: 'The link to the forum post where the Fact was submitted',
      validation: (Rule) =>
        Rule.required().custom(async (field, context) => {
          const topicId = getForumTopicId(field);

          if (!topicId) {
            return "This doesn't look like a valid forum link";
          }

          const response = await sanityClient.fetch(
            `*[
              _type == 'fact' &&
              forumLink == $forumLink
            ][0]{_id}`,
            { forumLink: field },
          );

          if (
            response &&
            response._id &&
            context.parent._id &&
            response._id !== context.parent._id &&
            `drafts.${response._id}` !== context.parent._id
          ) {
            return `This field has to be unique. But you used this value before. Use Search to find out where.`;
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
      title: 'Topics',
      name: 'topics',
      type: 'array',
      description: 'What is the ideological topic that this FACT is about?',
      of: [
        {
          type: 'reference',
          to: [{ type: 'topic' }],
        },
      ],
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [{ type: 'tagLink' }],
      validation: (Rule) => Rule.required(),
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
