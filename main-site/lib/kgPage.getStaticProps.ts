import groq from 'groq';
import { isEmpty } from 'lodash-es';
import { oneWeek, oneYear } from '~/lib/date';
import { knowledgeGraphClient } from '~/shared/lib/knowledgeGraphClient';
import { sanityClient } from '~/shared/lib/sanityio';

const notFound = {
  notFound: true,
};

function queryHv(kgId: string) {
  return sanityClient.fetch<{ slug: string }>(
    'knowledge-graph-page-celeb-check',
    groq`*[_type == 'celeb' && knowledgeGraphId == $kgId][0]{'slug': slug.current}`,
    {
      kgId: kgId,
    },
  );
}

export function getKgSearchId(kgId: string) {
  return kgId.split(':')[1];
}

export function requestKgResult(kgSearchId: string) {
  return knowledgeGraphClient({
    limit: 1,
    id: kgSearchId,
    apiKey: process.env.KG_API_KEY || 'AIzaSyCDgM-p1fhbsf5HuRGCfZP2M9l_JQ0Vmbo',
  });
}

export const getStaticProps = async ({
  params,
}: {
  params: { kg: string };
}) => {
  const kg = params.kg;

  const celeb = await queryHv(kg);

  if (celeb) {
    return {
      redirect: {
        destination: `/${celeb.slug}`,
        permanent: true,
      },
    };
  }

  const searchId = getKgSearchId(kg);

  if (!searchId) {
    return notFound;
  }

  const kgCelebs = await requestKgResult(searchId);

  if (isEmpty(kgCelebs)) {
    return notFound;
  }

  return {
    props: kgCelebs[0].result,
    revalidate: oneYear,
  };
};
