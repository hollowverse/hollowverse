import { oneDay } from '~/lib/date';
import { getCeleb } from '~/lib/getStatic/helpers/getCeleb';
import { getCelebFacts } from '~/lib/getStatic/helpers/getCelebFacts';
import { getFactForumData } from '~/lib/getStatic/helpers/getFactForumData';
import { getFactIssues } from '~/lib/getStatic/helpers/getFactIssues';
import { notFound } from '~/lib/getStatic/helpers/notFound';
import { transformFact } from '~/lib/getStatic/helpers/transformFact';
import { PageProps } from '~/shared/lib/types';

export type FactPageProps = PageProps<typeof getStaticProps>;

export async function getStaticProps({
  params,
}: {
  params: { slug: string; factId: string };
}) {
  if (!params.slug || !params.factId) {
    return notFound;
  }

  const celeb = await getCeleb(params.slug);

  if (!celeb) {
    return notFound;
  }

  const allFacts = await getCelebFacts(celeb._id);
  const fact = allFacts.find((f) => f._id == params.factId);

  if (!fact) {
    return notFound;
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
