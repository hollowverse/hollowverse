import { ReactNode } from 'react';
import {
  CelebHorizontalRect,
  CHRContent,
  CHRImage,
} from '~/components/ui/CelebHorizontalRect';
import { TitledContent } from '~/components/ui/TitledContent';
import { c } from '~/lib/c';
import { Celeb } from '~/lib/groq/celeb.projection';
import { ReactElementProps } from '~/lib/types';

type CHRCeleb<T> = Pick<Celeb, 'slug' | 'name' | 'picture'> & T;

export function CardTitle(
  props: ReactElementProps<'div'> & { component?: React.ElementType },
) {
  const Root = 'h2' || props.component;

  return (
    <Root
      {...props}
      className={c(
        'flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-lg',
        props.className,
      )}
    />
  );
}

export function CHRList<T>(props: {
  title: ReactNode;
  celebs: CHRCeleb<T>[];
  renderBody: (c: CHRCeleb<T>) => ReactNode;
  stickyTitle?: boolean;
}) {
  return (
    <TitledContent
      title={<CardTitle className="px-5 py-4">{props.title}</CardTitle>}
      stickyTitle={props.stickyTitle ?? true}
    >
      {props.celebs.map((c) => {
        return (
          <CelebHorizontalRect
            id="chr-item"
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
