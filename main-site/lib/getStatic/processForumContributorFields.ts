import { ContributorPsql } from '~/lib/psql/contributor.fields';
import truncate from 'truncate-html';
import randomcolor from 'randomcolor';

export function processForumContributorFields(contributor: ContributorPsql) {
  const { uploaded_avatar_id, bio_cooked, ...rest } = contributor;

  return {
    ...rest,
    avatar: getAvatar(rest.username, uploaded_avatar_id),
    bio: bio_cooked ? truncate(bio_cooked, 250, { stripTags: true }) : null,
  };
}

function getAvatar(username: string, uploadId: string | undefined) {
  const base = 'https://forum.hollowverse.com/';

  if (!uploadId) {
    const color = randomcolor({ seed: username, luminosity: 'dark' }).substring(
      1,
    );

    return `${base}letter_avatar_proxy/v4/letter/${username[0].toLowerCase()}/${color}/240.png`;
  }

  return `${base}user_avatar/forum.hollowverse.com/${username.toLowerCase()}/240/${uploadId}_2.png`;
}
