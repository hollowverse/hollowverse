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

export type HomepageProps = PageProps<typeof getStaticProps>;

export async function getStaticProps() {
  log('info', 'homepage getStaticProps called');

  const [trendingCelebs, trendingIssueNames, latestFacts] = await Promise.all([
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
      *[_type == 'topic' && name in $trendingIssueNames]{
        ${issueProjection}
      }
    `,
    {
      trendingIssueNames: trendingIssueNames!.filter(
        (n) =>
          !['Religion', 'Political Affiliation', 'Political Views'].includes(n),
      ),
    },
  )!;

  if (!trendingCelebs || !trendingIssueNames || !latestFacts) {
    log('error', 'Required data for homepage is missing', {
      alert: true,
      trendingCelebs: !!trendingCelebs,
      trendingIssues: !!trendingIssueNames,
      latestFacts: !!latestFacts,
    });
  }

  trendingIssues.sort((a, b) => {
    return (
      trendingIssueNames!.indexOf(a.name) - trendingIssueNames!.indexOf(b.name)
    );
  });

  return {
    props: {
      trendingIssues: trendingIssues!,
      trendingCelebs: trendingCelebs!,
      latestFacts: latestFacts!.map((f) => transformFact(f)),
    },
    revalidate: oneDay,
  };
}
