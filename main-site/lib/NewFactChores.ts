import { find, isError, uniq } from 'lodash-es';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { DiscourseContribPm } from '~/components/DiscourseContribPm';
import { DiscourseTopicFact } from '~/components/DiscourseTopicFact';
import { badgeDefinitions } from '~/lib/badgeDefinitions';
import { discourseApiClient as _discourseApiClient } from '~/lib/discourseApiClient';
import { ContentChange } from '~/lib/groq/contentChangeNotification.projection';
import { Json } from '~/lib/types';
import { SanityWebhookProps } from '~/pages/api/content-change-notify';
import { getForumTopicId } from '~/shared/lib/getForumTopicId';
import { Context, createContextLogger, LoggableError } from '~/shared/lib/log';
import {
  logTask as _logTask,
  logTaskD as _logTaskD,
} from '~/shared/lib/log.server';

export class NewFactChores {
  private logTask;
  private logTaskD;
  private topic: Json = {};
  private log;
  private discourseApiClient;

  constructor(
    private contentChange: ContentChange,
    private operation: SanityWebhookProps['operation'],
    private logContext: Context,
  ) {
    this.contentChange = contentChange;
    this.operation = operation;
    this.logContext = logContext;
    this.logTask = <T>(taskName: string, fn: (...args: any[]) => T) => {
      return _logTask(taskName, fn, logContext);
    };
    this.logTaskD = <T>(taskName: string, fn: (...args: any[]) => T) => {
      return _logTaskD(taskName, fn, logContext);
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
    const formattedFact = await this.logTaskD('Build reformatted post', () => {
      return ReactDOMServer.renderToStaticMarkup(
        React.createElement(DiscourseTopicFact, this.contentChange),
      );
    });

    if (isError(formattedFact)) {
      return formattedFact;
    }

    const topicId = this.topic.post_stream.posts[0].id;

    return this.logTask('Reformat post', () => {
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
            badge_id: badgeDefinitions.stardust.id,
            reason: this.contentChange.forumLink,
          },
        });
      },
    );

    if (isError(stardustAwareResult)) {
      return stardustAwareResult;
    }

    this.log('debug', 'Stardust award Discourse response', {
      response: stardustAwareResult,
    });

    this.log(
      'info',
      `INFO: Determine if ${username} has achieved other new badges`,
    );

    const contributorBadges = await this.logTaskD(
      `Retrieve ${username}'s current badges`,
      () => {
        return this.discourseApiClient(
          `user-badges/${username}.json?grouped=true`,
        );
      },
    );

    if (isError(contributorBadges)) {
      return contributorBadges;
    }

    const stardustCount = find(
      contributorBadges.user_badges,
      (b) => b.badge_id === badgeDefinitions.stardust.id,
    )?.count;

    if (!stardustCount) {
      const error = new LoggableError(
        `${username} has no Stardust. The Discourse call failed somehow.`,
        this.logContext,
      );

      this.log('error', error);

      return error;
    }

    const newBadge = find(
      badgeDefinitions,
      (d) => d.stardustThreshold === stardustCount,
    );

    const alreadyHasBadge = newBadge
      ? find(contributorBadges.user_badges, (b) => b.badge_id === newBadge.id)
      : false;

    if (newBadge && !alreadyHasBadge) {
      const awardNewBadge = await this.logTask(
        `Award ${username} ${newBadge.name} badge`,
        () => {
          return this.discourseApiClient('user_badges', {
            method: 'POST',
            body: {
              username: username,
              badge_id: newBadge.id,
            },
          });
        },
      );

      if (isError(awardNewBadge)) {
        return awardNewBadge;
      }

      newBadges.push(newBadge.name);
    } else {
      this.log('info', `INFO: ${username} hasn't achieved other new badges`);
    }

    const celebPageUrl = `https://hollowverse.com/${this.contentChange.slug}`;

    const pm = await this.logTaskD('Build private message', () => {
      return ReactDOMServer.renderToStaticMarkup(
        React.createElement(DiscourseContribPm, {
          username: contributor.username,
          forumLink: this.contentChange.forumLink,
          celebPageUrl,
          stardustCount: stardustCount,
          newBadges: newBadges,
        }),
      );
    });

    if (isError(pm)) {
      return pm;
    }

    return this.logTask('Send private message', () => {
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
  }

  async run() {
    const topicId = getForumTopicId(this.contentChange.forumLink);

    if (!topicId) {
      const loggableError = new LoggableError(
        `Could not get forum topic ID from link ${this.contentChange.forumLink}`,
        this.logContext,
      );

      this.log('error', loggableError);

      return loggableError;
    }

    this.topic = await this.logTaskD('Retrieve topic data from Discourse', () =>
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
