import groq from 'groq';
import { GetStaticPropsResult } from 'next';
import { oneDay } from '~/lib/date';
import {
  getTrendingCelebs,
  TrendingCelebs,
} from '~/lib/getStatic/getTrendingCelebs';
import { transformFact } from '~/lib/getStatic/transformFact';
import { Fact, factProjection } from '~/lib/groq/fact.projection';
import { Picture } from '~/lib/groq/picture.projection';
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

  const trendingCelebs = await getTrendingCelebs();

  const latestFacts = await sanityClient.fetch<
    (Fact & { celeb: { name: string; Picture: Picture; slug: string } })[]
  >(
    'latest-page-facts',
    groq`*[_type == 'fact'] | order(date desc)[0..49] {
      'celeb': celeb->{
        name,
        'picture': picture.asset->{
          _id,
          'metadata': {
            'lqip': metadata.lqip,
            'palette': metadata.palette
          }
        },
        'slug': slug.current
      },
      ${factProjection}
    }`,
  );

  return {
    props: {
      trendingCelebs,
      latestFacts: latestFacts?.map((f) => transformFact(f)),
    },
    revalidate: oneDay,
  };
}
