import { defaultTo } from 'lodash-es';
import React from 'react';
import { BiHash, BiLink, BiMessage } from 'react-icons/bi';
import { Tag } from '~/components/Tag';
import { getSourceHost } from '~/lib/getSourceHost';
import { Celeb } from '~/lib/groq/celeb.partial.groq';
import { Fact as TFact } from '~/lib/groq/fact.partial.groq';
import { Link } from '~/lib/Link';
import Image from 'next/image';
import { FaQuoteLeft } from 'react-icons/fa';

function UnoptimizedImage(src: string, alt: string) {
  return <Image loader={({ src }) => src} src={src} alt={alt} />;
}

function lowercaseFirstLetter(s: string) {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

export const Fact: React.FC<{
  fact: TFact;
  celebName: string;
  showFooter?: boolean;
  linkSlug?: Celeb['slug'];
}> = (props) => {
  const showFooter = defaultTo(props.showFooter, true);

  return (
    <section className="relative z-0 m-5 flex flex-col gap-5">
      {props.linkSlug && (
        <Link href={`/${props.linkSlug}/fact/${props.fact._id}`} passHref>
          <a className="absolute -inset-5 -z-10 hover:bg-gray-50 focus:bg-gray-50">
            <span className="invisible">Fact details</span>
          </a>
        </Link>
      )}

      <div className="pointer-events-none flex flex-col gap-5">
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

        <div className="flex flex-col gap-3">
          {(props.fact.type === 'quote' && (
            <>
              <div className="my-3 flex gap-2">
                <div>
                  <FaQuoteLeft className="text-2xl text-neutral-300" />
                </div>
                <blockquote>{props.fact.quote}</blockquote>
              </div>

              <p className="text-base text-neutral-500">
                {props.celebName} said,{' '}
                {lowercaseFirstLetter(props.fact.context)}
              </p>
            </>
          )) || <p>{(props.fact as any).content}</p>}
        </div>

        {showFooter && (
          <div className="FACT-FOOTER flex gap-2.5 text-neutral-600">
            <Link href={`${props.fact.forumLink}#reply`} passHref>
              <a className="pointer-events-auto flex select-none items-center gap-1 text-base text-neutral-500 transition hover:underline focus:border-blue-300">
                <BiMessage className="text-lg" />
                Comments
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
    </section>
  );
};
