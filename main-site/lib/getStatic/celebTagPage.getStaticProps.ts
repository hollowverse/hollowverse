import { uniq } from 'lodash-es';
import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { oneDay } from '~/lib/date';
import { getCelebWithTimeline } from '~/lib/getStatic/helpers/getCelebWithTimeline';
import { getRelatedCelebs } from '~/lib/getStatic/helpers/getRelatedCelebs';
import { TagTimeline } from '~/lib/getStatic/helpers/getTagTimeline';
import { PageProps } from '~/lib/types';
import { log } from '~/shared/lib/log';

function tagExists(tagTimeline: TagTimeline, celebTagId: string) {
  return tagTimeline.some((tpair) =>
    tpair[1].some((t) => t.tag._id === celebTagId),
  );
}

export type TagPageProps = PageProps<typeof getStaticProps>;

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string; tagId: string };
}) => {
  log('info', `tagPage getStaticProps called: ${params.slug}/${params.tagId}`);

  const results = await getCelebWithTimeline(params.slug, true);

  if (!results) {
    return {
      notFound: true,
    };
  }

  if (!tagExists(results.celeb.tagTimeline, params.tagId)) {
    return {
      notFound: true,
    };
  }

  const tagFacts = results.celeb.facts.filter((f) =>
    f.tags.some((t) => t.tag._id === params.tagId),
  );
  const tag = tagFacts[0].tags.find((t) => t.tag._id === params.tagId)!;

  const { otherCelebsByTag, otherCelebsByIssue } = await getRelatedCelebs(
    params.tagId,
    tag.tag.issue._id,
    params.slug,
    uniq([tag.tag.issue.name, ...results.orderOfIssues]),
  );

  return {
    props: {
      celeb: results.celeb,
      tag,
      tagFacts,
      otherCelebsByTag,
      otherCelebsByIssue,
    },
    revalidate: oneDay,
  };
};
