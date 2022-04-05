import { orderBy } from 'lodash-es';
import { Fact, RawFact } from '~/lib/components/types';
import { factsDataTransform } from '~/lib/[celeb]/getStaticProps/factsDataTransform';

test('transformation', () => {
  expect(factsDataTransform(mockFacts, mockOrderOfTopics)).toEqual(
    // prettier-ignore
    {
      facts: [...mockFacts],
      topics: [
        ['Religion', [0, 5]],
        ['Political Party Affiliation', [1, 3, 5]],
        ['Gun Control', [5]],
        ['Elections', [4]],
        ['Russia-Ukraine War', [2]],
      ]
    },
  );
});

const commonRawFactsProps: RawFact = {
  date: 'a',
  dateAdded: 'a',
  source: 'string',
  forumLink: 'string',
  type: 'quote',
  topics: [{ name: '' }],
};

const mockFacts: RawFact[] = [
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
      { name: 'Religion' },
      { name: 'Political Party Affiliation' },
      { name: 'Gun Control' },
    ],
  },
];

const mockOrderOfTopics = [
  'Religion',
  'COVID-19',
  'Political Party Affiliation',
  'Gun Control',
];
