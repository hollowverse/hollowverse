import React from 'react';
import { sanityClient } from '~/shared/lib/sanityio';

export default function TestBuildError() {
  return <div>This will never render.</div>;
}

export const getStaticProps = async () => {
  const celeb = await sanityClient.fetch<any>(
    'test-build-error-page',
    `*[_type == 'celeb' && _id == 'hahahahaha!!!111!'][0]{name}`,
  );

  return {
    props: {
      name: celeb.has.name,
    },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
