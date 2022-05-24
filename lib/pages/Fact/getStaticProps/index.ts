import { sanityClient } from '~/lib/pages/utils/sanityio';
import { groqCeleb } from '~/lib/pages/Fact/getStaticProps/groqCeleb';
import { groqFact } from '~/lib/pages/Fact/getStaticProps/groqFact'
import { format, parse } from 'date-fns'

export const getStaticProps = async ({
  params,
}: {
  params: { celeb: string, factId: string };
}) => {
  const celeb = await sanityClient.fetch(groqCeleb, { slug: params.celeb });
  const fact = await sanityClient.fetch(groqFact, { factId: params.factId, celebId: celeb._id })

  if (!celeb) {
    return {
      notFound: true,
    };
  }

  const placeholderImage = await sanityClient.getDocument('image-98dc320a756a3f0f5dc40a59ced1194619719a60-225x225-png');

  return {
    props: {
      celeb,
      fact: {
        ...fact,
        date: format(parse(fact.date, 'yyyy-MM-dd', new Date()), 'd LLL yyyy')
      },
      placeholderImage,
    },
  };
};
