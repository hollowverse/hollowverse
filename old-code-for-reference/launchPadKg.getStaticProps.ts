import { isEmpty } from 'lodash-es';
import { oneDay } from '~/lib/date';
import { getKgSearchId, requestKgResult } from '~/lib/kgPage.getStaticProps';
import { getLaunchPadTags } from '~/lib/disabled/launchPadCeleb.getStaticProps';
import { log } from '~/shared/lib/log';

export const getStaticProps = async ({
  params,
}: {
  params: { kg: string };
}) => {
  log('info', `launchPad KG getStaticProps called: ${params.kg}`);

  const searchId = getKgSearchId(params.kg);

  if (!searchId) {
    return { notFound: true };
  }

  const kgCelebs = await requestKgResult(searchId);

  if (isEmpty(kgCelebs)) {
    return { notFound: true };
  }

  const celeb = kgCelebs[0].result;

  const tags = await getLaunchPadTags();

  return {
    props: {
      celebName: celeb.name,
      pathname: `/~kg/${encodeURIComponent(params.kg)}/lp`,
      tags,
    },
    revalidate: oneDay,
  };
};
