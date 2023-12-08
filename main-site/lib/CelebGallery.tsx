import React, { Fragment, useRef, useState } from 'react';
import AdUnit from '~/lib/AdUnit';
import { c } from '~/lib/c';
import { CelebImage } from '~/lib/CelebImage';
import { CelebPageMainProps } from '~/lib/celebPageMain.getStaticProps';
import { Link } from '~/lib/Link';
import useIsomorphicLayoutEffect from '~/lib/useIsomorphicLayoutEffect';

export const CelebGallery: React.FC<{
  celebGalleryItems: NonNullable<
    CelebPageMainProps['celeb']['oldContent']
  >['relatedPeople'];
  prefetch?: boolean;
  className?: string;
}> = (props) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [itemsPerRow, setItemsPerRow] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const firstItem = gallery.firstChild as HTMLElement;
    if (!firstItem) return;

    const itemWidth = firstItem.offsetWidth;
    const galleryWidth = gallery.offsetWidth;
    const itemsPerRowWidth = Math.floor(galleryWidth / itemWidth);

    setItemsPerRow(itemsPerRowWidth);
  }, []);

  return (
    <div
      ref={galleryRef}
      className={c('flex flex-wrap justify-center', props.className)}
    >
      {props.celebGalleryItems.map((celebData, index) => {
        const picture = celebData.picture;
        const isLCP = index === 0;

        return (
          <Fragment key={celebData.slug}>
            <Link
              href={`/${celebData.slug}`}
              passHref
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
                    priority={isLCP}
                  />

                  <p className="font-primary absolute bottom-3 left-3 z-10 text-sm font-semibold text-white">
                    {celebData.name}
                  </p>

                  {/* overlay */}
                  <div className="pointer-events-none absolute top-0 left-0 block h-full w-full bg-gradient-to-b from-transparent via-transparent to-black" />
                </div>
              </a>
            </Link>

            {
              // Position ad after every 5 rows
              (index + 1) % (itemsPerRow * 5) === 0 && (
                <div className="my-4 flex h-[250px] w-full items-center justify-center md:hidden">
                  <AdUnit deliveryId="pubg-gzy-tbi" />
                </div>
              )
            }
          </Fragment>
        );
      })}
    </div>
  );
};
