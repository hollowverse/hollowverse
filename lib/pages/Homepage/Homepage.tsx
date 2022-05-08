import React from 'react';
import { CelebGallery } from '~/lib/pages/components/CelebGallery';
import { sanityClient } from '~/lib/pages/utils/sanityio';
import { AppBar } from '~/lib/pages/_app/AppBar';
import { top100CelebSlugs } from './top100CelebSlugs';

export const Index = (p: any) => {
  return (
    <>
      <AppBar />

      <div className="bg-gray-100 text-neutral-600">
        <h1 className="mx-auto max-w-4xl pt-5 pb-5 pl-3 text-2xl font-semibold lg:pl-0">
          Top 100 Celebs
        </h1>
        <CelebGallery celebGalleryItems={p.top100Celebs} />
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const top100Celebs = (await sanityClient.fetch(
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
