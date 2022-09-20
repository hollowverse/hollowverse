import groq from 'groq';
import { first, last, startsWith } from 'lodash-es';
import { Celeb, celebProjection } from '~/lib/celeb.projection';
import { getGaTrendingPages } from '~/lib/getTrendingCelebs';
import { getKgSearchId } from '~/lib/kgPage.getStaticProps';
import { Position } from '~/lib/position.projection';
import { sortByArray } from '~/lib/sortByArray';
import { KnowledgeGraphCelebResult } from '~/shared/lib/knowledgeGraphClient';
import { sanityClient } from '~/shared/lib/sanityio';
import { PageProps } from '~/shared/lib/types';

export type RequestedPageProps = PageProps<typeof getStaticProps>;

export async function getStaticProps() {
  const mostSearchedPages = await getGaTrendingPages({ limit: 300 })!;
  const ids = getIds();
  const slugIds = getSlugIds();
  const kgIds = getKgIds();
  const kgSearchIds = kgIds!
    .map((id) => `ids=${encodeURIComponent(id)}`)
    .join('&');

  const [pfsWithPages, pfsWithoutPages] = await Promise.all([
    getPfsWithPages(),
    getPfsWithoutPages(),
  ]);

  const requestedWithPages = pfsWithPages
    .map((pf) => {
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

  const requestedWithoutPages = pfsWithoutPages.map((pf) => {
    return {
      ...pf.result,
      wiki: false,
      religionSummary: false,
      polvisSummary: false,
    };
  });

  const requested = [...requestedWithPages, ...requestedWithoutPages].filter(
    (pf) => pf.name !== 'Testo',
  );

  sortByArray(requested!, ids, (pf) => {
    if ('slug' in pf) {
      return pf.slug;
    }

    return pf['@id'];
  });

  return {
    props: { requested, kgIds, pfsWithoutPages },
  };

  function getIds() {
    return mostSearchedPages!
      .map((p) => {
        if (startsWith(p.pagePath, '/~kg')) {
          return decodeURIComponent(last(p.pagePath.split('/'))!);
        }

        return p.pagePath.slice(1);
      })
      .filter((id) => {
        if (first(id) === '~' || !id) {
          return false;
        }

        return true;
      });
  }

  function getSlugIds() {
    return mostSearchedPages!
      .filter((p) => {
        if (startsWith(p.pagePath, '/~')) {
          return false;
        }

        return true;
      })
      .map((p) => p.pagePath.slice(1));
  }

  function getKgIds() {
    return mostSearchedPages!
      .filter((p) => {
        if (!startsWith(p.pagePath, '/~kg')) {
          return false;
        }

        return true;
      })
      .map((p) => getKgSearchId(decodeURIComponent(p.pagePath.slice(1))));
  }

  async function getPfsWithoutPages() {
    const kgApiKey =
      process.env.KG_API_KEY || 'AIzaSyCDgM-p1fhbsf5HuRGCfZP2M9l_JQ0Vmbo';

    const response = await fetch(
      `https://kgsearch.googleapis.com/v1/entities:search?key=${kgApiKey}&limit=500&types=Person&${kgSearchIds}`,
    );
    const results = await response.json();

    return results.itemListElement as KnowledgeGraphCelebResult[];
  }

  async function getPfsWithPages() {
    return sanityClient.fetch<(Celeb & { positions: Position[] })[]>(
      'requested',
      // groq`*[_type == 'celeb' && slug.current in $slugs][0...10]{
      groq`*[_type == 'celeb' && slug.current in $slugs]{
      ${celebProjection},
      'positions': *[_type == 'position' && celeb._ref == ^._id]
    }`,
      { slugs: slugIds },
    )!;
  }
}
