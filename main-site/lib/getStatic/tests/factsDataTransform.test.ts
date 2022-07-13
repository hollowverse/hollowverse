import { factsDataTransform } from '~/lib/getStatic/helpers/factsDataTransform';
import { mockOrderOfIssues } from '~/lib/getStatic/tests/mockOrderOfIssues';
import { Fact } from '~/lib/groq/fact.projection';

test('transformation while keeping duplicates', () => {
  const copiedFacts = [...mockFacts];
  expect(factsDataTransform(mockFacts, mockOrderOfIssues)).toEqual({
    groups: {
      Religion: [copiedFacts[0]],
      'Political Party Affiliation': [copiedFacts[1], copiedFacts[3]],
      'Russia-Ukraine War': [copiedFacts[2]],
      Elections: [copiedFacts[4]],
      'Gun Control': [copiedFacts[5]],
    },
    issues: [
      'Religion',
      'Political Party Affiliation',
      'Gun Control',
      'Elections',
      'Russia-Ukraine War',
    ],
  });
});

const commonRawFactsProps: Fact = {
  _id: 'a',
  date: 'a',
  source: 'string',
  forumLink: 'string',
  type: 'quote',
  context: 'string',
  quote: 'string',
  tags: [
    {
      isBackground: null,
      isLowConfidence: null,
      tag: {
        _id: 'string',
        name: 'string',
        issue: { isAffiliation: true, _id: 'id', name: 'string' },
        isVerb: true,
      },
    },
  ],
  issues: [{ _id: 'id', isAffiliation: true, name: '' }],
};

const mockFacts: Fact[] = [
  {
    ...commonRawFactsProps,
    date: '9999-03-02',
    issues: [{ _id: 'id', isAffiliation: true, name: 'Religion' }],
  },
  {
    ...commonRawFactsProps,
    date: '2015-08-13',
    issues: [
      { _id: 'id', isAffiliation: true, name: 'Political Party Affiliation' },
    ],
  },
  {
    ...commonRawFactsProps,
    date: '2015-03-16',
    issues: [{ _id: 'id', isAffiliation: true, name: 'Russia-Ukraine War' }],
  },
  {
    ...commonRawFactsProps,
    date: '2015-03-15',
    issues: [
      { _id: 'id', isAffiliation: true, name: 'Political Party Affiliation' },
    ],
  },
  {
    ...commonRawFactsProps,
    date: '2005-04-17',
    issues: [{ _id: 'id', isAffiliation: true, name: 'Elections' }],
  },
  {
    ...commonRawFactsProps,
    date: '2005-04-16',
    issues: [
      { _id: 'id', isAffiliation: true, name: 'Gun Control' },
      { _id: 'id', isAffiliation: true, name: 'Religion' },
      { _id: 'id', isAffiliation: true, name: 'Political Party Affiliation' },
      { _id: 'id', isAffiliation: true, name: 'LGBT' },
    ],
  },
];
