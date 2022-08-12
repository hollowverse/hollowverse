import { useEffect } from 'react';
import { Card } from '~/lib/c/Card';

export function InFeedAd() {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <Card className="py-5">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="fluid"
        data-ad-layout-key="-5v+di+1b-y+5l"
        data-ad-client="ca-pub-8989100382265388"
        data-ad-slot="4809714565"
      />
    </Card>
  );
}
