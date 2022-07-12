import { shuffle } from 'lodash-es';
import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { groupCelebTags } from '~/lib/getStatic/helpers/groupCelebTags';
import { OrderOfIssues } from '~/lib/groq/orderOfIssues.projection';
import {
  RelatedCeleb,
  RelatedCelebsGroq,
  relatedCelebsGroq,
} from '~/lib/groq/relatedCelebs.groq';
import { Nullish } from '~/lib/types';
import { sanityClient } from '~/shared/lib/sanityio';

export type RelatedCelebs = UnwrapPromise<ReturnType<typeof getRelatedCelebs>>;

export async function getRelatedCelebs(
  tagId: string,
  issueId: string,
  mainSlug: string,
  orderOfIssues: OrderOfIssues,
) {
  const relatedCelebs = (await sanityClient.fetch<RelatedCelebsGroq>(
    'related-celebs',
    relatedCelebsGroq,
    {
      tagId,
      issueId,
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
              tags: c.tags.filter((t) => t.tag._id !== tagId).slice(0, 3),
            })),
        )
      : null;
  };

  const relatedCelebsByTag = process(relatedCelebs.byTag);
  const relatedCelebsByIssue = process(relatedCelebs.byIssue);

  return {
    relatedCelebsByIssue,
    relatedCelebsByTag,
  };
}
