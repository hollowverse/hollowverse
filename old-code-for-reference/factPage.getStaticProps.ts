import { oneDay } from '~/lib/date';
import { getCeleb } from '~/lib/getCeleb';
import { getCelebFacts } from '~/lib/getCelebFacts';
import { getFactForumData } from '~/lib/disabled/getFactForumData';
import { getFactIssues } from '~/lib/getFactIssues';
import { transformFact } from '~/lib/transformFact';
import { PageProps } from '~/shared/lib/types';

export type FactPageProps = PageProps<typeof getStaticProps>;

export async function getStaticProps({
  params,
}: {
  params: { slug: string; factId: string };
}) {
  if (!params.slug || !params.factId) {
    return { notFound: true };
  }

  const celeb = await getCeleb(params.slug);

  if (!celeb) {
    return { notFound: true };
  }

  const allFacts = await getCelebFacts(celeb._id);
  const fact = allFacts.find((f) => f._id === params.factId);

  if (!fact) {
    return {
      redirect: {
        destination: `/${params.slug}`,
        permanent: false,
      },
    };
  }

  const tag = fact.tags[0];
  const factForumData = await getFactForumData(fact.forumLink);
  const issues = getFactIssues(allFacts);

  return {
    props: {
      ...factForumData,
      issues,
      celeb,
      tag,
      fact: transformFact(fact),
    },
    revalidate: oneDay,
  };
}
