import { format, parse } from 'date-fns';
import {
  difference,
  flatten,
  groupBy,
  intersection,
  reduce,
  uniq,
} from 'lodash-es';
import { OrderedFacts, RawFact } from '~/lib/components/types';

export const copyFacts = (facts: RawFact[]) =>
  facts.map((f) => ({
    ...f,
    date: format(parse(f.date, 'yyyy-MM-dd', new Date()), 'd LLL yyyy'),
  }));

export const factsDataTransform = (
  _facts: RawFact[],
  orderOfTopics: string[],
) => {
  // Copy the Facts array, and rewrite certain keys
  // THIS ARRAY IS EXPECTED TO BE ALREADY SORTED BY DATE
  const facts = copyFacts(_facts);

  // Next let's get all the topics from the Facts
  const topicStrings = facts.map((f) => f.topics.map((t) => t.name));
  const uniqTopics = uniq(flatten(topicStrings));

  /*
  Now we want to get only the topics that appear in the
  `orderOfTopics` array because these will mirror the order
  of that array.
  */
  const intersectionWithOrderOfTopicsList = intersection(
    uniqTopics,
    orderOfTopics,
  );

  /*
  Then we need to get the topics which are NOT in the `orderOfTopics`
  array because these will be sorted alphabetically
  */
  const differenceWithOrderOfTopicsList = difference(uniqTopics, orderOfTopics);

  // Sort as explained above
  const sortedIntersectionWithOot = intersectionWithOrderOfTopicsList.sort(
    (a, b) => {
      return orderOfTopics.indexOf(a) - orderOfTopics.indexOf(b);
    },
  );

  // Sort as explained above
  const sortedDifferenceWithOot = differenceWithOrderOfTopicsList.sort();

  // Concatenate
  const sortedTopics = [
    ...sortedIntersectionWithOot,
    ...sortedDifferenceWithOot,
  ];

  const groupedFacts = groupBy(facts, (f) => f.topics[0].name);

  return {
    facts: groupedFacts,
    topics: sortedTopics,
  } as any as OrderedFacts;
};
