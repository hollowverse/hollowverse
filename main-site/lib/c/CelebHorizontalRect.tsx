import Link from 'next/link';
import { ReactNode } from 'react';
import { c } from '~/lib/c/c';
import { CelebImage, CelebImageProps } from '~/lib/c/CelebImage';
import { ReactElementProps } from '~/shared/lib/types';

export function CHRImage(
  props: ReactElementProps<'div'> & { celebImageProps: CelebImageProps },
) {
  const { celebImageProps, ...rest } = props;

  return (
    <div {...rest} className={c('col-span-2', rest.className)}>
      <CelebImage
        layout="responsive"
        objectFit="cover"
        objectPosition="center"
        width={150}
        height={150}
        {...celebImageProps}
      />
    </div>
  );
}

export function CHRContent(props: { title: ReactNode; body: ReactNode }) {
  return (
    <div className="align-center relative col-span-8 flex flex-col justify-center px-5">
      <h3 className="truncate text-lg font-semibold">{props.title}</h3>
      {props.body}
    </div>
  );
}

export function CelebHorizontalRect(
  props: ReactElementProps<'div'> & { link: string },
) {
  const { link, ...rest } = props;

  return (
    <Link href={props.link} passHref>
      <a>
        <div
          id="chr-item"
          {...rest}
          className={c(
            'relative grid w-full grid-cols-10 overflow-hidden border-b bg-white lg:border-x lg:border-t',
            rest.className,
          )}
        />
      </a>
    </Link>
  );
}
