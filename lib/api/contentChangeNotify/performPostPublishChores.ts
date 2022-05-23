import { countBy, find, isEmpty, uniq } from 'lodash-es';
import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { badgeData } from '~/lib/api/contentChangeNotify/badgeDefinitions';
import { discourseClientApi } from '~/lib/api/utils/discourseClientApi';
import { ordinal } from '~/lib/utils/ordinal';
import { pluralize } from '~/lib/utils/pluralize';

const badgesLink = 'https://forum.hollowverse.com/badges';

function getTopicId(forumLink: string) {
  return forumLink.substring(forumLink.lastIndexOf('/') + 1);
}

function getTopic(topicId: string) {
  return discourseClientApi(`t/-/${topicId}.json`);
}

function addAcceptedTag(topic: any) {
  const tags = [...topic.tags];
  tags.push('accepted');
  const newTags = uniq(tags);

  return discourseClientApi(`t/-/${topic.id}.json`, {
    method: 'PUT',
    body: {
      keep_existing_draft: true,
      tags: newTags,
    },
  });
}

function notifyContributor(
  contributor: any,
  forumLink: string,
  slug: string,
  newBadges: UnwrapPromise<ReturnType<typeof grantBadges>>,
) {
  const celebPageUrl = `https://hollowverse.com/${slug}`;
  const message = `Hi @${contributor.username}!

Your contribution ${forumLink} has been accepted and published on Hollowverse!

You, and all of Hollowverse's readers, can see it here ${celebPageUrl}

You've been awarded your <a href="${badgesLink}">${ordinal(
    newBadges.stardustCount,
  )} Stardust${
    !isEmpty(newBadges.others)
      ? ` and ${newBadges.others.join(', ')} ${pluralize(
          newBadges.others.length,
          'badge',
          'badges',
        )}`
      : ''
  }</a>!

Thank you for contributing!
Hollowverse`;

  return discourseClientApi('posts.json', {
    method: 'POST',
    body: {
      title: 'Your submission has been accepted and published!',
      target_recipients: contributor.username,
      raw: message,
      archetype: 'private_message',
    },
  });
}

async function grantBadges(contributor: any, forumLink: string) {
  const newBadges: string[] = [];

  // Increase Stardust
  await discourseClientApi('user_badges', {
    method: 'POST',
    body: {
      username: contributor.username,
      badge_id: badgeData.stardust.id,
      reason: forumLink,
    },
  });

  const contributorBadges = await discourseClientApi(
    `user-badges/${contributor.username}.json`,
  );

  const countedBadges = countBy(
    contributorBadges.user_badges,
    (b) => b.badge_id,
  );

  const stardustCount = countedBadges[badgeData.stardust.id] || 0;

  const thresholdReachedForBadge = find(
    badgeData,
    (b) => b.stardustThreshold === stardustCount,
  );

  if (
    thresholdReachedForBadge !== undefined &&
    countedBadges[thresholdReachedForBadge.id] === undefined
  ) {
    await discourseClientApi('user_badges', {
      method: 'POST',
      body: {
        username: contributor.username,
        badge_id: thresholdReachedForBadge.id,
      },
    });

    newBadges.push(thresholdReachedForBadge.name);
  }

  return {
    stardustCount,
    others: newBadges,
  };
}

export async function performPostPublishChores(
  forumLink: string,
  slug: string,
) {
  const topicId = getTopicId(forumLink);
  const topic = await getTopic(topicId);

  await addAcceptedTag(topic);

  const contributor = topic.details.created_by;

  const newBadges = await grantBadges(contributor, forumLink);
  await notifyContributor(contributor, forumLink, slug, newBadges);

  return true;
}
