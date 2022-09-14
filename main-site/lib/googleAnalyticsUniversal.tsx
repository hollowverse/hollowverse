import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { GA_TRACKING_ID } from '~/lib/googleAnalytics';

export function useGoogleAnalyticsUniversal() {
  const router = useRouter();
  const [firstTime, setFirstTime] = useState<boolean>(true);
  const debounced = useDebouncedCallback((newPagePath: string) => {
    if (!firstTime) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: newPagePath,
      });
    } else {
      setFirstTime(false);
    }
  }, 500);

  useEffect(() => {
    const handleRouteChange = (hrcPagePath: string) => {
      return debounced(hrcPagePath);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events, debounced]);
}
