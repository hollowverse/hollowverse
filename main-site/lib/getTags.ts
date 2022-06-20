import { getYear } from 'date-fns';
import {
  differenceWith,
  filter,
  first,
  flatten,
  groupBy,
  isEmpty,
  last,
  mapValues,
  pullAt,
  reverse,
  sortBy,
  toPairs,
  uniqBy,
} from 'lodash-es';
import { parseDate } from '~/lib/date';
import { Fact, Tag } from '~/lib/groq/fact.partial.groq';
import { OrderOfIssues } from '~/lib/groq/orderOfIssues.groq';

export function sortTags(tags: Tag[], orderOfIssues: OrderOfIssues) {
  const noDupes = uniqBy(
    tags,
    (t) => `${t.tag.name}-is-low-confidence-${t.isLowConfidence}`,
  );

  // Remove lowConfidence tags if a regular one exists
  const noUnnecessaryLowConfidence = noDupes.filter((t) => {
    if (!t.isLowConfidence) {
      return true;
    }

    const regularExists = noDupes.some((t2) => {
      return t2.tag.name === t.tag.name && !t2.isLowConfidence;
    });

    if (regularExists) {
      return false;
    }

    return true;
  });

  const diff = differenceWith(
    noUnnecessaryLowConfidence,
    orderOfIssues,
    (t, i) => t.tag.issue.name === i,
  );

  const intersection = filter(noUnnecessaryLowConfidence, (t) => {
    return orderOfIssues.includes(t.tag.issue.name);
  });

  intersection.sort(function (a, b) {
    return (
      orderOfIssues.indexOf(a.tag.issue.name) -
      orderOfIssues.indexOf(b.tag.issue.name)
    );
  });

  return [...intersection, ...diff];
}

type TagPair = [string, Tag[]];

export function rollUp(tagPairs: TagPair[]) {
  const pending: TagPair[] = [];

  for (let i = tagPairs.length - 1; i >= 0; i--) {
    const tagPair = tagPairs[i];
    const [title, tags] = tagPair;

    if (!isEmpty(pending)) {
      const preNewTitle = `${title}-${pending[0][0]}`.split('-');
      const newTitle = `${first(preNewTitle)}-${last(preNewTitle)}`;
      tagPair[0] = newTitle;
      tagPair[1] = [...tags, ...pending[0][1]];
      pending.length = 0;
    }

    if (tagPair[1].length < 5 && i !== 0) {
      pending.push(tagPair);
      pullAt(tagPairs, i);
    }
  }

  return tagPairs;
}

export function getTags(facts: Fact[], orderOfIssues: OrderOfIssues) {
  const factsByYear = groupBy(facts, (f) => {
    return getYear(parseDate(f.date));
  });
  const tagsByYearObj = mapValues(factsByYear, (facts) => {
    return flatten(facts.map((f) => f.tags));
  });

  const tagsByYearUnsorted = toPairs(tagsByYearObj);
  const tagsByYear = reverse(sortBy(tagsByYearUnsorted, (pair) => pair[0]));

  rollUp(tagsByYear);

  const withSortedTagClouds = tagsByYear.map((tby) => {
    return [tby[0], sortTags(tby[1], orderOfIssues)] as TagPair;
  });

  return withSortedTagClouds;
}
