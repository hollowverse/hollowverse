import yml from 'js-yaml';
import fs from 'fs';
import { join } from 'path';
import { notablePeoplePath } from '_r/pages/[notablePerson]/paths';
import matter from 'gray-matter';

import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { tagIconMap } from '_r/pages/[notablePerson]/tagIconMap';

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
      tags: data.tags.concat(data.occupations).map((text: string) => {
        const { icon, alt } = tagIconMap.find((record) => {
          return record.keywords.some((keyword) =>
            text.toLowerCase().includes(keyword),
          );
        })!;

        return { text, icon, alt };
      }),
    },
  };
};
