import { Logtail as NodeLogger } from '@logtail/node';

const sourceToken = 'dYdFDgoJXDixeVQhTrgob9cA';

const nodeLogger = new NodeLogger(sourceToken);

export const getStaticProps = async (context: any) => {
  try {
    await fetch(`https://vercel.com/${context.params.celeb}`);
  } catch (e) {}

  await nodeLogger.info('celebPage getStaticProps called', {
    celeb: context.params.celeb,
  });

  return {
    props: {
      celeb: {} as any,
    },
  };
};
