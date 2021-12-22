import yml from 'js-yaml';
import fs from 'fs';
import { join } from 'path';
import { publishedNotablePeople } from '_r/publishedNotablePeople';
import { notablePeoplePath } from '_l/paths';
import matter from 'gray-matter';

import NotablePerson from '_l/NotablePerson/NotablePerson';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { attributeIconMap } from '_l/attributeIconMap';

export default ({ data, editorial, pic, attributes }: any) => {
  return (
    <NotablePerson
      data={data}
      pic={pic}
      editorial={editorial}
      attributes={attributes}
    ></NotablePerson>
  );
};

const loadNotablePersonData = (notablePerson: string) =>
  yml.load(
    fs.readFileSync(join(notablePeoplePath, notablePerson, 'data.yml'), 'utf8'),
  );

export const getStaticProps = async ({ params }: any) => {
  const data = loadNotablePersonData(params.notablePerson) as any;
  const editorialMd = fs.readFileSync(
    join(notablePeoplePath, params.notablePerson, 'editorial.md'),
  );

  const editorialObj = matter(editorialMd);
  const editorial = {
    data: {
      ...editorialObj.data,
      interestingProfiles: editorialObj.data.interestingProfileIds.map(
        (interestingProfileId: string) => {
          return loadNotablePersonData(interestingProfileId);
        },
      ),
    },
    content: (
      await remark().use(remarkHtml).process(editorialObj.content)
    ).toString(),
  };

  return {
    props: {
      data,
      editorial,
      pic: `/images/notablePeople/${data.id}.jpg`,
      attributes: data.attributes
        .concat(data.occupations)
        .map((text: string) => {
          const { icon, alt } = attributeIconMap.find((record) => {
            return record.keywords.some((keyword) =>
              text.toLowerCase().includes(keyword),
            );
          })!;

          return { text, icon, alt };
        }),
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: publishedNotablePeople.map((notablePerson) => {
      return { params: { notablePerson } };
    }),
    fallback: false,
  };
};
