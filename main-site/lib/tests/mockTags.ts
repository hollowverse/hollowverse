import { Tag } from '~/lib/groq/tag.projection';

export const mockTags: Tag[] = [
  {
    isBackground: null,
    isLowConfidence: null,
    tag: {
      _id: 'id',
      issue: {
        name: 'Environment',
      },
      name: 'Environmentalist',
    },
  },
  {
    isBackground: null,
    isLowConfidence: null,
    tag: {
      _id: 'id',
      issue: {
        name: 'Environment',
      },
      name: 'Pro Nuclear Power',
    },
  },
  {
    isBackground: false,
    isLowConfidence: true,
    tag: {
      _id: 'id',
      issue: {
        name: 'Religion',
      },
      name: 'Not Religious',
    },
  },
  {
    isBackground: null,
    isLowConfidence: null,
    tag: {
      _id: 'id',
      issue: {
        name: 'Political Affiliation',
      },
      name: 'Unaffiliated',
    },
  },
  {
    isBackground: null,
    isLowConfidence: null,
    tag: {
      _id: 'id',
      issue: {
        name: 'Political Affiliation',
      },
      name: 'Republican',
    },
  },
  {
    isBackground: null,
    isLowConfidence: null,
    tag: {
      _id: 'id',
      issue: {
        name: 'Political Views',
      },
      name: 'Wants New Faces in Politics',
    },
  },
];
