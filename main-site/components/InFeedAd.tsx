import { useEffect } from 'react';
import { Card } from '~/components/ui/Card';
import { getVercelEnv } from '~/shared/lib/getVercelEnv';

export function InFeedAd() {
  const shouldShowAd = getVercelEnv() !== 'preview';

  useEffect(() => {
    if (shouldShowAd) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return shouldShowAd ? (
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
  ) : null;
}
