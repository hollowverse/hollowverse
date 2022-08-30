import { oneWeek } from '~/lib/date';
import { getPaginationRange } from '~/lib/getPaginationRange';
import { getTrendingCelebs } from '~/lib/getTrendingCelebs';
import { log } from '~/shared/lib/log';
import { PageProps } from '~/shared/lib/types';

export type HomepageProps = PageProps<typeof getStaticProps>;

export async function getStaticProps({
  params,
}: {
  params?: {
    p: string;
  };
}) {
  log('info', 'homepage getStaticProps called');

  const paginationRange = getPaginationRange({ p: params?.p });

  const trendingCelebs = await getTrendingCelebs();

  if (!trendingCelebs) {
    log('error', 'Required data for homepage is missing', {
      alert: true,
      trendingCelebs: !!trendingCelebs,
    });
  }

  return {
    props: {
      pagePath: paginationRange.p === 1 ? '/' : `/~p/${paginationRange.p}`,
      trendingCelebs: trendingCelebs!,
    },
    revalidate: oneWeek,
  };
}
