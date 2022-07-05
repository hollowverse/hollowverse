import { Page } from '~/components/Page';
import { TitledCard } from '~/components/ui/TitledCard';
import { getGaAllTrendingCelebs } from '~/lib/getStatic/helpers/getGoogleAnalyticsTopPages';
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
            {props.trending.requests.titles.map((t: any, i: any) => {
              if (t.includes('Testo')) {
                return null;
              }

              return (
                <p key={t}>
                  <Link href={`/${props.trending.requests.paths[i]}`}>
                    <a>{t}</a>
                  </Link>
                </p>
              );
            })}
          </div>
        </TitledCard>

        <TitledCard
          titledContentProps={{
            title: `Trending searches`,
          }}
        >
          <div className="flex flex-col gap-5 p-5">
            {props.trending.searches.titles.map((t: any, i: any) => {
              if (t.includes('Testo')) {
                return null;
              }

              return (
                <p key={t}>
                  <Link href={`/${props.trending.requests.paths[i]}`}>
                    <a>{t}</a>
                  </Link>
                </p>
              );
            })}
          </div>
        </TitledCard>
      </div>
    </Page>
  );
}

export async function getStaticProps() {
  const trending = await getGaAllTrendingCelebs();

  return {
    props: {
      trending,
    },
  };
}
