import Image from 'next/image';
import {
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { CgWebsite } from 'react-icons/cg';
import { IconType } from 'react-icons/lib';
import { Contributor } from '~/lib/getStatic/processForumContributorFields';
import { pluralize } from '~/lib/pluralize';

export function ContributorBox(
  props: Contributor & { showBio?: boolean; count?: number },
) {
  const showBio = props.showBio ?? true;

  function renderContributorBox() {
    if (showBio && props.bio) {
      return <LargeContributorBox {...props} />;
    }

    return <SmallContributorBox {...props} />;
  }

  return (
    <a href={getUrl(props)} target="_blank" rel="noreferrer">
      {renderContributorBox()}
    </a>
  );
}

function LargeContributorBox(props: Contributor) {
  return (
    <div id="contributor-box" className="flex gap-3">
      <div id="contributor-pic" className="flex w-[65px] shrink-0 items-start">
        <Image
          className="rounded-md"
          width={65}
          height={65}
          alt={`${props.username}'s image`}
          src={props.avatar}
        />
      </div>

      <div className="gap3 flex min-w-0 flex-1 flex-col gap-2">
        {renderName(props)}

        <p className="pointer-events-none text-sm text-neutral-600">
          {props.bio}
        </p>

        {props.website && (
          <div className="flex items-center gap-1 text-neutral-500">
            <WebsiteIcon socialNetworkName={props.socialNetworkName} />

            <a
              target="_blank"
              rel="noreferrer"
              href={props.website}
              className="truncate text-sm"
            >
              {props.websiteName}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function SmallContributorBox(props: Contributor) {
  return (
    <div id="contributor-box" className="flex gap-3">
      <Image
        className="rounded-md"
        width={40}
        height={40}
        alt={`${props.username}'s image`}
        src={props.avatar}
      />

      <div className="flex min-w-0 flex-1 flex-col justify-center text-sm">
        {renderName(props)}

        {props.website && (
          <div className="flex min-w-0 items-center gap-1 text-neutral-500">
            <a
              target="_blank"
              rel="noreferrer"
              href={props.website}
              className="truncate text-sm"
            >
              {props.websiteName}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function renderName(props: Contributor) {
  return (
    <div className="flex min-w-0 items-center gap-1">
      {props.name && <p className="truncate font-semibold">{props.name}</p>}
      <p className="truncate font-semibold text-neutral-400">
        @{props.username}
      </p>

      {props.count && (
        <>
          <div className="flex-1" />
          <p className="truncate text-xs text-neutral-500">{props.count}</p>
        </>
      )}
    </div>
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
