import groq from 'groq';
import { oneDay } from '~/lib/date';
import { getFactIssues } from '~/lib/getStatic/helpers/getFactIssues';
import { getFactForumData } from '~/lib/getStatic/helpers/getFactForumData';
import { transformFact } from '~/lib/getStatic/helpers/transformFact';
import { Celeb, celebProjection } from '~/lib/groq/celeb.projection';
import { Fact, factProjection } from '~/lib/groq/fact.projection';
import { orderOfIssuesGroq } from '~/lib/groq/orderOfIssues.groq';
import { OrderOfIssues } from '~/lib/groq/orderOfIssues.projection';
import { sanityClient } from '~/shared/lib/sanityio';
import { PageProps } from '~/shared/lib/types';

export type FactPageProps = PageProps<typeof getStaticProps>;

export async function getStaticProps({
  params,
}: {
  params: { slug: string; factId: string };
}) {
  const celeb = await sanityClient.fetch<Celeb>(
    'fact-page-celeb-data',
    groq`*[_type == 'celeb' && slug.current == $slug][0]{
      ${celebProjection}
    }`,
    {
      slug: params.slug,
    },
  );

  if (!celeb) {
    return {
      notFound: true,
    };
  }
  const fact = await sanityClient.fetch<Fact>(
    'fact-page-fact-data',
    groq`*[_type == 'fact' && _id == $factId && celeb._ref == $celebId][0]{
      ${factProjection}
    }`,
    {
      factId: params.factId,
      celebId: celeb._id,
    },
  )!;

  if (!fact) {
    return {
      notFound: true,
    };
  }

  const tag = fact.tags[0];

  const [factForumData, issues] = await Promise.all([
    getFactForumData(fact.forumLink),
    getFactIssues({ slug: params.slug }),
  ]);

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
