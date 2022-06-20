import { Tag } from '~/lib/groq/tag.projection';

export const mockTags: Tag[] = [
  {
    _id: 'id',
    isBackground: null,
    isLowConfidence: null,
    tag: {
      issue: {
        name: 'Environment',
      },
      name: 'Environmentalist',
    },
  },
  {
    _id: 'id',
    isBackground: null,
    isLowConfidence: null,
    tag: {
      issue: {
        name: 'Environment',
      },
      name: 'Pro Nuclear Power',
    },
  },
  {
    _id: 'id',
    isBackground: false,
    isLowConfidence: true,
    tag: {
      issue: {
        name: 'Religion',
      },
      name: 'Not Religious',
    },
  },
  {
    _id: 'id',
    isBackground: null,
    isLowConfidence: null,
    tag: {
      issue: {
        name: 'Political Affiliation',
      },
      name: 'Unaffiliated',
    },
  },
  {
    _id: 'id',
    isBackground: null,
    isLowConfidence: null,
    tag: {
      issue: {
        name: 'Political Affiliation',
      },
      name: 'Republican',
    },
  },
  {
    _id: 'id',
    isBackground: null,
    isLowConfidence: null,
    tag: {
      issue: {
        name: 'Political Views',
      },
      name: 'Wants New Faces in Politics',
    },
  },
];
