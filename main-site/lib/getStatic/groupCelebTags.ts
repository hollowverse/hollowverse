import { sortTags } from '~/lib/getStatic/sortTags';
import { OrderOfIssues } from '~/lib/groq/orderOfIssues.projection';
import { Tag } from '~/lib/groq/tag.projection';
import {
  TagPageRelatedCelebsGroq,
  TagPageRelatedFact,
} from '~/lib/groq/tagPageRelatedCelebs.groq';

function collectTags(
  facts: TagPageRelatedFact[],
  orderOfIssues: OrderOfIssues,
) {
  const tags: Tag[] = [];

  facts.forEach((f) => {
    tags.push(...f.tags);
  });

  return sortTags(tags, orderOfIssues);
}

export function groupCelebTags(
  celebsWithFacts: NonNullable<TagPageRelatedCelebsGroq['withIssue']>,
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
