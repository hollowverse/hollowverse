import { deleteCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { AUTH_COOKIE_NAME } from '~/lib/constants';
import { discourseApiClient } from '~/lib/discourseApiClient';
import { getUserAuth } from '~/lib/user-auth';

export default function Logout() {
  return null;
}

export async function getServerSideProps({}: GetServerSidePropsContext) {
  return {};
}
// export async function getServerSideProps({
//   req,
//   res,
// }: GetServerSidePropsContext) {
//   const auth = getUserAuth(req, res);

//   if (auth) {
//     await discourseApiClient({
//       api: `admin/users/${auth.id}/log_out`,
//       payload: {
//         method: 'POST',
//         body: {},
//       },
//     });
//   }

//   deleteCookie(AUTH_COOKIE_NAME, { req, res });

//   return {
//     redirect: {
//       destination: `/`,
//       permanent: false,
//     },
//   };
// }
