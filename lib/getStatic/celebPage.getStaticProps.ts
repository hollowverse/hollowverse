import { Logtail as NodeLogger } from '@logtail/node';
import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
// import { log } from '~/lib/log';

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
  try {
    await fetch(
      'http://d7dd-2600-1700-2ec0-ce70-c023-978d-5a86-26ac.ngrok.io/',
    );
  } catch (e) {}

  await nodeLogger.info('celebPage getStaticProps called', {
    celeb: params.celeb,
  });

  // const celeb = (await sanityClient.fetch('celeb-page-data', celebPageGroq, {
  //   slug: params.celeb,
  // })) as CelebGroqResponse | null;

  // if (!celeb) {
  //   return {
  //     notFound: true,
  //   };
  // }

  // const { oldContent, facts, ...rest } = celeb;

  return {
    props: {
      celeb: {
        // ...rest,
      } as any,
    },
  };
};
