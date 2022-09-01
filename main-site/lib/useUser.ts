import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { AUTH_COOKIE_NAME } from '~/lib/constants';
import { DiscourseApiClientArgs } from '~/lib/discourseApiClient';

export function redirectToLogin(redirect: string) {
  window.location.href = `/api/login?redirect=${encodeURI(redirect)}`;
}

export type User = {
  avatar_template: string;
};

let cachedUser: User | null = null;

export function useUser() {
  const auth_ = getCookie(AUTH_COOKIE_NAME);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!auth_ || auth_ === true) {
      return;
    }

    const auth = JSON.parse(auth_.split('.')[0]);

    if (!cachedUser && auth?.username) {
      async function req() {
        const args: DiscourseApiClientArgs = {
          api: `u/${auth.username}.json`,
        };

        const userRes = await fetch('/api/discourse-proxy', {
          method: 'POST',
          body: JSON.stringify(args),
        });

        const { user: user_ } = await userRes.json();

        if (user_) {
          cachedUser = user_;
          setUser(user_);
        }
      }

      req();
    } else if (cachedUser) {
      setUser(cachedUser);
    }
  }, [auth_]);

  return user;
}
