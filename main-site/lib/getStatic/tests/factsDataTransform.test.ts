import { Fact } from '~/lib/groq/fact.projection';
import {
  copyFacts,
  factsDataTransform,
} from '~/lib/getStatic/factsDataTransform';
import { mockOrderOfIssues } from '~/lib/getStatic/tests/mockOrderOfIssues';

test('transformation while keeping duplicates', () => {
  const copiedFacts = copyFacts(mockFacts);
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
        issue: {
          name: 'string',
        },
      },
    },
  ],
  issues: [{ name: '' }],
};

const mockFacts: Fact[] = [
  {
    ...commonRawFactsProps,
    date: '9999-03-02',
    issues: [{ name: 'Religion' }],
  },
  {
    ...commonRawFactsProps,
    date: '2015-08-13',
    issues: [{ name: 'Political Party Affiliation' }],
  },
  {
    ...commonRawFactsProps,
    date: '2015-03-16',
    issues: [{ name: 'Russia-Ukraine War' }],
  },
  {
    ...commonRawFactsProps,
    date: '2015-03-15',
    issues: [{ name: 'Political Party Affiliation' }],
  },
  {
    ...commonRawFactsProps,
    date: '2005-04-17',
    issues: [{ name: 'Elections' }],
  },
  {
    ...commonRawFactsProps,
    date: '2005-04-16',
    issues: [
      { name: 'Gun Control' },
      { name: 'Religion' },
      { name: 'Political Party Affiliation' },
      { name: 'LGBT' },
    ],
  },
];
