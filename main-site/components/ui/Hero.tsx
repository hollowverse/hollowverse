import { PropsWithChildren } from 'react';
import { CelebImage } from '~/components/CelebImage';
import { Celeb } from '~/lib/groq/celeb.projection';
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

export function HeroCelebImage(props: { name: string; picture: Picture }) {
  return (
    <div className="w-[150px]">
      <CelebImage
        className="rounded-md object-cover"
        key={props.name + '-topSection-image'}
        picture={props.picture}
        name={props.name}
      />
    </div>
  );
}

export const Hero = (props: PropsWithChildren<{}>) => {
  return (
    <div className="TOP-SECTION h-container flex flex-col gap-5 p-5">
      {props.children}
    </div>
  );
};
