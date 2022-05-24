import Link from 'next/link';
import React from 'react';
import { BiHash, BiLink, BiMessage } from 'react-icons/bi';
import { getSourceHost } from '~/lib/factHelpers';
import { useFact } from '~/components/hooks/useFact';
import { Tag } from '~/components/Tag';
import { pluralize } from '~/lib/pluralize';
import { Tag as TTag, Fact as TFact } from '~/lib/groq/fact.partial.groq';

interface FactTagsProps {
  tags: TTag[];
  date: string;
}

export const FactTags: React.FC<FactTagsProps> = ({ tags, date }) => (
  <div className="flex flex-wrap items-center gap-2.5">
    {tags.map((t) => {
      return (
        <Tag key={t.tag.name}>
          <span className="flex items-center gap-1 text-neutral-500">
            <BiHash /> {t.isLowConfidence && 'Possibly '}
            {t.tag.name}
          </span>
        </Tag>
      );
    })}{' '}
    <p className="text-sm text-neutral-500">{date}</p>
  </div>
);

interface FactQuoteProps {
  fact: TFact;
  name: string;
}

export const FactQuote: React.FC<FactQuoteProps> = ({ fact, name }) => (
  <div>
    {(fact.type === 'quote' && (
      <>
        <p className="text-base">
          {fact.context}, {name} said
        </p>

        <blockquote className="my-2.5 block border-l-4 border-blue-400 bg-blue-50 p-5 text-base ">
          {fact.quote}
        </blockquote>
      </>
    )) || <p>{(fact as any).content}</p>}
  </div>
);

interface FactProps {
  fact: TFact;
  celebName: string;
  celebSlug?: string;
  linkToFactPage?: boolean;
}

export const Fact: React.FC<FactProps> = ({
  fact,
  celebName,
  celebSlug,
  linkToFactPage,
}) => {
  const { ref, commentCount } = useFact(fact);

  return (
    <section
      aria-label="Celebrity Fact"
      className="flex flex-col gap-5 p-5"
      ref={ref}
    >
      <FactTags tags={fact.tags} date={fact.date} />

      {linkToFactPage ? (
        <Link href={`/${celebSlug}/fact/${fact._id}`} passHref>
          <a>
            <FactQuote fact={fact} name={celebName} />
          </a>
        </Link>
      ) : (
        <FactQuote fact={fact} name={celebName} />
      )}

      <div className="mx-2 -mt-3 flex gap-2.5 text-neutral-600">
        <Link href={fact.forumLink} passHref>
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

        <Link href={fact.source} passHref>
          <a
            rel="noreferrer"
            target="_blank"
            className="flex select-none items-center gap-1 text-xs text-neutral-500 transition focus:border-blue-300"
          >
            <BiLink className="text-base" />
            {getSourceHost(fact.source)}
          </a>
        </Link>
      </div>
    </section>
  );
};
