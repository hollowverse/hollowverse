import { getCookie, setCookie } from 'cookies-next';
import crypto from 'crypto';
import { isString } from 'lodash-es';
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie-signature';
import { oneYear } from '~/lib/date';
import { LOGIN_COOKIE_NAME } from '~/lib/constants';

export const discourseSsoSecret = process.env.DISCOURSE_SSO_SECRET as string;

export function getHmac() {
  return crypto.createHmac('sha256', discourseSsoSecret);
}

export function getAuthenticatedUserId(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const tentativeUserId = getCookie(LOGIN_COOKIE_NAME, { req, res });

  if (!isString(tentativeUserId)) {
    return null;
  }

  const userId = cookie.unsign(tentativeUserId, discourseSsoSecret);

  if (!userId) {
    return null;
  }

  return userId;
}

export function setAuthCookie(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
) {
  const cookieOptions = {
    req,
    res,
    secure: true,
    maxAge: oneYear,
  } as const;

  setCookie(
    LOGIN_COOKIE_NAME,
    cookie.sign(userId, discourseSsoSecret),
    cookieOptions,
  );
}
