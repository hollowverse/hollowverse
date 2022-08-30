import { countBy, orderBy, uniqBy } from 'lodash-es';
import { CelebTag } from '~/lib/tag.projection';

export function getIssuePageTags(
  tags: CelebTag[],
  issueId: string,
): (CelebTag & { count: number })[] {
  const filtered = tags.filter((t) => t.tag.issue._id === issueId);
  const counts = countBy(filtered, 'tag._id');
  const uniques = uniqBy(filtered, 'tag._id');
  const withCounts = uniques.map((t) => ({
    ...t,
    count: counts[t.tag._id],
  }));
  const ordered = orderBy(withCounts, 'count', 'desc');

  return ordered;
}
