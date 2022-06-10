export const GA_MEASUREMENT_ID = 'G-9DXRHRTDG6';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export function gaPageView(url: string) {
  (window as any).gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export function gaEvent(name: string, label: string) {
  (window as any).gtag('event', name, {
    event_category: 'general',
    event_label: label,
  });
}
