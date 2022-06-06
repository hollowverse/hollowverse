import { countBy, find, isEmpty, uniq } from 'lodash-es';
import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { DiscourseTopicFact } from '~/components/DiscourseTopicFact';
import { badgeData } from '~/lib/badgeDefinitions';
import { discourseClientApi } from '~/lib/discourseClientApi';
import { getForumTopicId } from '~/lib/getForumTopicId';
import { ContentChangeData } from '~/lib/groq/contentChange.groq';
import { ordinal } from '~/lib/ordinal';
import { pluralize } from '~/lib/pluralize';
import { SanityWebhookProps } from '~/pages/api/content-change-notify';

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

You've been awarded your <a href="https://forum.hollowverse.com/u/${
    contributor.username
  }/badges">${ordinal(newBadges.stardustCount)} Stardust${
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

async function updateAndLockPost(
  topic: any,
  contentChangeData: ContentChangeData,
) {
  const topicOpId = topic.post_stream.posts[0].id;
  const fact = ReactDOMServer.renderToStaticMarkup(
    React.createElement(DiscourseTopicFact, contentChangeData),
  );

  await Promise.all([
    discourseClientApi(`posts/${topicOpId}.json`, {
      method: 'PUT',
      body: {
        post: {
          raw: fact,
        },
      },
    }),
    discourseClientApi(`posts/${topicOpId}/locked`, {
      method: 'PUT',
      body: {
        locked: 'true',
      },
    }),
  ]);
}

async function rewardUser(topic: any, contentChangeData: ContentChangeData) {
  const contributor = topic.details.created_by;

  const newBadges = await grantBadges(contributor, contentChangeData.forumLink);
  await notifyContributor(
    contributor,
    contentChangeData.forumLink,
    contentChangeData.slug,
    newBadges,
  );
}

export async function performPostPublishChores(
  contentChangeData: ContentChangeData,
  operation: SanityWebhookProps['operation'],
) {
  const topicId = getForumTopicId(contentChangeData.forumLink);

  if (!topicId) {
    throw new Error(
      'Topic ID not found for link: ' + contentChangeData.forumLink,
    );
  }

  const topic = await getTopic(topicId);

  const performUpdateAndLockPost =
    operation === 'update' || operation === 'create';
  const performRewardUser = operation === 'create';

  await Promise.all([
    addAcceptedTag(topic),
    performUpdateAndLockPost
      ? updateAndLockPost(topic, contentChangeData)
      : null,
    performRewardUser ? rewardUser(topic, contentChangeData) : null,
  ]);

  return true;
}
