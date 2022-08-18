import { deleteCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { LOGIN_COOKIE_NAME } from '~/lib/constants';
import { discourseApiClient } from '~/lib/discourseApiClient';
import { getAuthenticatedUserId } from '~/lib/user-auth';

export default function Logout() {
  return null;
}

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const userId = getAuthenticatedUserId(req, res);

  await discourseApiClient(`admin/users/${userId}/log_out`, {
    method: 'POST',
    body: {},
  });

  deleteCookie(LOGIN_COOKIE_NAME, { req, res });

  return {
    redirect: {
      destination: `/`,
      permanent: false,
    },
  };
}
