import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineLinkedin,
} from 'react-icons/ai';
import { CgWebsite } from 'react-icons/cg';
import { IconType } from 'react-icons/lib';
import { Contributor } from '~/lib/getStatic/processForumContributorFields';
import Image from 'next/image';

export function ContributorBox(props: Contributor & { showBio?: boolean }) {
  const showBio = props.showBio ?? true;

  return (
    <a href={getUrl(props)} target="_blank" rel="noreferrer">
      <div
        id="contributor-box"
        className="grid grid-cols-[min-content_auto] grid-rows-[auto_auto] gap-x-2"
      >
        <div id="contributor-pic" className="flex w-[40px] items-center">
          <Image
            className="rounded-md"
            width={40}
            height={40}
            alt={`${props.username}'s image`}
            src={props.avatar}
          />
        </div>

        <div id="contributor-name" className="flex items-center gap-1 text-sm">
          {props.name && <p className="truncate font-semibold">{props.name}</p>}
          <p className="truncate font-semibold text-neutral-400">
            @{props.username}
          </p>
        </div>

        <div />

        <div className="flex flex-col gap-2">
          {props.bio && showBio ? (
            <p className="pointer-events-none text-sm text-neutral-600">
              {props.bio}
            </p>
          ) : null}

          {props.website ? (
            <div className="flex items-center gap-1 text-neutral-500">
              <WebsiteIcon socialNetworkName={props.socialNetworkName} />
              <a
                target="_blank"
                rel="noreferrer"
                href={props.website}
                className="text-sm underline"
              >
                {props.websiteName}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </a>
  );
}

function getUrl(contributor: Contributor) {
  try {
    new URL(contributor.website!);

    return contributor.website!;
  } catch (e) {
    return `https://forum.hollowverse.com/u/${contributor.username}/summary`;
  }
}

function WebsiteIcon(props: { socialNetworkName: string }) {
  let Icon: IconType | undefined;
  const sn = props.socialNetworkName;

  if (sn === 'twitter') {
    Icon = AiOutlineTwitter;
  } else if (sn === 'instagram') {
    Icon = AiOutlineInstagram;
  } else if (sn === 'linkedin') {
    Icon = AiOutlineLinkedin;
  } else {
    Icon = CgWebsite;
  }

  return <Icon />;
}
