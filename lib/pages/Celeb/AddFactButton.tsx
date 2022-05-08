import { useRouter } from 'next/router';
import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { getContributeLink } from '~/lib/pages/utils/getContributeLink';
import { useCelebContext } from '~/lib/pages/components/StaticPropsContextProvider';

export const AddFactButton = () => {
  const context = useCelebContext();
  const router = useRouter();
  const { name, slug } = context.celeb;

  return (
    <button
      className="flex items-baseline gap-2 rounded-lg border-[3.5px] border-gray-100 bg-gradient-to-r from-blue-500 to-blue-600 px-3.5 py-2 text-white transition hover:hue-rotate-30 focus:border-blue-300"
      onClick={() => {
        const hasReadInstructions = JSON.parse(
          localStorage.getItem('hasReadInstructions') || 'false',
        );

        router.push(
          hasReadInstructions
            ? getContributeLink(name)
            : { pathname: '/~/contribute', query: { name, slug } },
        );
      }}
    >
      Add a Fact <FaPencilAlt className="text-sm" />
    </button>
  );
};
