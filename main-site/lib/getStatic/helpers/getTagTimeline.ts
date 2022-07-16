import { getYear } from 'date-fns';
import { invertBy, last, mapValues, toPairs } from 'lodash-es';
import { parseDate } from '~/lib/date';
import { Fact } from '~/lib/groq/fact.projection';
import { Tag } from '~/lib/groq/tag.projection';

export type TagPair = [string, Tag[]];
export type TagTimeline = TagPair[];

export function getTagTimeline(facts: Fact[]) {
  /**
   * group by tagId
   *
   * {'id1': [...bunch of facts],
   * 'id2': [...bunch of facts],
   * 'etc': [...asdf]
   * }
   *
   * map values to date ranges
   * {'id1': '2019-2020', etc},
   *
   * invert keys and values
   * {'2019-2020': ['id1', 'id2', etc]}
   *
   * map values to actual tags
   *
   * sort by date range
   */
  const tagIdToFacts: { [tagId: string]: Fact[] } = {};

  facts.forEach((f) => {
    f.tags.forEach((t) => {
      if (tagIdToFacts[t.tag._id]) {
        tagIdToFacts[t.tag._id].push(f);
      } else {
        tagIdToFacts[t.tag._id] = [f];
      }
    });
  });

  /**
   * {'id1': '2020-2019'}
   */
  const tagIdToDateRange = mapValues(tagIdToFacts, (facts) => {
    const dates = facts.map((f) => getYear(parseDate(f.date)));
    const firstDate = dates[0];
    const lastDate = last(dates);

    return `${firstDate}-${lastDate}`;
  });

  const dateRangeToTagIds = invertBy(tagIdToDateRange);

  const dateRangeToTags = mapValues(dateRangeToTagIds, (arrOfTagIds) => {
    return arrOfTagIds.map((tagId) => {
      const factWithTag = facts.find((f) =>
        f.tags.some((t) => t.tag._id === tagId),
      )!;
      const tag = factWithTag.tags.find((t) => t.tag._id === tagId)!;

      return tag;
    });
  });

  const pairs = toPairs(dateRangeToTags);

  const cleanedUpPairs = pairs.map((p) => {
    const k = p[0];
    let newKey: string;

    const years = k.split('-');

    if (years.length === 1) {
      newKey = k;
    } else if (years[0] !== years[1]) {
      newKey = k;
    } else {
      newKey = years[0];
    }

    return [newKey, p[1]] as [string, Tag[]];
  });

  return cleanedUpPairs;
}
