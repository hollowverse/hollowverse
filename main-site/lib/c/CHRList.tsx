import { ReactNode } from 'react';
import {
  CelebHorizontalRect,
  CHRContent,
  CHRImage,
} from '~/lib/c/CelebHorizontalRect';
import { TitledContent } from '~/lib/t/TitledContent';
import { Celeb } from '~/lib/c/celeb.projection';

type CHRCeleb<T> = Pick<Celeb, 'slug' | 'name' | 'picture'> & T;

export function CHRList<T>(props: {
  title: ReactNode;
  celebs: CHRCeleb<T>[];
  renderBody: (c: CHRCeleb<T>) => ReactNode;
  renderLink?: (c: CHRCeleb<T>) => string;
  stickyTitle?: boolean;
}) {
  const renderLink = props.renderLink ?? ((c: CHRCeleb<T>) => `/${c.slug}`);

  return (
    <TitledContent
      title={
        <h2 className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap px-5 py-4 text-lg">
          {props.title}
        </h2>
      }
      stickyTitle={props.stickyTitle ?? true}
    >
      {props.celebs.map((c) => {
        return (
          <CelebHorizontalRect
            className="lg:-mt-[1px]"
            key={c.slug}
            link={renderLink(c)}
          >
            <CHRImage
              celebImageProps={{
                name: c.name,
                picture: c.picture,
                alt: c.name,
              }}
            />

            <CHRContent title={c.name} body={props.renderBody(c)} />
          </CelebHorizontalRect>
        );
      })}
    </TitledContent>
  );
}
