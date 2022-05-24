import { difference, groupBy, intersection, keys } from 'lodash-es';
import { formatFactDate } from '~/lib/date';
import { Fact } from '~/lib/groq/fact.partial.groq';

export const copyFacts = (facts: Fact[]) =>
  facts.map((f) => ({
    ...f,
    date: formatFactDate(f.date),
  }));

/**
 * We have groups of Facts, keyed by their topics. I.e.
 *
 * {
 *  religion: Fact[]
 * }
 *
 * An object is not sorted. But we need the topics to be sorted because they are ranked
 * by importance. So we also have a `topics` array for that purpose.
 *
 * When we want to iterate over `groups` by importance, we usually go by the order which
 * appears in the `topics` array.
 */
export type GroupedFacts = ReturnType<typeof factsDataTransform>;

export const factsDataTransform = (_facts: Fact[], orderOfTopics: string[]) => {
  const facts = copyFacts(_facts);
  const groups = groupBy(facts, (f) => f.topics[0].name);
  const topicStrings = keys(groups);
  const intersectionArr = intersection(topicStrings, orderOfTopics);
  const differenceArr = difference(topicStrings, orderOfTopics);
  const sortedIntersection = intersectionArr.sort(
    (a, b) => orderOfTopics.indexOf(a) - orderOfTopics.indexOf(b),
  );
  const sortedDifference = differenceArr.sort();
  const sortedTopics = [...sortedIntersection, ...sortedDifference];

  return {
    groups,
    topics: sortedTopics,
  };
};
