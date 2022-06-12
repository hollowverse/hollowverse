import { isEmpty } from 'lodash-es';
import {
  getKgSearchId,
  requestKgResult,
} from '~/lib/getStatic/kgPage.getStaticProps';
import { getLaunchPadTopics } from '~/lib/getStatic/launchPadCeleb.getStaticProps';
import { log } from '~/shared/lib/log';
import { ResearcherLaunchPadProps } from '~/pages/[celeb]/lp';

export const getStaticProps = async ({
  params,
}: {
  params: { kg: string };
}): Promise<{ props: ResearcherLaunchPadProps } | { notFound: boolean }> => {
  log('info', 'launchPad KG getStaticProps called', [params.kg]);

  const searchId = getKgSearchId(params.kg);

  if (!searchId) {
    return { notFound: true };
  }

  const kgCelebs = await requestKgResult(searchId);

  if (isEmpty(kgCelebs)) {
    return { notFound: true };
  }

  const celeb = kgCelebs[0].result;

  const topics = await getLaunchPadTopics();

  return {
    props: {
      celebName: celeb.name,
      pathname: `~kg/${encodeURIComponent(params.kg)}/lp`,
      topics,
    },
  };
};
