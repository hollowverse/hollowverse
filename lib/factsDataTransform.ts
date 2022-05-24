import { difference, groupBy, intersection, keys } from 'lodash-es';
import { formatFactDate } from '~/lib/date';
import { Fact } from '~/lib/groq/fact.partial.groq';

export const copyFacts = (facts: Fact[]) =>
  facts.map((f) => ({
    ...f,
    date: formatFactDate(f.date),
  }));

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
