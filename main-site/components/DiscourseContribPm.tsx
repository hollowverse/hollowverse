import { isEmpty } from 'lodash-es';
import React from 'react';
import { ordinal } from '~/lib/ordinal';
import { pluralize } from '~/lib/pluralize';

export function DiscourseContribPm(props: {
  username: string;
  forumLink: string;
  celebPageUrl: string;
  stardustCount: number;
  newBadges: string[];
}) {
  const userBadgesLink = `https://forum.hollowverse.com/u/${props.username}/badges`;

  return (
    <>
      <p>Hi @{props.username}!</p>

      <p>
        Your contribution <a href={props.forumLink}>{props.forumLink}</a> has
        been accepted and published on Hollowverse!
      </p>

      <p>
        You, and all of Hollowverse&apos;s readers, can see it here{' '}
        <a href={props.celebPageUrl}>{props.celebPageUrl}</a>
      </p>

      <p>
        You&apos;ve been awarded your{' '}
        <a href={userBadgesLink}>
          {ordinal(props.stardustCount)} Stardust
          {!isEmpty(props.newBadges) && (
            <>
              {' '}
              and {props.newBadges.join(', ')}{' '}
              {pluralize(props.newBadges.length, 'badge', 'badges')}
            </>
          )}
        </a>
        !
      </p>

      <p>Thank you for contributing!</p>

      <p>Hollowverse</p>
    </>
  );
}
