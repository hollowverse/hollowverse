import { defaultTo } from 'lodash-es';
import React from 'react';
import { BiHash, BiLink, BiMessage } from 'react-icons/bi';
import { Tag } from '~/components/Tag';
import { getSourceHost } from '~/lib/getSourceHost';
import { Celeb } from '~/lib/groq/celeb.partial.groq';
import { Fact as TFact } from '~/lib/groq/fact.partial.groq';
import { Link } from '~/lib/Link';

export const Fact: React.FC<{
  fact: TFact;
  celebName: string;
  showFooter?: boolean;
  linkSlug?: Celeb['slug'];
}> = (props) => {
  const showFooter = defaultTo(props.showFooter, true);

  return (
    <section className="relative m-5 flex flex-col gap-5">
      <div className="pointer-events-none z-10 flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2.5">
          {props.fact.tags.map((t) => {
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
          <p className="text-sm text-neutral-500">{props.fact.date}</p>
        </div>

        <div>
          {(props.fact.type === 'quote' && (
            <>
              <p className="text-base">
                {props.fact.context}, {props.celebName} said
              </p>

              <blockquote className="my-2.5 block border-l-4 border-blue-400 bg-blue-50 p-5 text-base ">
                {props.fact.quote}
              </blockquote>
            </>
          )) || <p>{(props.fact as any).content}</p>}
        </div>

        {showFooter && (
          <div className="FACT-FOOTER mx-5 -mt-3 flex gap-2.5 text-neutral-600">
            <Link href={`${props.fact.forumLink}#reply`} passHref>
              <a className="pointer-events-auto flex select-none items-center gap-1 text-base text-neutral-500 transition hover:underline focus:border-blue-300">
                <BiMessage className="text-lg" />
                <>Leave a comment</>
              </a>
            </Link>

            <div className="flex-1" />

            <Link href={props.fact.source} passHref>
              <a
                rel="noreferrer"
                target="_blank"
                className="pointer-events-auto flex select-none items-center gap-1 text-xs text-neutral-500 transition hover:underline focus:border-blue-300"
              >
                <BiLink className="text-base" />
                {getSourceHost(props.fact.source)}
              </a>
            </Link>
          </div>
        )}
      </div>

      {props.linkSlug && (
        <Link href={`/${props.linkSlug}/fact/${props.fact._id}`} passHref>
          <a className="absolute -inset-5 hover:bg-gray-50 focus:bg-gray-50">
            <span className="invisible">Fact details</span>
          </a>
        </Link>
      )}
    </section>
  );
};
