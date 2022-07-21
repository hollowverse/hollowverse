import { difference, groupBy, intersection, keys } from 'lodash-es';
import { getFactIssue } from '~/lib/getFactIssue';
import { Fact } from '~/lib/groq/fact.projection';
import { sortByArray } from '~/lib/sortByArray';

/**
 * We have groups of Facts, keyed by their issues. I.e.
 *
 * {
 *  religion: Fact[]
 * }
 *
 * An object is not sorted. But we need the issues to be sorted because they are ranked
 * by importance. So we also have a `issues` array for that purpose.
 *
 * When we want to iterate over `groups` by importance, we usually go by the order which
 * appears in the `issues` array.
 */
export type GroupedFacts = ReturnType<typeof factsDataTransform>;

export const factsDataTransform = (_facts: Fact[], orderOfIssues: string[]) => {
  const facts = [..._facts];
  const groups = groupBy(facts, (f) => getFactIssue(f).name);
  const issueStrings = keys(groups);
  const intersectionArr = intersection(issueStrings, orderOfIssues);
  const differenceArr = difference(issueStrings, orderOfIssues);

  sortByArray(intersectionArr, orderOfIssues, (i) => i);
  differenceArr.sort();

  const sortedIssues = [...intersectionArr, ...differenceArr];

  return {
    groups,
    issues: sortedIssues,
  };
};
