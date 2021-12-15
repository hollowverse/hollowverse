import React from 'react';
import NotablePerson from '_c/NotablePerson/NotablePerson';
import editorial from './editorial.md';
import { graphql } from 'gatsby';
import { NotablePersonData, Pic } from '_c/types';

// Data imports
import notablePersonData from './data.yml';
import interestingProfileData1 from '../sarah-michelle-gellar/data.yml';
import interestingProfileData2 from '../chelsea-handler/data.yml';
import interestingProfileData3 from '../rachel-bilson/data.yml';
import interestingProfileData4 from '../jamie-lee-curtis/data.yml';

export const query = graphql`
  query NotablePersonPageQuery {
    pic: file(relativePath: { eq: "alyson-hannigan/pic.jpg" }) {
      childImageSharp {
        gatsbyImageData(width: 150)
      }
    }

    interestingProfilePic1: file(
      relativePath: { eq: "sarah-michelle-gellar/pic.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData(width: 150)
      }
    }

    interestingProfilePic2: file(
      relativePath: { eq: "chelsea-handler/pic.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData(width: 150)
      }
    }

    interestingProfilePic3: file(
      relativePath: { eq: "rachel-bilson/pic.png" }
    ) {
      childImageSharp {
        gatsbyImageData(width: 150)
      }
    }

    interestingProfilePic4: file(
      relativePath: { eq: "jamie-lee-curtis/pic.jpg" }
    ) {
      childImageSharp {
        gatsbyImageData(width: 150)
      }
    }
  }
`;

export default ({ data }: any) => {
  return (
    <NotablePerson
      data={notablePersonData as NotablePersonData}
      pic={data.pic as Pic}
      editorial={editorial}
      interestingProfiles={[
        [
          interestingProfileData1 as NotablePersonData,
          data.interestingProfilePic1 as Pic,
        ],
        [
          interestingProfileData2 as NotablePersonData,
          data.interestingProfilePic2 as Pic,
        ],
        [
          interestingProfileData3 as NotablePersonData,
          data.interestingProfilePic3 as Pic,
        ],
        [
          interestingProfileData4 as NotablePersonData,
          data.interestingProfilePic4 as Pic,
        ],
      ]}
    ></NotablePerson>
  );
};
