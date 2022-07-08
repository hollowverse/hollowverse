import groq from 'groq';
import { Page } from '~/components/Page';
import { oneDay } from '~/lib/date';
import { gaRunReport } from '~/lib/getStatic/helpers/analyticsDataClient';
import { getGaTrendingPages } from '~/lib/getStatic/helpers/getTrendingCelebs';
import {
  getKgSearchId,
  requestKgResult,
} from '~/lib/getStatic/kgPage.getStaticProps';
import { Link } from '~/lib/Link';
import { sanityClient } from '~/shared/lib/sanityio';

export default function TrendingSearches(props: any) {
  return (
    <Page
      id="research-list-page"
      title={`Celebrities to research`}
      description={`List of celebrities to research on Hollowverse`}
      allowSearchEngines={false}
      pathname={'~internal/research-list'}
    >
      <div className="h-container relative my-5 overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                Celebrity name
              </th>
              <th scope="col" className="px-6 py-3 text-left">
                Fact count
              </th>
            </tr>
          </thead>
          <tbody>
            {props.researchList.map((i) => {
              return (
                <tr key={i.link} className="border-b bg-white">
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 text-left font-medium text-gray-900"
                  >
                    <td className="flex gap-3 px-6 py-4 text-left">
                      {i.name}
                      <Link href={`${i.link}/lp`}>
                        <a className="font-medium text-blue-500 underline">
                          research
                        </a>
                      </Link>

                      <Link href={`${i.link}`}>
                        <a className="font-medium text-blue-500 underline">
                          page
                        </a>
                      </Link>
                    </td>
                  </th>
                  <td className="px-6 py-4 text-left">{i.factCount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Page>
  );
}

export async function getStaticProps() {
  const trendingPages = await getGaTrendingPages();
  const trendingRequests = await gaRunReport<
    { pagePath: string; pageTitle: string }[]
  >({
    dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }],

    metrics: [{ name: 'screenPageViews' }],

    dimensionFilter: {
      filter: {
        fieldName: 'pagePath',
        stringFilter: {
          matchType: 'BEGINS_WITH',
          value: '/~kg',
          caseSensitive: false,
        },
      },
    },
  });

  const slugs = trendingPages!.map((p) => p.pagePath.substring(1));
  const kgIds = trendingRequests!
    .filter((p) => p.pagePath !== '/~kg/kg%3A%2Fm%2F012hshtc') // Testo
    .map((p) => decodeURIComponent(p.pagePath.substring(5)))
    .slice(0, 10);

  const hits = await sanityClient.fetch<
    {
      name: string;
      factCount: number;
      knowledgeGraphId: string;
      slug: string;
    }[]
  >(
    'research-list',
    groq`
    *[_type == 'celeb' && (slug.current in $slugs || knowledgeGraphId in $kgIds)]{
      name,
      'factCount': count(*[_type == 'fact' && celeb._ref == ^._id]),
      knowledgeGraphId,
      'slug': slug.current
    } | order(factCount asc)
  `,
    {
      slugs,
      kgIds,
    },
  )!;

  const kgIdsNoPage = kgIds.filter(
    (kgId) => hits.find((h) => h.knowledgeGraphId === kgId) === undefined,
  );

  const kgResults = await Promise.all(
    kgIdsNoPage.map(async (kgId) => {
      const kgCeleb = (await requestKgResult(getKgSearchId(kgId)))?.[0];

      return {
        name: kgCeleb.result.name,
        factCount: 0,
        link: `/~kg/${encodeURIComponent(kgCeleb.result['@id'])}`,
      };
    }),
  );

  const sanityResults = hits.map((h) => ({
    name: h.name,
    factCount: h.factCount,
    link: `/${h.slug}`,
  }));

  const researchList = [...kgResults, ...sanityResults];

  return {
    props: {
      researchList,
    },

    revalidate: oneDay,
  };
}
