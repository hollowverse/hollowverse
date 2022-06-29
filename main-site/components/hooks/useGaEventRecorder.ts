import { useEffect } from 'react';
import { Json } from '~/lib/types';

type EventName = 'issue_view';

export function useGaEventRecorder(eventName: EventName, eventParams: Json) {
  useEffect(() => {
    window.gtag('event', eventName, eventParams);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
