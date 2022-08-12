import { CelebTag } from '~/lib/t/tag.projection';

export const mockTags: CelebTag[] = [
  {
    isBackground: null,
    isLowConfidence: null,
    tag: {
      isVerb: true,
      _id: 'id',
      issue: { isAffiliation: true, _id: 'id', name: 'Environment' },
      name: 'Environmentalist',
    },
  },
  {
    isBackground: null,
    isLowConfidence: null,
    tag: {
      isVerb: true,
      _id: 'id',
      issue: { isAffiliation: true, _id: 'id', name: 'Environment' },
      name: 'Pro Nuclear Power',
    },
  },
  {
    isBackground: false,
    isLowConfidence: true,
    tag: {
      isVerb: true,
      _id: 'id',
      issue: { isAffiliation: true, _id: 'id', name: 'Religion' },
      name: 'Not Religious',
    },
  },
  {
    isBackground: null,
    isLowConfidence: null,
    tag: {
      isVerb: true,
      _id: 'id',
      issue: { isAffiliation: true, _id: 'id', name: 'Political Affiliation' },
      name: 'Unaffiliated',
    },
  },
  {
    isBackground: null,
    isLowConfidence: null,
    tag: {
      isVerb: true,
      _id: 'id',
      issue: { isAffiliation: true, _id: 'id', name: 'Political Affiliation' },
      name: 'Republican',
    },
  },
  {
    isBackground: null,
    isLowConfidence: null,
    tag: {
      isVerb: true,
      _id: 'id',
      issue: { isAffiliation: true, _id: 'id', name: 'Political Views' },
      name: 'Wants New Faces in Politics',
    },
  },
];
