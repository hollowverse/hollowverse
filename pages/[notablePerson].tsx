import yml from 'js-yaml';
import fs from 'fs';
import { join } from 'path';
import { publishedNotablePeople } from '_r/publishedNotablePeople';
import { notablePeoplePath } from '_l/paths';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

import NotablePerson from '_l/NotablePerson/NotablePerson';
import { NotablePersonData, Pic } from '_l/types';

// // Data imports
// import notablePersonData from './data.yml';
// import interestingProfileData1 from '../sarah-michelle-gellar/data.yml';
// import interestingProfileData2 from '../chelsea-handler/data.yml';
// import interestingProfileData3 from '../rachel-bilson/data.yml';
// import interestingProfileData4 from '../jamie-lee-curtis/data.yml';

export default ({ data, editorial, pic }: any) => {
  return (
    <NotablePerson
      data={data as NotablePersonData}
      pic={pic as Pic}
      editorial={editorial}
      // interestingProfiles={[
      //   [
      //     interestingProfileData1 as NotablePersonData,
      //     data.interestingProfilePic1 as Pic,
      //   ],
      //   [
      //     interestingProfileData2 as NotablePersonData,
      //     data.interestingProfilePic2 as Pic,
      //   ],
      //   [
      //     interestingProfileData3 as NotablePersonData,
      //     data.interestingProfilePic3 as Pic,
      //   ],
      //   [
      //     interestingProfileData4 as NotablePersonData,
      //     data.interestingProfilePic4 as Pic,
      //   ],
      // ]}
    ></NotablePerson>
  );
};

export const getStaticProps = async ({ params }: any) => {
  const data = yml.load(
    fs.readFileSync(
      join(notablePeoplePath, params.notablePerson, 'data.yml'),
      'utf8',
    ),
  );
  const editorialMd = fs.readFileSync(
    join(notablePeoplePath, params.notablePerson, 'editorial.md'),
  );
  const editorialHtml = (
    await remark().use(remarkHtml).process(editorialMd)
  ).toString();

  return {
    props: {
      data,
      editorial: editorialHtml,
      pic: `/images/notablePeople/${(data as any).id}.jpg`,
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
