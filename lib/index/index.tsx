import React from 'react';
import { CelebGallery } from '~/lib/components/CelebGallery';
import { sanityClient } from '~/lib/components/sanityio';
import { top100CelebSlugs } from './top100CelebSlugs';

export const Index = (p: any) => {
  return (
    <>
      <div className="bg-gray-100 text-neutral-700">
        <div className="mx-auto max-w-5xl pt-5 pb-10 pl-3 text-2xl font-semibold tracking-tight lg:pl-0">
          Top 100 Celebs
        </div>
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
