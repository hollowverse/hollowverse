import { isUniqueField } from '../lib/isUniqueField';
import { getForumTopicId } from '../shared/lib/getForumTopicId';

export const celeb = {
  title: 'Celebrity',

  name: 'celeb',

  type: 'document',

  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Picture',
      name: 'picture',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Knowledge Graph ID',
      name: 'knowledgeGraphId',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          const isUnique = await isUniqueField(
            'celeb',
            'knowledgeGraphId',
            value,
            context,
          );

          if (!isUnique) {
            return 'Knowledge Graph ID is not unique. Use search to find out where it was used.';
          }

          if (value !== value.trim()) {
            return 'Please remove the spaces before or after the ID';
          }

          return true;
        }),
    },

    {
      title: 'Pronoun',
      name: 'pronoun',
      type: 'string',
      options: {
        list: [
          { title: 'He', value: 'he' },
          { title: 'She', value: 'she' },
          { title: 'They', value: 'they' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.required(),
    },

    {
      title: 'Forum wiki link',
      name: 'wiki',
      type: 'url',
      description: 'The link to the forum wiki',
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          const topicId = getForumTopicId(value);

          if (!topicId) {
            return "This doesn't look like a valid forum link";
          }

          const isUnique = await isUniqueField('celeb', 'wiki', value, context);

          if (!isUnique) {
            return 'Wiki link is not unique. Use search to find out where it was used.';
          }

          if (value !== value.trim()) {
            return 'Please remove the spaces before or after the link';
          }

          return true;
        }),
    },

    {
      title: 'Date of birth',
      name: 'dob',
      type: 'date',
    },

    {
      title: 'Date of death',
      name: 'dod',
      type: 'date',
    },

    {
      title: 'Contributor ID',
      name: 'contributorId',
      type: 'number',
    },

    {
      title: 'Old content',
      name: 'oldContent',
      type: 'text',
    },

    {
      title: 'Wikipedia ID',
      name: 'wikipediaId',
      type: 'string',
      readOnly: true,
      hidden: true,
    },
  ],
};
