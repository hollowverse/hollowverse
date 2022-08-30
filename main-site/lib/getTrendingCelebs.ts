import groq from 'groq';
import { startsWith } from 'lodash-es';
import { gaRunReport } from '~/lib/analyticsDataClient';
import { Summaries } from '~/lib/getParsedOldContent';
import { Picture } from '~/lib/picture.projection';
import { sortByArray } from '~/lib/sortByArray';
import { sanityClient } from '~/shared/lib/sanityio';

export type TrendingCelebs = {
  name: string;
  slug: string;
  picture: Picture;
  summaries: Summaries;
}[];

export function getGaTrendingPages() {
  return gaRunReport<
    { pagePath: string; pageTitle: string; screenPageViews: string }[]
  >({
    limit: 51,

    dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],

    metrics: [{ name: 'screenPageViews' }],

    dimensionFilter: {
      filter: {
        fieldName: 'pageReferrer',
        stringFilter: {
          matchType: 'ENDS_WITH',
          value: '~search',
          caseSensitive: false,
        },
      },
    },
  });
}

export async function getTrendingCelebs() {
  const gaTrendingPages = await getGaTrendingPages();

  if (!gaTrendingPages) {
    return null;
  }

  const gaTrendingSlugs = gaTrendingPages
    .filter(
      ({ pagePath }) =>
        pagePath && pagePath !== '/' && !startsWith(pagePath, '/~'),
    )
    .map((c) => c.pagePath.substring(1));

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
    { slugs: gaTrendingSlugs },
  );

  sortByArray(trendingCelebs!, gaTrendingSlugs, (c) => c.slug);

  return trendingCelebs as TrendingCelebs;
}
