import { sortTags } from '~/lib/disabled/sortTags';
import { OrderOfIssues } from '~/lib/orderOfIssues.projection';
import {
  RelatedCelebsGroq,
  RelatedFact,
} from '~/lib/disabled/relatedCelebs.groq';
import { CelebTag } from '~/lib/tag.projection';

function collectTags(facts: RelatedFact[], orderOfIssues: OrderOfIssues) {
  const tags: CelebTag[] = [];

  facts.forEach((f) => {
    tags.push(...f.tags);
  });

  return sortTags(tags, orderOfIssues);
}

export function groupCelebTags(
  celebsWithFacts: NonNullable<RelatedCelebsGroq['byIssue']>,
  orderOfIssues: OrderOfIssues,
) {
  return celebsWithFacts.map((cwf) => {
    const { facts, ...rest } = cwf;

    return {
      ...rest,
      tags: collectTags(facts, orderOfIssues),
    };
  });
}
