import { type ReactElement, useEffect, useMemo, useState } from 'react';

export interface InsertAdOptions {
  hbDisabled?: boolean;
}

type DestroyAd = () => void & {
  // The Ad ID that can be used with other API calls,
  // if the ad is inserted successfully.
  // The ID is local to the page view.
  id?: string;
};

// Assume that the pubg global instance has been initialized
// before the app is loaded.
interface Pubg {
  insertAd(
    deliveryId: string,
    options?: InsertAdOptions,
    div?: HTMLElement,
  ): DestroyAd;
  queue: { push(fn: () => unknown): void };
}

export interface AdProps {
  deliveryId: string;
  adOptions?: InsertAdOptions;
  className?: string;
}

function AdUnit({ deliveryId, adOptions, className }: AdProps): ReactElement {
  const [divEl, setDivEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!divEl) {
      return;
    }

    const wnd = window as typeof window & { pubg: Pubg };

    // Inserting an ad is an async process,
    // and the component may be rendered multiple times before inserting the ad.
    // This flag is used to avoid the unnecessary inserting if the component has been unmounted.
    // It may avoid a lot of uninteresting errors that are sent to our servers.
    let ignore = false;
    let destroyAd: DestroyAd | undefined;

    wnd.pubg.queue.push(() => {
      if (!ignore) {
        destroyAd = wnd.pubg.insertAd(deliveryId, adOptions, divEl);
      }
    });

    return () => {
      ignore = true;

      wnd.pubg.queue.push(() => {
        if (destroyAd) {
          destroyAd();
        }
      });
    };
  }, [
    divEl,
    deliveryId,
    // adOptions should be considered as initial values and should not be changed on the fly.
  ]);

  // Importantly, the div should not be changed once created and should be memoized.
  // It may be attempted to use a ref instead of the callback,
  // but ref.current is updated outside React's flow,
  // and should not be used as a dependency of hooks.
  // Using a callback and a state can avoid such glitches.
  return useMemo(() => <div ref={setDivEl} className={className} />, []);
}

export default AdUnit;
