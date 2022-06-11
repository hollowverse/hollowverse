import { sanityClient } from '~/lib/sanityio';
import {
  FactPageCelebGroq,
  factPageCelebGroq,
} from '~/lib/groq/factPageCeleb.groq';
import { FactPageGroq, factPageGroq } from '~/lib/groq/factPage.groq';
import { format, parse } from 'date-fns';
import { UnwrapPromise } from 'next/dist/lib/coalesced-function';

export type FactPageProps = NonNullable<
  UnwrapPromise<ReturnType<typeof getStaticProps>>['props']
>;

export const getStaticProps = async ({
  params,
}: {
  params: { celeb: string; factId: string };
}) => {
  const celeb = (await sanityClient.fetch(
    'fact-page-celeb-data',
    factPageCelebGroq,
    {
      slug: params.celeb,
    },
  )) as FactPageCelebGroq | null;

  if (!celeb) {
    return {
      notFound: true,
    };
  }
  const fact = (await sanityClient.fetch('fact-page-fact-data', factPageGroq, {
    factId: params.factId,
    celebId: celeb._id,
  })) as FactPageGroq | null;

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
