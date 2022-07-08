import groq from 'groq';
import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { oneDay } from '~/lib/date';
import { getTrendingCelebs } from '~/lib/getStatic/helpers/getTrendingCelebs';
import { getTrendingIssues } from '~/lib/getStatic/helpers/getTrendingIssues';
import { transformFact } from '~/lib/getStatic/helpers/transformFact';
import { Celeb, celebProjection } from '~/lib/groq/celeb.projection';
import {
  Fact,
  factProjection,
  FactWithCeleb,
  Issue,
} from '~/lib/groq/fact.projection';
import { log } from '~/shared/lib/log';
import { sanityClient } from '~/shared/lib/sanityio';
import { issueProjection } from '~/lib/groq/issue.projection';
import { PageProps } from '~/lib/types';
import { sortByArray } from '~/lib/sortByArray';

export type HomepageProps = PageProps<typeof getStaticProps>;

export async function getStaticProps() {
  log('info', 'homepage getStaticProps called');

  const [trendingCelebs, trendingIssueIds, latestFacts] = await Promise.all([
    getTrendingCelebs(),

    getTrendingIssues(),

    sanityClient.fetch<FactWithCeleb[]>(
      'latest-page-facts',
      groq`*[_type == 'fact'] | order(date desc)[0..25] {
        'celeb': celeb->{${celebProjection}},
        ${factProjection}
      }`,
    ),
    getTrendingIssues(),
  ]);

  const trendingIssues = await sanityClient.fetch<Issue[]>(
    'trending-issues',
    groq`
      *[_type == 'topic' && _id in $trendingIssueIds]{
        ${issueProjection}
      }
    `,
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
      trendingIssues: trendingIssues!,
      trendingCelebs: trendingCelebs!,
      latestFacts: latestFacts!.map((f) => transformFact(f)),
    },
    revalidate: oneDay,
  };
}
