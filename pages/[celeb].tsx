import React from 'react';
import { CelebImage } from '~/components/CelebImage';
import { Page } from '~/components/Page';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

export default function Celeb(props: {}) {
  return <div>test</div>;
}

export { getStaticProps } from '~/lib/getStatic/celebPage.getStaticProps';
export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
