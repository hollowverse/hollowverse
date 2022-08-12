import { startsWith } from 'lodash-es';
import randomcolor from 'randomcolor';
import truncate from 'truncate-html';
import { ContributorPsql } from '~/lib/contributor.fields';

export type Contributor = ReturnType<typeof processForumContributorFields>;

export function processForumContributorFields<T extends ContributorPsql>(
  contributor: T,
) {
  const { uploaded_avatar_id, bio_cooked, ...rest } = contributor;

  return {
    ...rest,
    avatar: getAvatar(rest.username, uploaded_avatar_id),
    bio: bio_cooked ? truncate(bio_cooked, 250, { stripTags: true }) : null,
    socialNetworkName: getSocialNetworkName(rest.website),
    websiteName: getWebsiteName(rest.website),
  };
}

function getAvatar(username: string, uploadId: string | undefined) {
  const base = 'https://forum.hollowverse.com/';

  if (!uploadId) {
    const color = randomcolor({
      seed: username,
      luminosity: 'dark',
    }).substring(1);

    return `${base}letter_avatar_proxy/v4/letter/${username[0].toLowerCase()}/${color}/240.png`;
  }

  return `${base}user_avatar/forum.hollowverse.com/${username.toLowerCase()}/240/${uploadId}_2.png`;
}

function getWebsiteName(website: string | undefined) {
  if (!website) {
    return null;
  }

  try {
    const u = website;
    const protocol = new URL(u).protocol;

    return u.slice((protocol + '//').length);
  } catch (e) {
    return null;
  }
}

function getSocialNetworkName(website: string | undefined) {
  if (!website) {
    return 'none';
  }

  function test(hostname: string, socialNetworkName: string) {
    return startsWith(hostname.toLowerCase(), socialNetworkName.toLowerCase());
  }

  try {
    const hostname = new URL(website).hostname;

    if (test(hostname, 'linkedin')) {
      return 'linkedin';
    } else if (test(hostname, 'twitter')) {
      return 'twitter';
    } else if (test(hostname, 'instagram')) {
      return 'instagram';
    } else {
      return 'none';
    }
  } catch (e) {
    return 'none';
  }
}
