import Link from 'next/link';
import React from 'react';
import { BiHash, BiLink, BiMessage } from 'react-icons/bi';
import { getSourceHost } from '~/lib/factHelpers';
import { useFact } from '~/components/hooks/useFact';
import { Tag } from '~/components/Tag';
import { pluralize } from '~/lib/pluralize';
import { Fact as TFact } from '~/lib/groq/fact.partial.groq';

export const Fact: React.FC<{ value: TFact; celebName: string }> = ({
  value,
  celebName,
}) => {
  const { ref, commentCount } = useFact(value);

  return (
    <section
      aria-label="Celebrity Fact"
      className="flex flex-col gap-5 p-5"
      ref={ref}
    >
      <div className="flex flex-wrap items-center gap-2.5">
        {value.tags.map((t) => {
          return (
            <Tag key={t.tag.name}>
              <span className="flex items-center gap-1 text-neutral-500">
                <BiHash /> {t.isLowConfidence && 'Possibly '}
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
              {value.context}, {celebName} said
            </p>

            <blockquote className="my-2.5 block border-l-4 border-blue-400 bg-blue-50 p-5 text-base ">
              {value.quote}
            </blockquote>
          </>
        )) || <p>{(value as any).content}</p>}
      </div>

      <div className="mx-2 -mt-3 flex gap-2.5 text-neutral-600">
        <Link href={value.forumLink} passHref>
          <a className="flex select-none items-center gap-1 text-base text-neutral-500 transition focus:border-blue-300">
            <BiMessage className="text-lg" />
            {commentCount > 0 ? (
              <>
                {commentCount} {pluralize(commentCount, 'comment', 'comments')}
              </>
            ) : (
              <>Leave a comment</>
            )}
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
