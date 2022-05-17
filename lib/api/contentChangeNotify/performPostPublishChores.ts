import { uniq } from 'lodash-es';
import { discourseClientApi } from '~/lib/api/utils/discourseClientApi';

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

function notifyContributor(contributor: any, forumLink: string, slug: string) {
  const celebPageUrl = `https://hollowverse.com/${slug}`;
  const message = `Hi @${contributor.username}!

Thank you for contributing this: ${forumLink}. It has been accepted and published on Hollowverse!

You, and all of Hollowverse's readers, can see it here ${celebPageUrl}

Thanks!
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

export async function performPostPublishChores(
  forumLink: string,
  slug: string,
) {
  const topicId = getTopicId(forumLink);
  const topic = await getTopic(topicId);

  await addAcceptedTag(topic);

  const contributor = topic.details.created_by;

  await notifyContributor(contributor, forumLink, slug);

  return true;
}
