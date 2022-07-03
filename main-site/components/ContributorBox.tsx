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
      <div id="contributor-box" className="grid auto-rows-auto">
        <div
          id="contributor-pic-name-container"
          className="row-span-1 grid grid-cols-12"
        >
          <div id="contributor-pic" className="col-span-2 flex items-center">
            <Image
              className="rounded-full"
              width={40}
              height={40}
              alt={`${props.username}'s image`}
              src={props.avatar}
            />
          </div>

          <div
            id="contributor-name"
            className="col-span-10 flex items-center gap-1 text-sm"
          >
            {props.name && (
              <p className="truncate font-semibold">{props.name}</p>
            )}
            <span className="truncate font-semibold text-neutral-400">
              @{props.username}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-2" />
          <div className="col-span-10 flex flex-col gap-2">
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
