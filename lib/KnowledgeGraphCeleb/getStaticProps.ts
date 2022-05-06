import groq from 'groq';
import { knowledgeGraphClient } from '~/lib/components/knowledgeGraphClient';
import { sanityClient } from '~/lib/components/sanityio';

const notFound = {
  notFound: true,
};

function queryHv(kgId: string) {
  return sanityClient.fetch(
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

  const kgCeleb = await knowledgeGraphClient({
    limit: 1,
    id: searchId,
    apiKey: process.env.KG_API_KEY || 'AIzaSyCDgM-p1fhbsf5HuRGCfZP2M9l_JQ0Vmbo',
  });

  if (!kgCeleb?.[0]) {
    return notFound;
  }

  return {
    props: {
      kgCeleb: kgCeleb[0],
    },
  };
};
