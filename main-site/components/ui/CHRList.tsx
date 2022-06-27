import { ReactNode } from 'react';
import {
  CelebHorizontalRect,
  CHRContent,
  CHRImage,
} from '~/components/ui/CelebHorizontalRect';
import { TitledContent } from '~/components/ui/TitledContent';
import { Celeb } from '~/lib/groq/celeb.projection';

type CHRCeleb<T> = Pick<Celeb, 'slug' | 'name' | 'picture'> & T;

export function CHRList<T>(props: {
  title: ReactNode;
  celebs: CHRCeleb<T>[];
  renderBody: (c: CHRCeleb<T>) => ReactNode;
  stickyTitle?: boolean;
}) {
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
            link={`/${c.slug}`}
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
