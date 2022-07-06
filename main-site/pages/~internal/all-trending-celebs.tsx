import { startsWith } from 'lodash-es';
import { Page } from '~/components/Page';
import { TitledCard } from '~/components/ui/TitledCard';
import { gaRunReport } from '~/lib/getStatic/helpers/analyticsDataClient';
import { getGaTrendingPages } from '~/lib/getStatic/helpers/getTrendingCelebs';
import { Link } from '~/lib/Link';

export default function TrendingSearches(props: any) {
  return (
    <Page
      id="launch-pad-page"
      title={`All trending celebs`}
      description={`All trending celebs`}
      allowSearchEngines={false}
      pathname={'~internal/all-trending-celebs'}
    >
      <div className="h-container my-5 flex flex-col gap-5">
        <TitledCard
          titledContentProps={{
            title: `Trending requests`,
          }}
        >
          <div className="flex flex-col gap-5 p-5">
            {props.trending.requests.map(
              ({ pagePath, pageTitle }: any, i: any) => {
                return (
                  <p key={pagePath}>
                    <Link href={`${pagePath}`}>
                      <a>{pageTitle}</a>
                    </Link>
                  </p>
                );
              },
            )}
          </div>
        </TitledCard>

        <TitledCard
          titledContentProps={{
            title: `Trending searches`,
          }}
        >
          <div className="flex flex-col gap-5 p-5">
            {props.trending.searches.map(
              ({ pagePath, pageTitle }: any, i: any) => {
                return (
                  <p key={pagePath}>
                    <Link href={`/${pagePath}`}>
                      <a>{pageTitle}</a>
                    </Link>
                  </p>
                );
              },
            )}
          </div>
        </TitledCard>
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

  return {
    props: {
      trending: {
        searches: trendingPages?.filter(
          ({ pagePath }) =>
            pagePath && pagePath !== '/' && !startsWith(pagePath, '/~'),
        ),
        requests: trendingRequests?.filter(
          ({ pageTitle, pagePath }) =>
            pagePath &&
            pagePath !== '/' &&
            !pageTitle.toLowerCase().includes('testo'),
        ),
      },
    },
  };
}
