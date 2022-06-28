import groq from 'groq';
import { getGaMostSearchedCelebs } from '~/lib/getStatic/getGoogleAnalyticsTopPages';
import { Summaries } from '~/lib/getStatic/getParsedOldContent';
import { Picture } from '~/lib/groq/picture.projection';
import { sanityClient } from '~/shared/lib/sanityio';

export type TrendingCelebs = {
  name: string;
  slug: string;
  picture: Picture;
  summaries: Summaries;
}[];

export async function getTrendingCelebs() {
  const gaMostSearchedCelebs = (await getGaMostSearchedCelebs()) as string[];

  const trendingCelebs = await sanityClient.fetch<
    {
      name: string;
      slug: string;
      picture: Picture;
    }[]
  >(
    'trending-celebs',
    groq`*[
      _type == 'celeb' &&
      slug.current in $slugs
    ] {
      name,
      'slug': slug.current,
      'picture': picture.asset->{_id, 'metadata': {'lqip': metadata.lqip, 'palette': metadata.palette}},
    }
    `,
    { slugs: gaMostSearchedCelebs },
  );

  trendingCelebs!.sort((a: any, b: any) => {
    return (
      gaMostSearchedCelebs.indexOf(a.slug) -
      gaMostSearchedCelebs.indexOf(b.slug)
    );
  });

  return trendingCelebs as TrendingCelebs;
}
