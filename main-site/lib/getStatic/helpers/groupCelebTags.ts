import { sortTags } from '~/lib/getStatic/helpers/sortTags';
import { OrderOfIssues } from '~/lib/groq/orderOfIssues.projection';
import { RelatedCelebsGroq, RelatedFact } from '~/lib/groq/relatedCelebs.groq';
import { Tag } from '~/lib/groq/tag.projection';

function collectTags(facts: RelatedFact[], orderOfIssues: OrderOfIssues) {
  const tags: Tag[] = [];

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
