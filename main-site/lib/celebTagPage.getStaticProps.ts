import { getCeleb } from '~/lib/getCeleb';
import { getCelebFacts } from '~/lib/getCelebFacts';
import { getTagTimeline, TagTimeline } from '~/lib/getTagTimeline';
import { log } from '~/shared/lib/log';
import { PageProps } from '~/shared/lib/types';

function tagExists(tagTimeline: TagTimeline, celebTagId: string) {
  return tagTimeline.some((tpair) =>
    tpair[1].some((t) => t.tag._id === celebTagId),
  );
}

export type TagPageProps = PageProps<typeof getStaticProps>;

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string; tagId: string };
}) => {
  log('info', `tagPage getStaticProps called: ${params.slug}/${params.tagId}`);

  if (!params.slug || !params.tagId) {
    return { notFound: true };
  }

  const celeb = await getCeleb(params.slug);

  if (!celeb) {
    return { notFound: true };
  }

  const allFacts = await getCelebFacts(celeb._id);

  const tagTimeline = getTagTimeline(allFacts);

  if (!tagExists(tagTimeline, params.tagId)) {
    return {
      redirect: {
        destination: `/${params.slug}`,
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: `/${params.slug}/issue/${allFacts[0].tags[0].tag.issue._id}`,
      permanent: false,
    },
  };

  // const tagFacts = allFacts
  //   .filter((f) => f.tags.some((t) => t.tag._id === params.tagId))
  //   .map((f) => transformFact(f));

  // const tag = tagFacts[0].tags.find((t) => t.tag._id === params.tagId)!;

  // const issues = getFactIssues(allFacts);

  // return {
  //   props: {
  //     issues,
  //     celeb,
  //     tagTimeline,
  //     tag,
  //     tagFacts,
  //   },
  //   revalidate: oneDay,
  // };
};
