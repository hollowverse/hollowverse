import { useEffect } from 'react';
import { Json } from '~/shared/lib/types';

type EventName = 'issue_view' | 'fact_view';

export function useGaEventRecorder(eventName: EventName, eventParams: Json) {
  useEffect(() => {
    recordGaEvent(eventName, eventParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function recordGaEvent(eventName: EventName, eventParams: Json) {
  window.gtag('event', eventName, eventParams);
}
