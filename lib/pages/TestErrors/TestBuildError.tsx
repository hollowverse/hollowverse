import React from 'react';
import { sanityClient } from '~/lib/pages/utils/sanityio';

export const TestBuildError = () => {
  return <div>This will never render.</div>;
};

export const getStaticProps = async () => {
  const celeb = await sanityClient.fetch(
    `*[_type == 'celeb' && _id == 'hahahahaha!!!111!'][0]{name}`,
  );

  return {
    props: {
      name: celeb.has.name,
    },
  };
};
