import groq from 'groq';
import { first, last, startsWith } from 'lodash-es';
import { Celeb, celebProjection } from '~/lib/celeb.projection';
import { getGaTrendingPages } from '~/lib/getTrendingCelebs';
import { Position } from '~/lib/position.projection';
import { sortByArray } from '~/lib/sortByArray';
import { sanityClient } from '~/shared/lib/sanityio';
import { PageProps } from '~/shared/lib/types';

export type RequestedPageProps = PageProps<typeof getStaticProps>;

export async function getStaticProps() {
  const mostSearchedPages = await getGaTrendingPages({ limit: 300 });
  const ids = mostSearchedPages
    ?.map((p) => {
      if (startsWith(p.pagePath, '/~kg')) {
        return last(p.pagePath.split('/'));
      }

      return p.pagePath.slice(1);
    })
    .filter((id) => {
      if (first(id) === '~' || !id) {
        return false;
      }

      return true;
    });
  const pfs = await sanityClient.fetch<(Celeb & { positions: Position[] })[]>(
    'requested',
    // groq`*[_type == 'celeb' && slug.current in $slugs][0...10]{
    groq`*[_type == 'celeb' && slug.current in $slugs]{
      ${celebProjection},
      'positions': *[_type == 'position' && celeb._ref == ^._id]
    }`,
    { slugs: ids },
  );
  const requested = pfs
    ?.map((pf) => {
      return {
        ...pf,
        wiki: !!pf.wiki,
        religionSummary: !!pf.positions.find((p) => p.issue === 'Religion'),
        polvisSummary: !!pf.positions.find(
          (p) => p.issue === 'Political Views',
        ),
      };
    })
    .filter((pf) => {
      return !pf.wiki || !pf.religionSummary || !pf.polvisSummary;
    });

  sortByArray(requested!, ids!, (pf) => pf.slug);

  return {
    props: { requested },
  };
}
