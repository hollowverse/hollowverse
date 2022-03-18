import { remark } from 'remark';
import remarkHtml from 'remark-html';
import {
  getImageLink,
  loadCelebOldContent,
  loadCeleb,
} from './getStaticProps.helpers';

export const getStaticProps = async ({
  params,
}: {
  params: { celeb: string };
}) => {
  const celeb = loadCeleb(params.celeb);
  const celebOldContentRaw = loadCelebOldContent(params.celeb);
  const celebOldContent = {
    ...celebOldContentRaw.data,

    article: (
      await remark()
        .use(remarkHtml, { sanitize: false })
        .process(celebOldContentRaw.content)
    ).toString(),

    relatedPeople: celebOldContentRaw.data.relatedPeople.map((slug: string) => {
      const celebYaml = loadCeleb(slug);

      return {
        name: celebYaml.name,
        slug,
        pic: getImageLink(celebYaml.id),
      };
    }),
  };

  const imagePath = getImageLink(celeb.id);

  return {
    props: {
      slug: params.celeb,
      celeb,
      celebOldContent,
      pic: imagePath,
    },
  };
};
