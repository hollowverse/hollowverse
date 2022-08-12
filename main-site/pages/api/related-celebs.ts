import groq from 'groq';
import { shuffle } from 'lodash-es';
import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '~/lib/c/cors';
import { groupCelebTags } from '~/lib/g/groupCelebTags';
import { orderOfIssuesGroq } from '~/lib/o/orderOfIssues.groq';
import { OrderOfIssues } from '~/lib/o/orderOfIssues.projection';
import {
  RelatedCeleb,
  relatedCelebsGroq,
  RelatedCelebsGroq,
} from '~/lib/r/relatedCelebs.groq';
import { Tag, tagProjection } from '~/lib/t/tag.projection';
import { setApiCache } from '~/lib/s/setApiCache';
import { sanityClient } from '~/shared/lib/sanityio';
import { Nullish } from '~/shared/lib/types';

export type RelatedCelebs = Awaited<ReturnType<typeof getRelatedCelebs>>;
export type RelatedCelebsQueryParams = { tagId: string; slug: string };

export async function getRelatedCelebs(tagId: string, slug: string) {
  const results = await sanityClient.fetch<{
    tag: Tag | null;
    orderOfIssues: OrderOfIssues;
  }>(
    'related-celebs-tag',
    groq`{
      'tag': *[_type == 'tag' && _id == $tagId][0]{${tagProjection}},
      'orderOfIssues': ${orderOfIssuesGroq}
    }`,
    { tagId },
  )!;

  const { tag } = results;

  if (!tag) {
    return null;
  }

  const relatedCelebs = (await sanityClient.fetch<RelatedCelebsGroq>(
    'related-celebs',
    relatedCelebsGroq,
    {
      tagId: tag._id,
      issueId: tag.issue._id,
    },
  ))!;

  const byTag = process(relatedCelebs.byTag, tag);
  const byIssue = process(relatedCelebs.byIssue, tag);

  return { byIssue, byTag, tag };

  function process(_relatedCelebs: Nullish<RelatedCeleb[]>, _tag: Tag) {
    return _relatedCelebs
      ? shuffle(
          groupCelebTags(_relatedCelebs, results.orderOfIssues)
            ?.filter((cwt) => cwt.slug !== slug)
            ?.slice(0, 6)
            ?.map((c) => ({
              ...c,
              tags: c.tags.filter((t) => t.tag._id !== _tag._id).slice(0, 3),
            })),
        )
      : null;
  }
}

export default async function relatedCelebsApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  cors(req, res);
  setApiCache(res);

  const { tagId, slug } = req.query as RelatedCelebsQueryParams;

  return res.status(200).json(await getRelatedCelebs(tagId, slug));
}
