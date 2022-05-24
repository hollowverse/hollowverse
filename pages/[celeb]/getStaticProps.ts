import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { factsDataTransform } from '~/lib/factsDataTransform';
import { getParsedOldContent } from '~/lib/getParsedOldContent';
import { getTags } from '~/lib/getTags';
import { CelebGroqResponse, groqCeleb } from '~/lib/groq/celeb.groq';
import {
  orderOfTopicsGroq,
  OrderOfTopicsGroqResponse,
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
  const celeb = (await sanityClient.fetch(groqCeleb, {
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

  const transformedFacts = factsDataTransform(facts, orderOfTopics);
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
