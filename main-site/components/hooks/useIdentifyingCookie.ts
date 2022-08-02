import { getCookie, hasCookie, setCookie } from 'cookies-next';
import shortUuid from 'short-uuid';
import { oneYear } from '~/lib/date';

export const HV_TMP_ID_COOKIE_NAME = 'tmphvid';

export function useIdentifyingCookie() {
  if (!hasCookie(HV_TMP_ID_COOKIE_NAME)) {
    setCookie(HV_TMP_ID_COOKIE_NAME, shortUuid.generate(), { maxAge: oneYear });
  }

  return getCookie(HV_TMP_ID_COOKIE_NAME);
}
