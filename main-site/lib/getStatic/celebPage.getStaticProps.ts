import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { factsDataTransform } from '~/lib/factsDataTransform';
import { getParsedOldContent } from '~/lib/getParsedOldContent';
import { getTags } from '~/lib/getTags';
import { CelebGroqResponse, celebPageGroq } from '~/lib/groq/celebPage.groq';
import {
  orderOfIssuesGroq,
  OrderOfIssues as TOrderOfIssues,
} from '~/lib/groq/orderOfIssues.groq';
import { logger } from '~/shared/lib/log';
import { sanityClient } from '~/shared/lib/sanityio';

export type CelebPageProps = NonNullable<
  UnwrapPromise<ReturnType<typeof getStaticProps>>['props']
>;

export const getStaticProps = async ({
  params,
}: {
  params: { celeb: string };
}) => {
  logger.info(`celebPage getStaticProps called: ${params.celeb}`);

  const celeb = (await sanityClient.fetch('celeb-page-data', celebPageGroq, {
    slug: params.celeb,
  })) as CelebGroqResponse | null;

  if (!celeb) {
    return {
      notFound: true,
    };
  }

  const { oldContent, facts, ...rest } = celeb;
  const [orderOfIssues, parsedOldContent] = await Promise.all([
    sanityClient.fetch(
      'order-of-issues',
      orderOfIssuesGroq,
    ) as Promise<TOrderOfIssues>,
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
