import { getYear } from 'date-fns';
import {
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
} from 'lodash-es';
import { parseDate } from '~/lib/date';
import { sortTags } from '~/lib/getStatic/helpers/sortTags';
import { Fact } from '~/lib/groq/fact.projection';
import { OrderOfIssues } from '~/lib/groq/orderOfIssues.projection';
import { Tag } from '~/lib/groq/tag.projection';

export type TagPair = [string, Tag[]];
export type TagTimeline = TagPair[];

/**
group the tags by the year. then sort by the most recent years first. but the
problem is, it doesn't look very good when we have a bunch of years, with each
one having just one tag.

so here's how i solved that problem:

starting from the oldest year (i.e. from the bottom), if there are less than 5
facts in that year, roll those up with the next year (so instead of a single
year now, we have a time period yearX-yearY), then if that time period still has
less than 5 facts, those too roll them up with the next year. keep rolling up
until the period has 5 or more tags.

now there's another issue..for many celebs, because they don't have many tags
per year, when you roll up their tags, they end up with a single time period,
2022-2019 four tags. showing a timeline with a single time period doesn't look
good. so in that case, i simply hide the timeline and just display the tags
without the date.
 */
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

export function getTagTimeline(facts: Fact[], orderOfIssues: OrderOfIssues) {
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
