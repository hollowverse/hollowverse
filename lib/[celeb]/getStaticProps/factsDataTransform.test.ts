import { Fact } from '~/lib/components/types';
import { factsDataTransform } from '~/lib/[celeb]/getStaticProps/factsDataTransform';

test('transformation', () => {
  expect(factsDataTransform(mockFacts as Fact[], mockOrderOfIssues)).toEqual(
    // prettier-ignore
    [
      [
        mockFacts[2].issue,
        [
          mockFacts[3],
          mockFacts[2],
        ]
      ],

      [
        mockFacts[0].issue,
        [
          mockFacts[1],
          mockFacts[0],
        ]
      ],
    ],
  );
});

const mockFacts = [
  { content: 'a', date: '2015-03-15', issue: 'Political Party Affiliation' },
  { content: 'b', date: '2015-08-13', issue: 'Political Party Affiliation' },
  { content: 'c', date: '0000-03-02', issue: 'Religion' },
  { content: 'd', date: '2005-04-16', issue: 'Religion' },
];

const mockOrderOfIssues = [
  'Religion',
  'Political Party Affiliation',
  'Gun Control',
];
