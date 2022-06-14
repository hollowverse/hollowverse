import { defaultTo } from 'lodash-es';
import React, { PropsWithChildren } from 'react';
import { BiHash, BiLink, BiMessage } from 'react-icons/bi';
import { Tag } from '~/components/Tag';
import { getSourceHost } from '~/lib/getSourceHost';
import { Celeb } from '~/lib/groq/celeb.partial.groq';
import { Fact as TFact } from '~/lib/groq/fact.partial.groq';
import { Link } from '~/lib/Link';
import Image from 'next/image';
import { FaQuoteLeft } from 'react-icons/fa';
import { c } from '~/lib/c';

function UnoptimizedImage(
  props: PropsWithChildren<{ src: string; alt: string }>,
) {
  return (
    <Image
      layout="fill"
      objectFit="cover"
      loader={({ src }) => src}
      src={props.src}
      alt={props.alt}
    />
  );
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

      <div className="FACT-MAIN-CONTAINER pointer-events-none flex flex-col gap-5">
        <div
          className={c('FACT-HEAD', {
            'relative -mx-5 -mt-5 h-[350px] bg-neutral-700':
              props.fact.openGraphImage,
          })}
        >
          {props.fact.openGraphImage && (
            <UnoptimizedImage
              src={props.fact.openGraphImage!}
              alt={props.celebName}
            />
          )}
          <div
            className={c(
              'FACT-TAGS flex flex-wrap items-center gap-2.5',
              props.fact.openGraphImage
                ? c(
                    'absolute bottom-0 left-0 right-0',
                    'bg-gradient-to-t from-black via-transparent to-transparent',
                    'px-4 pb-5 pt-32',
                  )
                : '',
            )}
          >
            {props.fact.tags.map((t) => {
              return (
                <Tag key={t.tag.name}>
                  <span className="flex items-center gap-1 text-neutral-700">
                    <BiHash /> {t.isLowConfidence && 'Possibly '}
                    {t.tag.name}
                    {t.isBackground && ' Background'}
                  </span>
                </Tag>
              );
            })}{' '}
            <p
              className={c('text-sm default:text-neutral-700', {
                ' text-white': props.fact.openGraphImage,
              })}
            >
              {props.fact.date}
            </p>
          </div>
        </div>

        <div className="FACT-BODY flex flex-col gap-3">
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
