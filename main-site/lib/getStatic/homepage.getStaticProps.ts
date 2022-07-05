import groq from 'groq';
import { GetStaticPropsResult } from 'next';
import { oneDay } from '~/lib/date';
import {
  getTrendingCelebs,
  TrendingCelebs,
} from '~/lib/getStatic/helpers/getTrendingCelebs';
import { transformFact } from '~/lib/getStatic/helpers/transformFact';
import { Celeb, celebProjection } from '~/lib/groq/celeb.projection';
import { Fact, factProjection } from '~/lib/groq/fact.projection';
import { log } from '~/shared/lib/log';
import { sanityClient } from '~/shared/lib/sanityio';

export type HomepageProps = {
  trendingCelebs: TrendingCelebs;
  latestFacts: any;
};

export async function getStaticProps(): Promise<
  GetStaticPropsResult<HomepageProps>
> {
  log('info', 'homepage getStaticProps called');

  const [trendingCelebs, trendingIssues, latestFacts] = await Promise.all([
    getTrendingCelebs(),
    () => null,
    sanityClient.fetch<(Fact & { celeb: Celeb })[]>(
      'latest-page-facts',
      groq`*[_type == 'fact'] | order(date desc)[0..49] {
      'celeb': celeb->{${celebProjection}},
      ${factProjection}
    }`,
    ),
  ]);

  return {
    props: {
      trendingCelebs,
      latestFacts: latestFacts?.map((f) => transformFact(f)),
    },
    revalidate: oneDay,
  };
}
