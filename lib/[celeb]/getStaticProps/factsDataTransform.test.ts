import { Fact } from '~/lib/components/types';
import { factsDataTransform } from '~/lib/[celeb]/getStaticProps/factsDataTransform';

test('transformation', () => {
  expect(factsDataTransform(mockFacts as Fact[], mockOrderOfTopics)).toEqual(
    // prettier-ignore
    [
      [
        mockFacts[2].topic,
        [
          mockFacts[3],
          mockFacts[2],
        ]
      ],

      [
        mockFacts[0].topic,
        [
          mockFacts[1],
          mockFacts[0],
        ]
      ],
    ],
  );
});

const mockFacts = [
  { content: 'a', date: '2015-03-15', topic: 'Political Party Affiliation' },
  { content: 'b', date: '2015-08-13', topic: 'Political Party Affiliation' },
  { content: 'c', date: '0000-03-02', topic: 'Religion' },
  { content: 'd', date: '2005-04-16', topic: 'Religion' },
];

const mockOrderOfTopics = [
  'Religion',
  'Political Party Affiliation',
  'Gun Control',
];
