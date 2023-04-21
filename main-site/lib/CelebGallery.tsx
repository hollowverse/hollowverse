import React from 'react';
import { c } from '~/lib/c';
import { CelebImage } from '~/lib/CelebImage';
import { CelebPageMainProps } from '~/lib/celebPageMain.getStaticProps';
import { Link } from '~/lib/Link';

export const CelebGallery: React.FC<{
  celebGalleryItems: NonNullable<
    CelebPageMainProps['celeb']['oldContent']
  >['relatedPeople'];
  prefetch?: boolean;
  className?: string;
}> = (props) => {
  return (
    <div className={c('flex flex-wrap justify-center', props.className)}>
      {props.celebGalleryItems.map((celebData) => {
        const picture = celebData.picture;

        return (
          <Link
            href={`/${celebData.slug}`}
            passHref
            key={celebData.slug}
            /* Next.js `prefetches` by default and complains when you pass `true`, so we pass `undefined`. */
            prefetch={props.prefetch === false ? false : undefined}
          >
            <a
              title={`${celebData.name}'s political views`}
              className={c(
                'celeb-gallery-item min-w-[150px] max-w-[150px] flex-shrink flex-grow basis-[150px] overflow-hidden',
              )}
            >
              <div className="relative z-0 w-full">
                <CelebImage
                  key={celebData.slug + '-image'}
                  picture={picture}
                  name={celebData.name}
                />

                <p className="font-primary absolute bottom-3 left-3 z-10 text-sm font-semibold text-white">
                  {celebData.name}
                </p>

                {/* overlay */}
                <div className="pointer-events-none absolute top-0 left-0 block h-full w-full bg-gradient-to-b from-transparent via-transparent to-black" />
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};
