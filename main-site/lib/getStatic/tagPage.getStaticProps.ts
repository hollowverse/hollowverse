import { uniq } from 'lodash-es';
import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { getCelebWithTimeline } from '~/lib/getStatic/getCelebWithTimeline';
import { getRelatedCelebs } from '~/lib/getStatic/getRelatedCelebs';
import { TagTimeline } from '~/lib/getStatic/getTagTimeline';
import { log } from '~/shared/lib/log';

function tagExists(tagTimeline: TagTimeline, celebTagId: string) {
  return tagTimeline.some((tpair) =>
    tpair[1].some((t) => t.tag._id === celebTagId),
  );
}

export type TagPageProps = NonNullable<
  UnwrapPromise<ReturnType<typeof getStaticProps>>['props']
>;

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

  const { otherCelebsWithTag, otherCelebsWithIssue } = await getRelatedCelebs(
    params.celebTagId,
    tag.tag.issue._id,
    params.celeb,
    uniq([tag.tag.issue.name, ...results.orderOfIssues]),
  );

  return {
    props: {
      celeb: results.celeb,
      tag,
      tagFacts,
      otherCelebsWithTag,
      otherCelebsWithIssue,
    },
  };
};
