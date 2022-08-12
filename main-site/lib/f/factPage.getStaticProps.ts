import { oneDay } from '~/lib/date';
import { getCeleb } from '~/lib/g/getCeleb';
import { getCelebFacts } from '~/lib/g/getCelebFacts';
import { getFactForumData } from '~/lib/g/getFactForumData';
import { getFactIssues } from '~/lib/g/getFactIssues';
import { transformFact } from '~/lib/t/transformFact';
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
