import yml from 'js-yaml';
import { join } from 'path';
import { notablePeoplePath, publicDir } from '_r/pages/[notablePerson]/paths';
import matter from 'gray-matter';
import fs from 'fs-extra';

import { remark } from 'remark';
import remarkHtml from 'remark-html';
// import { tagIconMap } from '_r/pages/[notablePerson]/tagIconMap';

const withPubDir = (s: string) => `${publicDir}/${s}`;

const loadNotablePersonData = (notablePerson: string) =>
  yml.load(
    fs.readFileSync(
      join(notablePeoplePath, notablePerson, `${notablePerson}.yaml`),
      'utf8',
    ),
  );

export const getStaticProps = async ({ params }: any) => {
  const data = loadNotablePersonData(params.notablePerson) as any;
  const editorialMd = fs.readFileSync(
    join(notablePeoplePath, params.notablePerson, `${params.notablePerson}.md`),
  );

  const editorialObj = matter(editorialMd);
  const editorial = {
    data: {
      ...editorialObj.data,
      slug: params.notablePerson,
      interestingProfiles: editorialObj.data.relatedPeople.map(
        (interestingProfileId: string) => {
          const data = loadNotablePersonData(interestingProfileId)!;
          return {
            ...(data as any),
            slug: interestingProfileId,
          };
        },
      ),
    },
    content: (
      await remark()
        .use(remarkHtml, { sanitize: false })
        .process(editorialObj.content)
    ).toString(),
  };

  const imageLinkWithoutExtension = `/images/notablePeople/${data.id}`;
  const jpg = `${imageLinkWithoutExtension}.jpg`;
  const jpeg = `${imageLinkWithoutExtension}.jpeg`;
  const png = `${imageLinkWithoutExtension}.png`;

  const imagePath = fs.existsSync(withPubDir(jpg))
    ? jpg
    : fs.existsSync(withPubDir(jpeg))
    ? jpeg
    : png;

  console.log('imagePath', imagePath);

  return {
    props: {
      data,
      editorial,
      pic: imagePath,
      // tags: data.tags.concat(data.occupations).map((text: string) => {
      //   const { icon, alt } = tagIconMap.find((record) => {
      //     return record.keywords.some((keyword) =>
      //       text.toLowerCase().includes(keyword),
      //     );
      //   })!;

      //   return { text, icon, alt };
      // }),
    },
  };
};
