import { Logtail as NodeLogger } from '@logtail/node';

const sourceToken = 'dYdFDgoJXDixeVQhTrgob9cA';

const nodeLogger = new NodeLogger(sourceToken);

export const getStaticProps = async (params: any) => {
  try {
    await fetch(`https://vercel.com/${params.celeb}`);
  } catch (e) {}

  await nodeLogger.info('celebPage getStaticProps called', {
    params: params.celeb,
  });

  return {
    props: {
      celeb: {} as any,
    },
  };
};
