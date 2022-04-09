import { format, parse } from 'date-fns';
import { difference, flatten, intersection, reduce, uniq } from 'lodash-es';
import { OrderedFacts, Fact } from '~/lib/components/types';

export const copyFacts = (facts: Fact[]) =>
  facts.map((f) => ({
    ...f,
    date: format(parse(f.date, 'yyyy-MM-dd', new Date()), 'd LLL yyyy'),
  }));

export const factsDataTransform = (
  _facts: Fact[],
  orderOfTopics: string[],
  options: { removeDuplicates: boolean } = { removeDuplicates: false },
) => {
  // Copy the Facts array, and rewrite certain keys
  // THIS ARRAY IS EXPECTED TO BE ALREADY SORTED BY DATE
  const facts = copyFacts(_facts);

  /*
  Facts array looks something like this
  [
    {
      content: 'a',
      source: 'b',
      tags: [
        {
          isLowConfidence: undefined,
          tag: {
            name: 'Catholic',
            topic: {
              name: 'Religion'
            }
          }
        }
      ],
      topics: [
        { name: 'Religion' },
        { name: 'Elections' }
      ]
    },
    ...
  ]

  We want to transform the above array to the following structure
  {
    facts: [fact1, fact2, fact3],
    topics: [
      [
        topic,
        [0, 3]
      ],
      [
        topic2,
        [2, 0]
      ]
    ]
  }

  The goal here is to allow the UI to easily iterate over topics according to the `orderOfTopics`
  array. The first key above is `facts` which simply contains all the returned Facts. The second
  key is `topics`, which is an array of tuples. The tuples are ordered by the first item,
  according to the `orderOfTopics`. The second item in the tuple is the indexes of the Facts
  that belong to that topic. The Facts are ordered chronologically.
  */

  // Next let's get all the topics from the Facts
  const topicStrings = facts.map((f) => f.topics.map((t) => t.name));

  /*
  The above returns something like this

   [
      [ 'Religion' ],
      [ 'Political Party Affiliation' ],
      [ 'Religion', 'Political Party Affiliation', 'Gun Control' ]
    ]

  We need to flatten it, and remove duplicates.
  */
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

  /*
  At this point `sortedTopics` is a good list of topics sorted correctly.

  We need to change it into tuples as such:

  [
    [topic, indexesOfFactsInThisTopic],
    ...
  ]

  So we map over the sorted topics to return the tuples
  */
  const previousIndexes: number[] = [];
  const topics = reduce(
    sortedTopics,
    (topicsWithPotentiallyEmptyFacts, sortedTopic) => {
      const topicFactIndexes = reduce(
        facts,
        (topicFactIndexes, fact, index) => {
          const isRelevant = fact.topics.some(
            (factTopic) => factTopic.name === sortedTopic,
          );

          if (
            !isRelevant ||
            (options.removeDuplicates && previousIndexes.includes(index))
          ) {
            return topicFactIndexes;
          }

          previousIndexes.push(index);
          topicFactIndexes.push(index);

          return topicFactIndexes;
        },
        [] as number[],
      );

      if (topicFactIndexes.length === 0) {
        return topicsWithPotentiallyEmptyFacts;
      }

      topicsWithPotentiallyEmptyFacts.push([sortedTopic, topicFactIndexes]);

      return topicsWithPotentiallyEmptyFacts;
    },
    [] as [string, number[]][],
  );

  return {
    facts,
    topics,
  } as any as OrderedFacts;
};
