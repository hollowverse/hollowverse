import { hasCookie } from 'cookies-next';
import { useEffect } from 'react';
import { LOGIN_COOKIE_NAME } from '~/lib/constants';
import { discourseApiClient } from '~/lib/discourseApiClient';

export function redirectToLogin(redirect: string) {
  window.location.href = `/api/login?redirect=${encodeURI(redirect)}`;
}

export function useUser() {
  const isLoggedIn = hasCookie(LOGIN_COOKIE_NAME);

  useEffect(() => {
    async function req() {
      const user = await discourseApiClient({ api: 'asdf' });
    }
  }, []);

  return { isLoggedIn };
}
