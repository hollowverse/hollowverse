import React from 'react';
import { CelebGallery } from '~/lib/components/CelebGallery';
import { sanityClient } from '~/lib/components/sanityio';
import { top100CelebSlugs } from './top100CelebSlugs';

export const Index = (p: any) => {
  return (
    <main className="mx-auto max-w-home-container ">
      <h2 className="px-4 font-primary text-black font-semibold text-xl py-4">
        Top 100 Celebrities
      </h2>

      <CelebGallery celebGalleryItems={p.top100Celebs} />
    </main>
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
