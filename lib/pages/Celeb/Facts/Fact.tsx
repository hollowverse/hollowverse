import React from 'react';
import Link from 'next/link';
import { useCelebContext } from '~/lib/pages/components/StaticPropsContextProvider';
import { Fact as TFact } from '~/lib/pages/utils/types';
import { Tag } from '~/lib/pages/Celeb/Tag';
import { BiMessage, BiMessageRounded, BiLink } from 'react-icons/bi';
import { FaLink } from 'react-icons/fa';
import { getSourceHost } from '~/lib/pages/Celeb/Facts/factHelpers';

export const Fact: React.FC<{ value: TFact }> = ({ value }) => {
  const {
    celeb: { name },
  } = useCelebContext();

  return (
    <section aria-label="Celebrity Fact" className="p-5">
      <div className="mb-5 flex flex-wrap items-center gap-2.5">
        {value.tags.map((t) => {
          return (
            <Tag key={t.tag.name}>
              <span className="text-neutral-500">
                # {t.isLowConfidence && 'Possibly '}
                {t.tag.name}
              </span>
            </Tag>
          );
        })}{' '}
        <p className="text-sm text-neutral-500">{value.date}</p>
      </div>

      <div>
        {(value.type === 'quote' && (
          <>
            <p className="text-base">
              {value.context}, {name} said
            </p>

            <blockquote className="my-2.5 block border-l-4 border-blue-400 bg-blue-50 p-5 text-base ">
              {value.quote}
            </blockquote>
          </>
        )) ||
          (value.type == 'fact' && <p>{value.content}</p>)}
      </div>

      <div className="mt-5 flex gap-2.5 text-base text-neutral-600">
        <Link href={value.forumLink} passHref>
          <a className="flex select-none items-center gap-1 text-neutral-500 transition focus:border-blue-300">
            <BiMessage className="text-lg" />
            Comments
          </a>
        </Link>

        <div className="flex-1" />

        <Link href={value.source} passHref>
          <a
            rel="noreferrer"
            target="_blank"
            className="flex select-none items-center gap-1 text-xs text-neutral-500 transition focus:border-blue-300"
          >
            <BiLink className="text-base" />
            {getSourceHost(value.source)}
          </a>
        </Link>
      </div>
    </section>
  );
};
