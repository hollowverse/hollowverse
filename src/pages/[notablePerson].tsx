import React from 'react';
import NotablePerson from '_s/app/NotablePerson/NotablePerson';
import editorial from './editorial.md';
import { NotablePersonData, Pic } from '_s/app/types';

// Data imports
import notablePersonData from './data.yml';
import interestingProfileData1 from '../sarah-michelle-gellar/data.yml';
import interestingProfileData2 from '../chelsea-handler/data.yml';
import interestingProfileData3 from '../rachel-bilson/data.yml';
import interestingProfileData4 from '../jamie-lee-curtis/data.yml';

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
