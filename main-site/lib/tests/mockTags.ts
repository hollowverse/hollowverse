import { Tag } from '~/lib/groq/fact.projection';

export const mockTags: Tag[] = [
  {
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
