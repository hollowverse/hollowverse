import { defaultTo } from 'lodash-es';
import Image, { ImageProps } from 'next/image';
import React, { PropsWithChildren, useState } from 'react';
import { BiMessage } from 'react-icons/bi';
import { FaQuoteLeft } from 'react-icons/fa';
import { FacebookComments } from '~/components/FacebookComments';
import { FacebookCommentsCount } from '~/components/FacebookCommentsCount';
import { ShareButton } from '~/components/ShareButton';
import { Tag } from '~/components/Tag';
import { c } from '~/lib/c';
import { getFactPagePathname } from '~/lib/getFactPagePathname';
import { getFactPageTitle } from '~/lib/getFactPageTitle';
import { getSourceHost } from '~/lib/getSourceHost';
import { Celeb } from '~/lib/groq/celeb.projection';
import { Fact as TFact } from '~/lib/groq/fact.projection';
import { Link } from '~/lib/Link';

function UnoptimizedImage(
  props: PropsWithChildren<{
    src: string;
    alt: string;
    onError?: ImageProps['onError'];
  }>,
) {
  return (
    <Image
      unoptimized
      onError={props.onError}
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

function renderQuote(quote: string) {
  return (
    <div className="my-3 flex gap-2" id="fact-quote">
      <div>
        <FaQuoteLeft className="text-2xl text-neutral-300" />
      </div>
      <blockquote>{quote}</blockquote>
    </div>
  );
}

function renderContext(celebName: string, context: string) {
  return (
    <p className="text-base text-neutral-500" id="fact-context">
      {celebName} said, {lowercaseFirstLetter(context)}
    </p>
  );
}

function renderQuoteType(quote: string, context: string, celebName: string) {
  return quote.length > context.length ? (
    <>
      {renderQuote(quote)}
      {renderContext(celebName, context)}
    </>
  ) : (
    <>
      {renderContext(celebName, context)}
      {renderQuote(quote)}
    </>
  );
}

export const Fact: React.FC<{
  fact: TFact;
  celebName: string;
  slug: Celeb['slug'];
  link?: boolean;
  showCommentsButton?: boolean;
}> = (props) => {
  const link = defaultTo(props.link, false);
  const showCommentsButton = props.showCommentsButton ?? true;
  const [showComments, setShowComments] = useState(false);

  const [showOgImage, setShowOgImage] = useState(true);

  const displayOpenGraphImage = props.fact.openGraphImage && showOgImage;

  return (
    <section id="fact" className="relative z-0 flex flex-col gap-5">
      {link && (
        <Link href={`/${props.slug}/fact/${props.fact._id}`} passHref>
          <a
            id="fact-details"
            className="absolute -inset-5 -z-10 hover:bg-gray-50 focus:bg-gray-50"
          >
            <span className="invisible">Fact details</span>
          </a>
        </Link>
      )}

      <div className="FACT-MAIN-CONTAINER pointer-events-none flex flex-col gap-5">
        <div
          className={c('FACT-HEAD', {
            'relative -mx-5 -mt-5 h-[350px] bg-neutral-700':
              displayOpenGraphImage,
          })}
        >
          {displayOpenGraphImage && (
            <UnoptimizedImage
              onError={() => setShowOgImage(false)}
              src={props.fact.openGraphImage!}
              alt={props.celebName}
            />
          )}
          <div
            className={c(
              'FACT-TAGS flex flex-wrap items-center gap-2.5',
              displayOpenGraphImage
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
                <Tag
                  key={t.tag.name}
                  link={`/${props.slug}/tag/${t.tag._id}#content`}
                  tagId={t.tag._id}
                >
                  <span className="flex items-center gap-1 text-neutral-700">
                    {t.isLowConfidence && 'Possibly '}
                    {t.tag.name}
                    {t.isBackground && ' Background'}
                  </span>
                </Tag>
              );
            })}{' '}
            <p
              className={c('text-sm default:text-neutral-700', {
                'text-white': props.fact.openGraphImage,
              })}
            >
              {props.fact.date}
            </p>
            <Link href={props.fact.source} passHref>
              <a
                rel="noreferrer"
                target="_blank"
                className={c(
                  'pointer-events-auto flex select-none items-center gap-1 text-xs default:text-neutral-500',
                  { 'text-white': props.fact.openGraphImage },
                )}
              >
                {getSourceHost(props.fact.source)}
              </a>
            </Link>
          </div>
        </div>

        <div className="FACT-BODY flex flex-col gap-3">
          {(props.fact.type === 'quote' &&
            renderQuoteType(
              props.fact.quote,
              props.fact.context,
              props.celebName,
            )) || <p>{(props.fact as any).content}</p>}
        </div>

        <div className="FACT-FOOTER flex gap-2.5 text-neutral-600">
          {showCommentsButton && (
            <button
              onClick={() => setShowComments(!showComments)}
              id="fact-comments-link"
              className="pointer-events-auto flex select-none items-center gap-1 text-base text-neutral-500"
            >
              <BiMessage className="text-lg" />
              <div className={c({ hidden: showComments })}>
                <FacebookCommentsCount slug={props.slug} fact={props.fact} />
              </div>
              {showComments ? 'Close comments' : 'Comments'}
            </button>
          )}

          <div className="flex-1" />

          <ShareButton
            className="pointer-events-auto"
            buttonText="Share this Fact"
            share={{
              text: getFactPageTitle(props.celebName, props.fact, 200),
              url: `https://hollowverse.com/${getFactPagePathname(
                props.slug,
                props.fact,
              )}`,
            }}
          />
        </div>

        {showComments && (
          <div className="-mx-5 -mb-5">
            <hr />
            <FacebookComments
              pathname={getFactPagePathname(props.slug, props.fact)}
              limit={5}
            />
          </div>
        )}
      </div>
    </section>
  );
};
