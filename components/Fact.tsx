import { defaultTo } from 'lodash-es';
import Link from 'next/link';
import React from 'react';
import { BiHash, BiLink, BiMessage } from 'react-icons/bi';
import { useFact } from '~/components/hooks/useFact';
import { Tag } from '~/components/Tag';
import { getSourceHost } from '~/lib/getSourceHost';
import { Celeb } from '~/lib/groq/celeb.partial.groq';
import { Fact as TFact } from '~/lib/groq/fact.partial.groq';
import { pluralize } from '~/lib/pluralize';

type HookReturnType = ReturnType<typeof useFact>;

export const Fact: React.FC<{
  value: TFact;
  celebName: string;
  showFooter?: boolean;
  linkSlug?: Celeb['slug'];
  inViewRef: HookReturnType['ref'];
  commentCount: HookReturnType['commentCount'];
}> = (props) => {
  const showFooter = defaultTo(props.showFooter, true);

  return (
    <section className="relative m-5 flex flex-col gap-5" ref={props.inViewRef}>
      <div className="pointer-events-none z-10 flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2.5">
          {props.value.tags.map((t) => {
            return (
              <Tag key={t.tag.name}>
                <span className="flex items-center gap-1 text-neutral-500">
                  <BiHash /> {t.isLowConfidence && 'Possibly '}
                  {t.tag.name}
                  {t.isBackground && ' Background'}
                </span>
              </Tag>
            );
          })}{' '}
          <p className="text-sm text-neutral-500">{props.value.date}</p>
        </div>

        <div>
          {(props.value.type === 'quote' && (
            <>
              <p className="text-base">
                {props.value.context}, {props.celebName} said
              </p>

              <blockquote className="my-2.5 block border-l-4 border-blue-400 bg-blue-50 p-5 text-base ">
                {props.value.quote}
              </blockquote>
            </>
          )) || <p>{(props.value as any).content}</p>}
        </div>

        {showFooter && (
          <div className="FACT-FOOTER mx-5 -mt-3 flex gap-2.5 text-neutral-600">
            <Link href={`${props.value.forumLink}#reply`} passHref>
              <a className="pointer-events-auto flex select-none items-center gap-1 text-base text-neutral-500 transition hover:underline focus:border-blue-300">
                <BiMessage className="text-lg" />
                {props.commentCount !== null && props.commentCount > 0 ? (
                  <>
                    {props.commentCount}{' '}
                    {pluralize(props.commentCount, 'comment', 'comments')}
                  </>
                ) : (
                  <>Leave a comment</>
                )}
              </a>
            </Link>

            <div className="flex-1" />

            <Link href={props.value.source} passHref>
              <a
                rel="noreferrer"
                target="_blank"
                className="pointer-events-auto flex select-none items-center gap-1 text-xs text-neutral-500 transition hover:underline focus:border-blue-300"
              >
                <BiLink className="text-base" />
                {getSourceHost(props.value.source)}
              </a>
            </Link>
          </div>
        )}
      </div>

      {props.linkSlug && (
        <Link href={`/${props.linkSlug}/fact/${props.value._id}`} passHref>
          <a className="absolute -inset-5 hover:bg-gray-50 focus:bg-gray-50">
            <span className="invisible">Fact details</span>
          </a>
        </Link>
      )}
    </section>
  );
};
