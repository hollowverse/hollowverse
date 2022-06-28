import { JsonView } from '~/components/JsonView';
import { Page } from '~/components/Page';
import { TitledCard } from '~/components/ui/TitledCard';
import {
  getGaAllTrendingCelebs,
  getGaMostRequestedCelebs,
} from '~/lib/getStatic/getGoogleAnalyticsTopPages';
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
          <div className="flex flex-wrap gap-5 p-5">
            {props.trending.requests.titles.map((t: any, i: any) => {
              if (t.includes('Testo')) {
                return null;
              }

              return (
                <Link key={t} href={`/${props.trending.requests.paths[i]}`}>
                  <a>{t}</a>
                </Link>
              );
            })}
          </div>
        </TitledCard>

        <TitledCard
          titledContentProps={{
            title: `Trending searches`,
          }}
        >
          <div className="flex flex-wrap gap-5 p-5">
            {props.trending.searches.titles.map((t: any, i: any) => {
              if (t.includes('Testo')) {
                return null;
              }

              return (
                <Link key={t} href={`/${props.trending.requests.paths[i]}`}>
                  <a>{t}</a>
                </Link>
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
