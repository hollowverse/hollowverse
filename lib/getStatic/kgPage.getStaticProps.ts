import groq from 'groq';
import { isEmpty } from 'lodash-es';
import { knowledgeGraphClient } from '~/lib/knowledgeGraphClient';
import { sanityClient } from '~/lib/sanityio';

const notFound = {
  notFound: true,
};

function queryHv(kgId: string) {
  return sanityClient.fetch(
    'knowledge-graph-page-celeb-check',
    groq`*[_type == 'celeb' && knowledgeGraphId == '$kg'][0]{'slug': slug.current}`,
    {
      kg: kgId,
    },
  );
}

export const getStaticProps = async ({
  params,
}: {
  params: { kg: string };
}) => {
  const kg = params?.kg[0];

  if (!kg) {
    return notFound;
  }

  const celeb = await queryHv(kg);

  if (celeb) {
    return {
      redirect: {
        destination: `/${celeb.slug}`,
        permanent: true,
      },
    };
  }

  const searchId = kg.split(':')[1];

  if (!searchId) {
    return notFound;
  }

  const kgCelebs = await knowledgeGraphClient({
    limit: 1,
    id: searchId,
    apiKey: process.env.KG_API_KEY || 'AIzaSyCDgM-p1fhbsf5HuRGCfZP2M9l_JQ0Vmbo',
  });

  if (isEmpty(kgCelebs)) {
    return notFound;
  }

  return {
    props: kgCelebs[0].result,
  };
};
