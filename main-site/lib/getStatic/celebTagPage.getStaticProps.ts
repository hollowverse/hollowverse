import { uniq } from 'lodash-es';
import { oneDay } from '~/lib/date';
import { getCelebIssues } from '~/lib/getStatic/helpers/getCelebIssues';
import { getRelatedCelebs } from '~/lib/getStatic/helpers/getRelatedCelebs';
import {
  getTagTimeline,
  TagTimeline,
} from '~/lib/getStatic/helpers/getTagTimeline';
import { transformFact } from '~/lib/getStatic/helpers/transformFact';
import {
  CelebWithFacts,
  getCelebWithFactsGroq,
} from '~/lib/groq/getCelebWithFacts.groq';
import { PageProps } from '~/lib/types';
import { log } from '~/shared/lib/log';
import { sanityClient } from '~/shared/lib/sanityio';

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

  const results = await sanityClient.fetch<CelebWithFacts<false>>(
    'celeb-and-facts',
    getCelebWithFactsGroq(),
    {
      slug: params.slug,
      issueId: null,
    },
  )!;

  if (!results || !results.celeb) {
    return {
      notFound: true,
    };
  }

  const tagTimeline = getTagTimeline(results.celeb.facts);

  if (!tagExists(tagTimeline, params.tagId)) {
    return {
      notFound: true,
    };
  }

  const tagFacts = results.celeb.facts
    .filter((f) => f.tags.some((t) => t.tag._id === params.tagId))
    .map((f) => transformFact(f));

  const tag = tagFacts[0].tags.find((t) => t.tag._id === params.tagId)!;

  const [relatedCelebs, issues] = await Promise.all([
    getRelatedCelebs(
      tag,
      params.slug,
      uniq([tag.tag.issue.name, ...results.orderOfIssues]),
    ),
    getCelebIssues({ slug: params.slug }),
  ]);

  return {
    props: {
      issues,
      celeb: results.celeb,
      tagTimeline,
      tag,
      tagFacts,
      relatedCelebs,
    },
    revalidate: oneDay,
  };
};
