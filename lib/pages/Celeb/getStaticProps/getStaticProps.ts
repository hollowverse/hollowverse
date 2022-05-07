import groq from 'groq';
import { sanityClient } from '~/lib/pages/utils/sanityio';
import { factsDataTransform } from '~/lib/pages/Celeb/getStaticProps/factsDataTransform';
import { getParsedOldContent } from '~/lib/pages/Celeb/getStaticProps/getParsedOldContent';
import { getTags } from '~/lib/pages/Celeb/getStaticProps/getTags';
import { groqCeleb } from '~/lib/pages/Celeb/getStaticProps/groqCeleb';

export const getStaticProps = async ({
  params,
}: {
  params: { celeb: string };
}) => {
  const celeb = await sanityClient.fetch(groqCeleb, { slug: params.celeb });

  if (!celeb) {
    return {
      notFound: true,
    };
  }

  const { oldContent, facts, ...rest } = celeb;
  const [placeholderImage, orderOfTopics, parsedOldContent] = await Promise.all(
    [
      sanityClient.getDocument(
        'image-98dc320a756a3f0f5dc40a59ced1194619719a60-225x225-png',
      ),

      sanityClient.fetch(
        groq`
        *[_type == 'orderOfTopics'][0]{
          'topics': topics[]->{name}.name
        }.topics
      `,
      ),
      oldContent ? await getParsedOldContent(oldContent) : null,
    ],
  );

  const transformedFacts = factsDataTransform(facts, orderOfTopics);
  const tags = getTags(transformedFacts, orderOfTopics);

  return {
    props: {
      celeb: {
        ...rest,
        tags,
        facts: transformedFacts,
        oldContent: parsedOldContent,
      },
      placeholderImage,
    },
  };
};
