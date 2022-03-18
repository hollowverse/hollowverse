import { remark } from 'remark';
import remarkHtml from 'remark-html';
import {
  getImageLink,
  loadCelebMd,
  loadCelebYaml,
} from './getStaticProps.helpers';

export const getStaticProps = async ({
  params,
}: {
  params: { celeb: string };
}) => {
  const celebYaml = loadCelebYaml(params.celeb);
  const preCelebMd = loadCelebMd(params.celeb);
  const celebMd = {
    content: (
      await remark()
        .use(remarkHtml, { sanitize: false })
        .process(preCelebMd.content)
    ).toString(),

    data: {
      ...preCelebMd.data,
      relatedPeople: preCelebMd.data.relatedPeople.map((slug: string) => {
        const celebYaml = loadCelebYaml(slug);

        return {
          name: celebYaml.name,
          slug,
          pic: getImageLink(celebYaml.id),
        };
      }),
    },
  };

  const imagePath = getImageLink(celebYaml.id);

  return {
    props: {
      slug: params.celeb,
      celebYaml,
      celebMd,
      pic: imagePath,
    },
  };
};
