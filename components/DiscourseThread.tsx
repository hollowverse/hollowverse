import React, { useEffect } from 'react';
import { getForumTopicId } from '~/lib/getForumTopicId';

interface DiscourseThreadProps {
  threadUrl: string;
}

declare global {
  interface Window {
    DiscourseEmbed: {
      discourseUrl?: string;
      topicId?: string;
    };
  }
}

export const DiscourseThread: React.FC<DiscourseThreadProps> = ({
  threadUrl,
}) => {
  useEffect(() => {
    window.DiscourseEmbed = {
      discourseUrl: 'https://forum.hollowverse.com/',
      topicId: getForumTopicId(threadUrl),
    };
    const d = document.createElement('script');
    d.type = 'text/javascript';
    d.async = true;
    d.src = `${window.DiscourseEmbed.discourseUrl}/javascripts/embed.js`;
    (
      document.getElementsByTagName('head')[0] ||
      document.getElementsByTagName('body')[0]
    ).appendChild(d);
  }, [threadUrl]);

  return <div id="discourse-comments" />;
};
