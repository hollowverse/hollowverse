import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { factsDataTransform } from '~/lib/factsDataTransform';
import { getParsedOldContent } from '~/lib/getParsedOldContent';
import { getTags } from '~/lib/getTags';
import { CelebGroqResponse, celebPageGroq } from '~/lib/groq/celebPage.groq';
import {
  orderOfTopicsGroq,
  OrderOfTopics,
} from '~/lib/groq/orderOfTopics.groq';
import { sanityClient } from '~/lib/sanityio';

export type CelebPageProps = NonNullable<
  UnwrapPromise<ReturnType<typeof getStaticProps>>['props']
>;

export const getStaticProps = async ({
  params,
}: {
  params: { celeb: string };
}) => {
  const celeb = (await sanityClient.fetch(celebPageGroq, {
    slug: params.celeb,
  })) as CelebGroqResponse | null;

  if (!celeb) {
    return {
      notFound: true,
    };
  }

  const { oldContent, facts, ...rest } = celeb;
  const [orderOfTopics, parsedOldContent] = await Promise.all([
    sanityClient.fetch(orderOfTopicsGroq) as Promise<OrderOfTopicsGroqResponse>,
    oldContent ? await getParsedOldContent(oldContent) : null,
  ]);

  const transformedFacts = factsDataTransform(facts, OrderOfTopics
  const tags = getTags(transformedFacts, orderOfTopics);

  return {
    props: {
      celeb: {
        ...rest,
        tags,
        facts: transformedFacts,
        oldContent: parsedOldContent,
      },
    },
  };
};
