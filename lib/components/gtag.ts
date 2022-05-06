export const GA_TRACKING_ID = 'UA-5715214-12';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export function gaPageView(url: string) {
  (window as any).gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export function gaEvent(name: string, params: { [name: string]: string }) {
  (window as any).gtag('event', name, params);
}
