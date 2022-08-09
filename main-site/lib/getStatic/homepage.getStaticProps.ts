import groq from 'groq';
import { oneDay } from '~/lib/date';
import { getTrendingCelebs } from '~/lib/getStatic/helpers/getTrendingCelebs';
import { getTrendingIssues } from '~/lib/getStatic/helpers/getTrendingIssues';
import {
  getPaginationProps,
  getPaginationRange,
} from '~/lib/getStatic/helpers/pagination';
import { transformFact } from '~/lib/getStatic/helpers/transformFact';
import { celebProjection } from '~/lib/groq/celeb.projection';
import { factProjection, FactWithCeleb } from '~/lib/groq/fact.projection';
import { Issue, issueProjection } from '~/lib/groq/issue.projection';
import { sortByArray } from '~/lib/sortByArray';
import { log } from '~/shared/lib/log';
import { sanityClient } from '~/shared/lib/sanityio';
import { PageProps } from '~/shared/lib/types';

export type HomepageProps = PageProps<typeof getStaticProps>;

export async function getStaticProps({
  params,
}: {
  params?: {
    p: string;
  };
}) {
  log('info', 'homepage getStaticProps called');

  const paginationRange = getPaginationRange({ p: params?.p });

  const [trendingCelebs, trendingIssueIds, latestFacts, factCount, forumCta] =
    await Promise.all([
      getTrendingCelebs(),

      getTrendingIssues(),

      sanityClient.fetch<FactWithCeleb[]>(
        'latest-page-facts',
        groq`*[_type == 'fact'] | order(_createdAt desc)[$start...$end] {
          'celeb': celeb->{${celebProjection}},
          ${factProjection}
        }`,
        { start: paginationRange.start, end: paginationRange.end },
      ),

      sanityClient.fetch<number>(
        'fact-count',
        groq`count(*[_type == 'fact'])`,
      )!,

      sanityClient.fetch<{ message: string }>(
        'forum-cta',
        groq`*[_type == 'forum-cta'][0]{message}`,
      ),
    ]);

  const trendingIssues = await sanityClient.fetch<Issue[]>(
    'trending-issues',
    groq`*[_type == 'topic' && _id in $trendingIssueIds]{
      ${issueProjection}
    }`,
    {
      trendingIssueIds: trendingIssueIds!.filter(
        (n) =>
          ![
            'f8639841-cf94-4be9-acbb-b4b68863c713-m', // Religion
            'd01ad83e-5f0b-401b-b79b-65613bcc1377-m', // Political Affiliation
            '6233368a-6ba2-4935-a0e7-8c88b90bfd72-m', // Political Views
          ].includes(n),
      ),
    },
  )!;

  if (!trendingCelebs || !trendingIssueIds || !latestFacts) {
    log('error', 'Required data for homepage is missing', {
      alert: true,
      trendingCelebs: !!trendingCelebs,
      trendingIssues: !!trendingIssueIds,
      latestFacts: !!latestFacts,
    });
  }

  sortByArray(trendingIssues, trendingIssueIds!, (i) => i._id);

  return {
    props: {
      forumCta: forumCta?.message,
      pagePath: paginationRange.p === 1 ? '/' : `/~p/${paginationRange.p}`,
      pagination: getPaginationProps(paginationRange, factCount),
      trendingIssues: trendingIssues!,
      trendingCelebs: trendingCelebs!,
      latestFacts: latestFacts!.map((f) => transformFact(f)),
    },
    revalidate: oneDay,
  };
}
