import { shuffle } from 'lodash-es';
import { groupCelebTags } from '~/lib/getStatic/helpers/groupCelebTags';
import { OrderOfIssues } from '~/lib/groq/orderOfIssues.projection';
import {
  TagPageRelatedCeleb,
  TagPageRelatedCelebsGroq,
  tagPageRelatedCelebsGroq,
} from '~/lib/groq/tagPageRelatedCelebs.groq';
import { Nullish } from '~/lib/types';
import { sanityClient } from '~/shared/lib/sanityio';

export async function getRelatedCelebs(
  tagId: string,
  issueId: string,
  mainSlug: string,
  orderOfIssues: OrderOfIssues,
) {
  const otherCelebs = (await sanityClient.fetch<TagPageRelatedCelebsGroq>(
    'tag-page-related-celebs',
    tagPageRelatedCelebsGroq,
    {
      tagId,
      issueId,
    },
  ))!;

  const process = (tagPageRelatedCelebs: Nullish<TagPageRelatedCeleb[]>) => {
    return tagPageRelatedCelebs
      ? shuffle(
          groupCelebTags(tagPageRelatedCelebs, orderOfIssues)
            ?.filter((cwt) => cwt.slug !== mainSlug)
            ?.slice(0, 6)
            ?.map((c) => ({
              ...c,
              tags: c.tags.filter((t) => t.tag._id !== tagId).slice(0, 3),
            })),
        )
      : null;
  };

  const otherCelebsWithTag = process(otherCelebs.withTag);
  const otherCelebsWithIssue = process(otherCelebs.withIssue);

  return {
    otherCelebsWithIssue,
    otherCelebsWithTag,
  };
}
