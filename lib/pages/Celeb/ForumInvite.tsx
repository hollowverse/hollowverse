import Link from 'next/link';
import React from 'react';
import { getForumInviteLink } from '~/lib/pages/utils/getForumInviteLink';

export function ForumInvite(params: { name: string }) {
  return (
    <div className="m-5 rounded-md bg-blue-500 p-5 text-lg text-white">
      <p>Did we miss something about {params.name}?</p>
      <p>
        <Link href={getForumInviteLink(params.name)}>
          Tell us in the forum!
        </Link>
      </p>
    </div>
  );
}
