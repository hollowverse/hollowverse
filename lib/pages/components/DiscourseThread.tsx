import React, { useEffect } from 'react'

interface DiscourseThreadProps {
  threadUrl: string;
}

export const DiscourseThread: React.FC<DiscourseThreadProps> = ({ threadUrl }) => {
  useEffect(() => {
    window.DiscourseEmbed = {
      discourseUrl: 'https://forum.hollowverse.com/',
      discourseEmbedUrl: threadUrl,
    }
    const d = document.createElement('script');
    d.type = 'text/javascript';
    d.async = true;
    d.src = `${window.DiscourseEmbed.discourseUrl}/javascripts/embed.js`;
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(d);
  }, [threadUrl]);

  return (
    <div id="discourse-comments" />
  );
}
