import { shuffle } from 'lodash-es';
import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { groupCelebTags } from '~/lib/getStatic/helpers/groupCelebTags';
import { OrderOfIssues } from '~/lib/groq/orderOfIssues.projection';
import {
  RelatedCeleb,
  RelatedCelebsGroq,
  relatedCelebsGroq,
} from '~/lib/groq/relatedCelebs.groq';
import { CelebTag } from '~/lib/groq/tag.projection';
import { Nullish } from '~/lib/types';
import { sanityClient } from '~/shared/lib/sanityio';

export type RelatedCelebs = UnwrapPromise<ReturnType<typeof getRelatedCelebs>>;

export async function getRelatedCelebs(
  tag: CelebTag,
  mainSlug: string,
  orderOfIssues: OrderOfIssues,
) {
  const relatedCelebs = (await sanityClient.fetch<RelatedCelebsGroq>(
    'related-celebs',
    relatedCelebsGroq,
    {
      tagId: tag.tag._id,
      issueId: tag.tag.issue._id,
    },
  ))!;

  const process = (relatedCelebs: Nullish<RelatedCeleb[]>) => {
    return relatedCelebs
      ? shuffle(
          groupCelebTags(relatedCelebs, orderOfIssues)
            ?.filter((cwt) => cwt.slug !== mainSlug)
            ?.slice(0, 6)
            ?.map((c) => ({
              ...c,
              tags: c.tags.filter((t) => t.tag._id !== tag.tag._id).slice(0, 3),
            })),
        )
      : null;
  };

  const byTag = process(relatedCelebs.byTag);
  const byIssue = process(relatedCelebs.byIssue);

  return { tag, byIssue, byTag };
}
