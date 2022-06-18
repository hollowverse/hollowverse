import { countBy, find, isError, uniq } from 'lodash-es';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { DiscourseContribPm } from '~/components/DiscourseContribPm';
import { DiscourseTopicFact } from '~/components/DiscourseTopicFact';
import { badgeData } from '~/lib/badgeDefinitions';
import { discourseApiClient as _discourseApiClient } from '~/lib/discourseApiClient';
import { ContentChangeData } from '~/lib/groq/contentChange.groq';
import { Json } from '~/lib/types';
import { SanityWebhookProps } from '~/pages/api/content-change-notify';
import { getForumTopicId } from '~/shared/lib/getForumTopicId';
import {
  Context,
  createContextLogger,
  LoggableError,
  logTask as _logTask,
} from '~/shared/lib/log';

export class NewFactChores {
  private logTask;
  private topic: Json = {};
  private log;
  private discourseApiClient;

  constructor(
    private contentChangeData: ContentChangeData,
    private operation: SanityWebhookProps['operation'],
    private logContext: Context,
  ) {
    this.contentChangeData = contentChangeData;
    this.operation = operation;
    this.logContext = logContext;
    this.logTask = <T>(taskName: string, fn: (...args: any[]) => T) => {
      return _logTask(taskName, fn, logContext);
    };
    this.log = createContextLogger(this.logContext);
    this.discourseApiClient = <T extends Json>(
      apiEndPoint: string,
      payload: { method: 'POST' | 'PUT' | 'GET'; body?: any } = {
        method: 'GET',
      },
    ): Promise<T> =>
      _discourseApiClient<T>(apiEndPoint, payload, this.logContext);
  }

  private addAcceptedTag() {
    return this.logTask(`Add 'accepted' tag to topic ${this.topic.id}`, () => {
      const tags = [...this.topic.tags];
      tags.push('accepted');
      const newTags = uniq(tags);

      return this.discourseApiClient(`t/-/${this.topic.id}.json`, {
        method: 'PUT',
        body: {
          keep_existing_draft: true,
          tags: newTags,
        },
      });
    });
  }

  private async formatPost() {
    const formattedFact = await this.logTask(
      'Build pretty looking post',
      () => {
        return ReactDOMServer.renderToStaticMarkup(
          React.createElement(DiscourseTopicFact, this.contentChangeData),
        );
      },
    );

    if (isError(formattedFact)) {
      return formattedFact;
    }

    const topicId = this.topic.post_stream.posts[0].id;

    return this.logTask('Submit pretty looking post', () => {
      return this.discourseApiClient(`posts/${topicId}.json`, {
        method: 'PUT',
        body: {
          post: {
            raw: formattedFact,
          },
        },
      });
    });
  }

  private lockPost() {
    const topicId = this.topic.post_stream.posts[0].id;

    return this.logTask('Lock post from further edits', () =>
      this.discourseApiClient(`posts/${topicId}/locked`, {
        method: 'PUT',
        body: {
          locked: 'true',
        },
      }),
    );
  }

  private async awardBadgesAndNotifyUser() {
    const contributor = this.topic.details.created_by;
    const username = contributor.username;

    const newBadges: string[] = [];

    const stardustAwareResult = await this.logTask(
      `Increase ${username}'s Stardust`,
      () => {
        return this.discourseApiClient('user_badges', {
          method: 'POST',
          body: {
            username: username,
            badge_id: badgeData.stardust.id,
            reason: this.contentChangeData.forumLink,
          },
        });
      },
    );

    if (isError(stardustAwareResult)) {
      return stardustAwareResult;
    }

    const contributorBadges = await this.logTask(
      `Retrieve ${username}'s current badges`,
      () => {
        return this.discourseApiClient(`user-badges/${username}.json`);
      },
    );

    if (isError(contributorBadges)) {
      return contributorBadges;
    }

    this.log('info', `Determine if ${username} should be awarded other badges`);

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
      const awardOtherBadgesResults = await this.logTask(
        `Award ${username} ${thresholdReachedForBadge.name} badge`,
        () => {
          return this.discourseApiClient('user_badges', {
            method: 'POST',
            body: {
              username: username,
              badge_id: thresholdReachedForBadge.id,
            },
          });
        },
      );

      if (isError(awardOtherBadgesResults)) {
        return awardOtherBadgesResults;
      }

      newBadges.push(thresholdReachedForBadge.name);
    } else {
      this.log('info', 'No other badges need to be awarded');
    }

    return this.logTask(
      `Sending a private message notification to ${username}`,
      async () => {
        const celebPageUrl = `https://hollowverse.com/${this.contentChangeData.slug}`;

        const pm = await this.logTask('Build private message', () => {
          return ReactDOMServer.renderToStaticMarkup(
            React.createElement(DiscourseContribPm, {
              username: contributor.username,
              forumLink: this.contentChangeData.forumLink,
              celebPageUrl,
              stardustCount: stardustCount,
              newBadges: newBadges,
            }),
          );
        });

        if (isError(pm)) {
          return pm;
        }

        return this.logTask('Submit private message', () => {
          return this.discourseApiClient('posts.json', {
            method: 'POST',
            body: {
              title: 'Your submission has been accepted and published!',
              target_recipients: contributor.username,
              raw: pm,
              archetype: 'private_message',
            },
          });
        });
      },
    );
  }

  async run() {
    const topicId = getForumTopicId(this.contentChangeData.forumLink);

    if (!topicId) {
      const loggableError = new LoggableError(
        `Could not get forum topic ID from link ${this.contentChangeData.forumLink}`,
        this.logContext,
      );

      this.log('error', loggableError);

      return loggableError;
    }

    this.topic = await this.logTask('Retrieve topic data from Discourse', () =>
      this.discourseApiClient(`t/-/${topicId}.json`),
    );

    if (isError(this.topic)) {
      return this.topic;
    }

    const isUpdateOrCreate =
      this.operation === 'update' || this.operation === 'create';
    const isCreate = this.operation === 'create';

    const results = [];

    results.push(
      await this.addAcceptedTag(),
      isUpdateOrCreate ? await this.formatPost() : null,
      isUpdateOrCreate ? await this.lockPost() : null,
      isCreate ? await this.awardBadgesAndNotifyUser() : null,
    );

    const error = results.find((r) => isError(r));

    if (error) {
      return error;
    }

    return;
  }
}
