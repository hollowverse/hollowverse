import { PropsWithChildren } from 'react';
import { CelebImage } from '~/lib/c/CelebImage';
import { Picture } from '~/lib/groq/picture.projection';

export function HeroTitleContainer(props: PropsWithChildren<{}>) {
  return <h1 className="flex flex-col gap-1">{props.children}</h1>;
}

export function HeroTitleSoftText(props: PropsWithChildren<{}>) {
  return (
    <span className="text-lg font-normal tracking-wide text-neutral-500">
      {props.children}
    </span>
  );
}

export function HeroTitleStrongText(props: PropsWithChildren<{}>) {
  return (
    <span className="block text-4xl font-extrabold tracking-tight text-neutral-600">
      {props.children}
    </span>
  );
}

export function HeroTopContainer(props: PropsWithChildren<{}>) {
  return <div className="flex flex-wrap items-end gap-5">{props.children}</div>;
}

export function HeroCelebImage(props: {
  name: string;
  picture: Picture;
  slug?: string;
}) {
  const content = (
    <div className="w-[150px]">
      <CelebImage
        className="rounded-md object-cover"
        key={props.name + '-topSection-image'}
        picture={props.picture}
        name={props.name}
      />
    </div>
  );

  if (props.slug) {
    return (
      <a href={`/${props.slug}`} title={`The political views of ${props.name}`}>
        {content}
      </a>
    );
  }

  return content;
}

export const Hero = (props: PropsWithChildren<{}>) => {
  return (
    <div className="TOP-SECTION h-container flex flex-col gap-5 p-5">
      {props.children}
    </div>
  );
};
