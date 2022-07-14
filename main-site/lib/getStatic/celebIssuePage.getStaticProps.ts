import groq from 'groq';
import { uniq } from 'lodash-es';
import { oneDay } from '~/lib/date';
import { getCelebIssues } from '~/lib/getStatic/helpers/getCelebIssues';
import { getRelatedCelebs } from '~/lib/getStatic/helpers/getRelatedCelebs';
import { getTagTimeline } from '~/lib/getStatic/helpers/getTagTimeline';
import { transformFact } from '~/lib/getStatic/helpers/transformFact';
import {
  CelebWithFacts,
  getCelebWithFactsGroq,
} from '~/lib/groq/getCelebWithFacts.groq';
import { Issue } from '~/lib/groq/issue.projection';
import { PageProps } from '~/lib/types';
import { sanityClient } from '~/shared/lib/sanityio';

export type CelebIssuePageProps = PageProps<typeof getStaticProps>;

export async function getStaticProps({
  params,
}: {
  params: { slug: string; issueId: string };
}) {
  if (!params.issueId) {
    return { notFound: true };
  }

  const [celebWithFacts, issue] = await Promise.all([
    sanityClient.fetch<CelebWithFacts<false>>(
      'celeb-and-facts',
      getCelebWithFactsGroq({ includeOldContent: false }),
      {
        slug: params.slug,
        issueId: null,
      },
    ),
    sanityClient.fetch<Issue>(
      'issue',
      groq`*[_type == 'topic' && _id == $issueId][0]`,
      { issueId: params.issueId },
    ),
  ]);

  if (!issue || !celebWithFacts?.celeb) {
    return { notFound: true };
  }

  const celeb = {
    ...celebWithFacts.celeb,
    facts: celebWithFacts.celeb.facts
      .filter((f) => f.issues.some((i) => i._id === params.issueId))
      .map((f) => transformFact(f)),
    issues: getCelebIssues(celebWithFacts.celeb.facts, params.issueId),
  };

  const tagTimeline = getTagTimeline(celeb.facts, celebWithFacts.orderOfIssues);

  const tag = tagTimeline[0][1][0];

  const { relatedCelebsByTag, relatedCelebsByIssue } = await getRelatedCelebs(
    tag.tag._id,
    tag.tag.issue._id,
    params.slug,
    uniq([tag.tag.issue.name, ...celebWithFacts.orderOfIssues]),
  );

  return {
    props: {
      tag,
      relatedCelebsByIssue,
      relatedCelebsByTag,
      tagTimeline,
      issue,
      celeb: celeb,
      slug: params.slug,
      issueId: params.issueId,
    },
    revalidate: oneDay,
  };
}
