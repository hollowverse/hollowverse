import { hasCookie } from 'cookies-next';
import { LOGIN_COOKIE_NAME } from '~/lib/constants';

export function redirectToLogin(redirect: string) {
  window.location.href = `/api/login?redirect=${encodeURI(redirect)}`;
}

export function useUser() {
  const isLoggedIn = hasCookie(LOGIN_COOKIE_NAME);

  return { isLoggedIn };
}
