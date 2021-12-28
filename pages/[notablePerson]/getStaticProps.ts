import { remark } from 'remark';
import remarkHtml from 'remark-html';
import {
  getImageLink,
  loadNotablePersonMd,
  loadNotablePersonYaml,
} from './getStaticProps.helpers';

export const getStaticProps = async ({
  params,
}: {
  params: { notablePerson: string };
}) => {
  const notablePersonYaml = loadNotablePersonYaml(params.notablePerson);
  const preNotablePersonMd = loadNotablePersonMd(params.notablePerson);
  const notablePersonMd = {
    content: (
      await remark()
        .use(remarkHtml, { sanitize: false })
        .process(preNotablePersonMd.content)
    ).toString(),

    data: {
      ...preNotablePersonMd.data,
      relatedPeople: preNotablePersonMd.data.relatedPeople.map(
        (slug: string) => {
          const notablePersonYaml = loadNotablePersonYaml(slug);

          return {
            name: notablePersonYaml.name,
            slug,
            pic: getImageLink(notablePersonYaml.id),
          };
        },
      ),
    },
  };

  const imagePath = getImageLink(notablePersonYaml.id);

  return {
    props: {
      slug: params.notablePerson,
      notablePersonYaml,
      notablePersonMd,
      pic: imagePath,
    },
  };
};
