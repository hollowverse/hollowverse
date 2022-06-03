import { Logtail as NodeLogger } from '@logtail/node';

const sourceToken = 'dYdFDgoJXDixeVQhTrgob9cA';

const nodeLogger = new NodeLogger(sourceToken);

export const getStaticProps = async (context: any) => {
  /**
   * HIT ANY URL HERE.
   * Below I hit my logtail end point. It's getting called 3 times
   * each time I visit a /[celeb] URL.
   */
  await nodeLogger.info('celebPage getStaticProps called', {
    celeb: context.params.celeb,
  });

  return {
    props: {
      celeb: {} as any,
    },
  };
};
