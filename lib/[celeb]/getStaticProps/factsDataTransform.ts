import { groupBy, orderBy, toPairs } from 'lodash-es';
import { Fact } from '~/lib/components/types';

export const factsDataTransform = (_facts: Fact[], orderOfIssues: string[]) => {
  // Copy the Facts array
  const facts = [..._facts];

  // Group the Facts by their issues
  /*
    {
      Religion: [
        religionFact1,
        religionFact2,
        ...
      ],
      'Political Party Affiliation': [
        ppaFact1,
        ppaFact2,
        ...
      ],
      ...
    }
  */
  const groupedByIssue = groupBy(facts, 'issue');

  /*
  Pair
  [
    ['Religion', religionFactsArray],
    ['Political Party Affiliation', ppaFactsArray]
  ]
  */
  const paired = toPairs(groupedByIssue);

  // Sort entries to match the `orderOfIssues` array
  const orderedIssues = paired.sort((a, b) => {
    return orderOfIssues.indexOf(a[0]) - orderOfIssues.indexOf(b[0]);
  });

  // Sort the Facts inside entries by date. More recent Facts first
  const orderedFacts = orderedIssues.map((orderedIssue) => {
    return [orderedIssue[0], orderBy(orderedIssue[1], 'date', 'desc')];
  });

  return orderedFacts;
};
