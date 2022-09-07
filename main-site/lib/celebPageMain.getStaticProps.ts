import { oneDay } from '~/lib/date';
import { discourseApiClient } from '~/lib/discourseApiClient';
import { getCeleb } from '~/lib/getCeleb';
import { getParsedOldContent } from '~/lib/getParsedOldContent';
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
  const oldContent = await getParsedOldContent(celeb.oldContent!);
  const wikiTopicId = getForumTopicId(celeb.wiki!);
  const topic = await discourseApiClient({ api: `t/${wikiTopicId}.json` });
  const topicPost = topic.post_stream.posts[0];

  const wiki = {
    content: topicPost.cooked as string,
    date: topicPost.created_at as string,
    username: topicPost.username as string,
    name: topicPost.name as string,
    avatar: topicPost.avatar_template as string,
  };

  return {
    props: {
      wiki,
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
