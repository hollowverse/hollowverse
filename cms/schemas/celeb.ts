import groq from 'groq';
import { sanityClient } from '../lib/client';

const isUniqueKnowledgeGraphId = (knowledgeGraphId, context) => {
  const { document } = context;

  const id = document._id.replace(/^drafts\./, '');

  const params = {
    draft: `drafts.${id}`,
    published: id,
    knowledgeGraphId: knowledgeGraphId,
  };

  const query = groq`!defined(*[
    _type == 'celeb' &&
    !(_id in [$draft, $published]) &&
    knowledgeGraphId == $knowledgeGraphId
  ][0]._id)`;

  return sanityClient.fetch(query, params);
};

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
          const isUnique = await isUniqueKnowledgeGraphId(value, context);

          if (!isUnique) {
            return 'Knowledge Graph ID is not unique. Use search to find out where it was used.';
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
      title: 'Date of birth',
      name: 'dob',
      type: 'date',
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
