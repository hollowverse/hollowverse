import { Fact } from '~/lib/pages/utils/types';
import {
  copyFacts,
  factsDataTransform,
} from '~/lib/pages/Celeb/getStaticProps/factsDataTransform';

test('transformation while keeping duplicates', () => {
  const copiedFacts = copyFacts(mockFacts);
  expect(factsDataTransform(mockFacts, mockOrderOfTopics)).toEqual({
    groups: {
      Religion: [copiedFacts[0]],
      'Political Party Affiliation': [copiedFacts[1], copiedFacts[3]],
      'Russia-Ukraine War': [copiedFacts[2]],
      Elections: [copiedFacts[4]],
      'Gun Control': [copiedFacts[5]],
    },
    topics: [
      'Religion',
      'Political Party Affiliation',
      'Gun Control',
      'Elections',
      'Russia-Ukraine War',
    ],
  });
});

const commonRawFactsProps: Fact = {
  date: 'a',
  dateAdded: 'a',
  source: 'string',
  forumLink: 'string',
  type: 'quote',
  context: 'string',
  quote: 'string',
  tags: [
    {
      isLowConfidence: null,
      tag: {
        name: 'string',
        topic: {
          name: 'string',
        },
      },
    },
  ],
  topics: [{ name: '' }],
};

const mockFacts: Fact[] = [
  {
    ...commonRawFactsProps,
    date: '9999-03-02',
    topics: [{ name: 'Religion' }],
  },
  {
    ...commonRawFactsProps,
    date: '2015-08-13',
    topics: [{ name: 'Political Party Affiliation' }],
  },
  {
    ...commonRawFactsProps,
    date: '2015-03-16',
    topics: [{ name: 'Russia-Ukraine War' }],
  },
  {
    ...commonRawFactsProps,
    date: '2015-03-15',
    topics: [{ name: 'Political Party Affiliation' }],
  },
  {
    ...commonRawFactsProps,
    date: '2005-04-17',
    topics: [{ name: 'Elections' }],
  },
  {
    ...commonRawFactsProps,
    date: '2005-04-16',
    topics: [
      { name: 'Gun Control' },
      { name: 'Religion' },
      { name: 'Political Party Affiliation' },
      { name: 'LGBT' },
    ],
  },
];

const mockOrderOfTopics = [
  'Religion',
  'COVID-19',
  'Political Party Affiliation',
  'Gun Control',
  'LGBT',
];
