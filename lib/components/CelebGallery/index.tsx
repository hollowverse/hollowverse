import React from 'react';
import Image from 'next/image';
import { sanityImage } from '~/lib/components/sanityio';
import { TCelebGalleryItem } from '~/lib/components/types';
import { useCelebContext } from '~/lib/components/StaticPropsContextProvider';
import { useRouter } from 'next/router';
import clsx from 'clsx';

export const CelebGallery: React.FC<{
  celebGalleryItems: TCelebGalleryItem[];
}> = (p) => {
  const context = useCelebContext();
  const router = useRouter();
  const isHomepage = router.pathname == '/';

  return (
    <div
      className={clsx(
        'transition-all duration-[400ms] container mx-auto flex flex-wrap gap-4 items-center justify-center w-full',
      )}
    >
      {p.celebGalleryItems.map((celebData) => {
        const picture = celebData.picture || context.placeholderImage;

        return (
          <a
            className="celeb-card flex items-center justify-center overflow-hidden rounded-xl max-w-celeb-image w-full"
            href={`/${celebData.slug}`}
            key={celebData.slug}
          >
            <div className="relative w-full">
              <Image
                objectFit="cover"
                objectPosition="center"
                blurDataURL={picture.metadata.lqip}
                placeholder="blur"
                src={sanityImage(picture).url()}
                alt={celebData.name}
                layout="responsive"
                width={200}
                height={225}
              />

              <p className="font-primary absolute bottom-3 left-3 font-semibold text-white z-10 text-sm">
                {celebData.name}
              </p>

              {/* overlay */}
              <div className="pointer-events-none absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent via-transparent to-black block" />
            </div>
          </a>
        );
      })}
    </div>
  );
};
