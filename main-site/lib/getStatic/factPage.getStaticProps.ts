import { format, parse } from 'date-fns';
import groq from 'groq';
import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { Celeb, celebProjection } from '~/lib/groq/celeb.projection';
import { Fact, factProjection } from '~/lib/groq/fact.projection';
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
  const fact = await sanityClient.fetch<Fact>(
    'fact-page-fact-data',
    groq`*[_type == 'fact' && _id == $factId && celeb._ref == $celebId][0]{
      ${factProjection}
    }`,
    {
      factId: params.factId,
      celebId: celeb._id,
    },
  );

  if (!fact) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      celeb,
      fact: {
        ...fact,
        date: format(parse(fact.date, 'yyyy-MM-dd', new Date()), 'd LLL yyyy'),
      },
    },
  };
};
