import { groupBy, orderBy, toPairs } from 'lodash-es';
import { Fact } from '~/lib/components/types';

export const factsDataTransform = (_facts: Fact[], orderOfTopics: string[]) => {
  // Copy the Facts array
  const facts = [..._facts];

  // Group the Facts by their topics
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
  const groupedByTopic = groupBy(facts, 'topic');

  /*
  Pair
  [
    ['Religion', religionFactsArray],
    ['Political Party Affiliation', ppaFactsArray]
  ]
  */
  const paired = toPairs(groupedByTopic);

  // Sort entries to match the `orderOfTopics` array
  const orderedTopics = paired.sort((a, b) => {
    return orderOfTopics.indexOf(a[0]) - orderOfTopics.indexOf(b[0]);
  });

  // Sort the Facts inside entries by date. More recent Facts first
  const orderedFacts = orderedTopics.map((orderedTopic) => {
    return [orderedTopic[0], orderBy(orderedTopic[1], 'date', 'desc')];
  });

  return orderedFacts;
};
