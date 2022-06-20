import groq from 'groq';
import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { factsDataTransform } from '~/lib/factsDataTransform';
import { getParsedOldContent } from '~/lib/getParsedOldContent';
import { getTags } from '~/lib/getTags';
import { Celeb, celebProjection } from '~/lib/groq/celeb.projection';
import { Fact, factProjection } from '~/lib/groq/fact.projection';
import {
  OrderOfIssues,
  orderOfIssuesProjection,
} from '~/lib/groq/orderOfIssues.projection';
import { log } from '~/shared/lib/log';
import { sanityClient } from '~/shared/lib/sanityio';

export type CelebPageProps = NonNullable<
  UnwrapPromise<ReturnType<typeof getStaticProps>>['props']
>;

export type CelebGroqResponse = Celeb & {
  oldContent: string;
  facts: Fact[];
};

export const getStaticProps = async ({
  params,
}: {
  params: { celeb: string };
}) => {
  log('info', `celebPage getStaticProps called: ${params.celeb}`);

  const celeb = await sanityClient.fetch<CelebGroqResponse>(
    'celeb-page-data',
    groq`*[_type == 'celeb' && slug.current == $slug][0]{
      ${celebProjection},
      oldContent,
      'facts': *[_type == 'fact' && celeb._ref == ^._id]  | order(date desc) {
        ${factProjection}
      }
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

  const { oldContent, facts, ...rest } = celeb;
  const [orderOfIssues, parsedOldContent] = await Promise.all([
    sanityClient.fetch<OrderOfIssues>(
      'order-of-issues',
      groq`*[_type == 'orderOfTopics'][0]{
        'issues': ${orderOfIssuesProjection}
      }.issues`,
    )!,
    oldContent ? await getParsedOldContent(oldContent) : null,
  ]);

  const transformedFacts = factsDataTransform(facts, orderOfIssues);
  const tags = getTags(facts, orderOfIssues);

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
