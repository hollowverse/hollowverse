import { uniq } from 'lodash-es';
import React from 'react';
import { CelebGallery } from '~/components/CelebGallery';
import { Page } from '~/components/Page';
import { sanityClient } from '~/lib/sanityio';
import { top100CelebSlugs as _top100CelebSlugs } from '../lib/top100CelebSlugs';

const top100CelebSlugs = uniq(_top100CelebSlugs);

export default function Index(p: any) {
  return (
    <Page
      title="The religions and political views of celebrities"
      description="Hollowverse tracks the religions and political views of celebrities"
      pathname=""
      allowSearchEngines
      className="text-neutral-600"
    >
      <div className="h-container">
        <div className="mx-5">
          <h1 className="pt-5 pb-5 text-2xl font-semibold">Top Celebrities</h1>
          <CelebGallery prefetch={false} celebGalleryItems={p.top100Celebs} />
        </div>
      </div>
    </Page>
  );
}

export const getStaticProps = async () => {
  const top100Celebs = (await sanityClient.fetch(
    'homepage-top-100-celebs',
    `*[_type == 'celeb' && slug.current in $slugs]{
      name,
      'slug': slug.current,
      'picture': picture.asset->{_id, 'metadata': {'lqip': metadata.lqip, 'palette': metadata.palette}}
    }`,
    { slugs: top100CelebSlugs },
  )) as any[];

  top100Celebs.sort((a, b) => {
    return top100CelebSlugs.indexOf(a.slug) - top100CelebSlugs.indexOf(b.slug);
  });

  return {
    props: {
      top100Celebs,
    },
  };
};
