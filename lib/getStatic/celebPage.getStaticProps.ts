import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { CelebGroqResponse, celebPageGroq } from '~/lib/groq/celebPage.groq';
import { log } from '~/lib/log';
import { sanityClient } from '~/lib/sanityio';
import { Logtail as NodeLogger } from '@logtail/node';

const sourceToken = 'dYdFDgoJXDixeVQhTrgob9cA';

// const browserLogger = new BrowserLogger(sourceToken);
const nodeLogger = new NodeLogger(sourceToken);

export type CelebPageProps = NonNullable<
  UnwrapPromise<ReturnType<typeof getStaticProps>>['props']
>;

export const getStaticProps = async ({
  params,
}: {
  params: { celeb: string };
}) => {
  console.log('=\nFILE: celebPage.getStaticProps.ts\nLINE: 15\n=');
  await log(true).info('celebPage getStaticProps called', {
    celeb: params.celeb,
  });

  const celeb = (await sanityClient.fetch('celeb-page-data', celebPageGroq, {
    slug: params.celeb,
  })) as CelebGroqResponse | null;

  if (!celeb) {
    return {
      notFound: true,
    };
  }

  const { oldContent, facts, ...rest } = celeb;

  return {
    props: {
      celeb: {
        ...rest,
      } as any,
    },
  };
};
