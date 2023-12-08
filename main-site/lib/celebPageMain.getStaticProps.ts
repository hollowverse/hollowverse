import { formatFactDate, oneDay, oneWeek } from '~/lib/date';
import { discourseApiClient } from '~/lib/discourseApiClient';
import { getCeleb } from '~/lib/getCeleb';
import { getCelebPositions } from '~/lib/getCelebPositions';
import { getParsedOldContent } from '~/lib/getParsedOldContent';
import { sortPositions } from '~/lib/sortPositions';
import { getForumTopicId } from '~/shared/lib/getForumTopicId';
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
  if (params.p) {
    // Pagination isn't supported for celebs with wiki pages
    return {
      redirect: {
        destination: `/${params.slug}`,
        permanent: false,
      },
    };
  }

  const oldContent = await getParsedOldContent(celeb.oldContent!);
  // const wikiTopicId = getForumTopicId(celeb.wiki!);

  const positions = await getCelebPositions(celeb._id);
  // const [topic, positions] = await Promise.all([
  //   discourseApiClient({ api: `t/${wikiTopicId}.json` }),
  //   getCelebPositions(celeb._id),
  // ]);
  // const topicPost = topic.post_stream.posts[0];

  // const wiki = {
  //   content: topicPost.cooked as string,
  //   date: formatFactDate(topicPost.created_at?.split('T')?.[0]) as string,
  //   username: topicPost.username as string,
  //   name: topicPost.name as string,
  //   avatar: topicPost.avatar_template as string,
  // };

  return {
    props: {
      // wiki,
      positions: sortPositions(positions),
      pageDescription: getPageDescription(),
      pagePath: `/${params.slug}`,
      celeb: {
        ...celeb,
        oldContent,
      },
    },
    revalidate: oneWeek,
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
