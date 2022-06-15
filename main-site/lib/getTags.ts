import { getYear } from 'date-fns';
import {
  flatten,
  groupBy,
  mapValues,
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

  noUnnecessaryLowConfidence.sort((a, b) => {
    const index1 = orderOfIssues.indexOf(a.tag.issue.name);
    const index2 = orderOfIssues.indexOf(b.tag.issue.name);

    return (
      (index1 > -1 ? index1 : Infinity) - (index2 > -1 ? index2 : Infinity)
    );
  });

  return noUnnecessaryLowConfidence;
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
  const withSortedTagClouds = tagsByYear.map((tby) => {
    return [tby[0], sortTags(tby[1], orderOfIssues)];
  });

  console.log('tagsByYear', JSON.stringify(withSortedTagClouds, null, 2));
}
