import { oneDay } from '~/lib/date';
import { getCeleb } from '~/lib/getCeleb';
import { getParsedOldContent } from '~/lib/getParsedOldContent';
import { PageProps } from '~/shared/lib/types';

export type CelebPageMainProps = PageProps<typeof celebPageMainGetStaticProps>;
export async function celebPageMainGetStaticProps(
  {
    params,
  }: {
    params: { slug: string; p: string | undefined };
  },
  celeb: NonNullable<Awaited<ReturnType<typeof getCeleb>>>,
) {
  const parseOldContent = celeb.oldContent !== null;

  const oldContent = parseOldContent
    ? await getParsedOldContent(celeb.oldContent!)
    : null;

  return {
    props: {
      pageDescription: getPageDescription(),
      pagePath: `/${params.slug}`,
      celeb: {
        ...celeb,
        oldContent,
      },
    },
    revalidate: oneDay,
  };

  function getPageDescription() {
    if (oldContent?.summaries) {
      const { religion, politicalViews } = oldContent.summaries;
      const religionText = religion ? `Religion: ${religion}` : '';
      const politicalViewsText = politicalViews
        ? `Political views: ${politicalViews}`
        : '';

      return [religionText, politicalViewsText].join(' ').trim();
    } else {
      return oldContent?.article.substring(0, 250) || '';
    }
  }
}
