import groq from 'groq';
import { uniq } from 'lodash-es';
import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { getFactForumData } from '~/lib/getStatic/getFactForumData';
import { getRelatedCelebs } from '~/lib/getStatic/getRelatedCelebs';
import { Celeb, celebProjection } from '~/lib/groq/celeb.projection';
import { Fact, factProjection } from '~/lib/groq/fact.projection';
import { orderOfIssuesGroq } from '~/lib/groq/orderOfIssues.groq';
import { OrderOfIssues } from '~/lib/groq/orderOfIssues.projection';
import { sanityClient } from '~/shared/lib/sanityio';

export type FactPageProps = NonNullable<
  UnwrapPromise<ReturnType<typeof getStaticProps>>['props']
>;

export const getStaticProps = async ({
  params,
}: {
  params: { celeb: string; factId: string };
}) => {
  const celeb = await sanityClient.fetch<Celeb>(
    'fact-page-celeb-data',
    groq`*[_type == 'celeb' && slug.current == $slug][0]{
      ${celebProjection}
    }`,
    {
      slug: params.celeb,
    },
  );

  if (!celeb) {
    return {
      notFound: true,
    };
  }
  const results = await sanityClient.fetch<{
    fact: Fact | null;
    orderOfIssues: OrderOfIssues;
  }>(
    'fact-page-fact-data',
    groq`{
      'fact': *[_type == 'fact' && _id == $factId && celeb._ref == $celebId][0]{
        ${factProjection}
      },
      'orderOfIssues': ${orderOfIssuesGroq}
    }`,
    {
      factId: params.factId,
      celebId: celeb._id,
    },
  )!;

  const { fact, orderOfIssues } = results;

  if (!fact) {
    return {
      notFound: true,
    };
  }

  const tag = fact.tags[0];

  const [relatedCelebs, factForumData] = await Promise.all([
    getRelatedCelebs(
      tag.tag._id,
      tag.tag.issue._id,
      params.celeb,
      uniq([tag.tag.issue.name, ...orderOfIssues]),
    ),
    getFactForumData(fact.forumLink),
  ]);

  return {
    props: {
      ...factForumData,
      ...relatedCelebs,
      celeb,
      tag,
      fact,
    },
  };
};
