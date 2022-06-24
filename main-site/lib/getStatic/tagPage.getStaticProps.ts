import { shuffle } from 'lodash-es';
import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { getCelebWithTimeline } from '~/lib/getStatic/getCelebWithTimeline';
import { TagTimeline } from '~/lib/getStatic/getTagTimeline';
import { groupCelebTags } from '~/lib/getStatic/groupCelebTags';
import {
  TagPageRelatedCeleb,
  TagPageRelatedCelebsGroq,
  tagPageRelatedCelebsGroq,
} from '~/lib/groq/tagPageRelatedCelebs.groq';
import { Nullish } from '~/lib/types';
import { log } from '~/shared/lib/log';
import { sanityClient } from '~/shared/lib/sanityio';

function tagExists(tagTimeline: TagTimeline, celebTagId: string) {
  return tagTimeline.some((tpair) =>
    tpair[1].some((t) => t.tag._id === celebTagId),
  );
}

export type TagPageProps = NonNullable<
  UnwrapPromise<ReturnType<typeof getStaticProps>>['props']
>;

/**
 * For the celeb's tag page, we want to show the the celeb with the tag timeline
 * at the top.
 *
 * Below that we want to show all of the Facts that are tagged with this tag.
 *
 * Below that we want to get some more content to get the page to look more interesting.
 * So, in addition to the celeb's tag Facts, we want about 10 other Facts.
 *
 * We could show 10 Facts from other celebs with the same tag.
 *
 * If we can't find 10, we look for other celebs' takes on the issue of the Fact.
 */
export const getStaticProps = async ({
  params,
}: {
  params: { celeb: string; celebTagId: string };
}) => {
  log(
    'info',
    `tagPage getStaticProps called: ${params.celeb}/${params.celebTagId}`,
  );

  const results = await getCelebWithTimeline(params.celeb, true);

  if (!results) {
    return {
      notFound: true,
    };
  }

  if (!tagExists(results.celeb.tagTimeline, params.celebTagId)) {
    return {
      notFound: true,
    };
  }

  const tagFacts = results.celeb.facts.filter((f) =>
    f.tags.some((t) => t.tag._id === params.celebTagId),
  );
  const tag = tagFacts[0].tags.find((t) => t.tag._id === params.celebTagId)!;

  const otherCelebs = (await sanityClient.fetch<TagPageRelatedCelebsGroq>(
    'tag-page-related-celebs',
    tagPageRelatedCelebsGroq,
    {
      tagId: params.celebTagId,
      issueId: tag.tag.issue._id,
    },
  ))!;

  const process = (tagPageRelatedCelebs: Nullish<TagPageRelatedCeleb[]>) => {
    return tagPageRelatedCelebs
      ? shuffle(
          groupCelebTags(tagPageRelatedCelebs, results.orderOfIssues)
            ?.filter((cwt: any) => cwt.slug !== params.celeb)
            ?.slice(0, 6)
            ?.map((c) => ({
              ...c,
              tags: c.tags.filter((t) => t.tag._id !== tag.tag._id).slice(0, 3),
            })),
        )
      : null;
  };

  const otherCelebsWithTag = process(otherCelebs.withTag);
  const otherCelebsWithIssue = process(otherCelebs.withIssue);

  return {
    props: {
      celeb: results.celeb,
      tag,
      tagFacts,
      otherCelebsWithTag: otherCelebsWithTag,
      otherCelebsWithIssue: otherCelebsWithIssue,
    },
  };
};
