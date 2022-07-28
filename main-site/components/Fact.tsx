import Image, { ImageProps } from 'next/image';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { BiMessage } from 'react-icons/bi';
import { FaQuoteLeft } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { FacebookComments } from '~/components/FacebookComments';
import { FacebookCommentsCount } from '~/components/FacebookCommentsCount';
import { recordGaEvent } from '~/components/hooks/useGaEventRecorder';
import { ShareButton } from '~/components/ShareButton';
import { Tag } from '~/components/Tag';
import { c } from '~/lib/c';
import { getFactIssue } from '~/lib/getFactIssue';
import { getFactPagePathname } from '~/lib/getFactPagePathname';
import { getFactPageTitle } from '~/lib/getFactPageTitle';
import { getSourceHost } from '~/lib/getSourceHost';
import { Celeb } from '~/lib/groq/celeb.projection';
import { Fact as TFact, QuoteFact } from '~/lib/groq/fact.projection';
import { celebNameToIssue } from '~/lib/language/celebNameToIssue';
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

export const Fact: React.FC<{
  fact: TFact;
  celebName: string;
  slug: Celeb['slug'];
  link?: boolean;
  showCommentsButton?: boolean;
  showIssueName?: boolean;
}> = (props) => {
  const { ref: factBodyRef, inView: factBodyInView } = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (factBodyInView) {
      recordGaEvent('fact_view', { id: props.fact._id });
    }
  }, [factBodyInView, props.fact._id]);

  const link = props.link ?? false;
  const showCommentsButton = props.showCommentsButton ?? true;
  const showIssueName = props.showIssueName ?? false;
  const [showComments, setShowComments] = useState(false);
  const [ogImageError, setOgImageError] = useState(false);
  const showOgImage = props.fact.openGraphImage && !ogImageError;

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
            'relative -mx-5 -mt-5 h-[350px] bg-neutral-700': showOgImage,
          })}
        >
          {showOgImage && (
            <UnoptimizedImage
              onError={() => setOgImageError(true)}
              src={props.fact.openGraphImage!}
              alt={props.celebName}
            />
          )}
          <div
            className={c(
              'FACT-TAGS flex flex-wrap items-center gap-2.5',
              showOgImage
                ? c(
                    'absolute bottom-0 left-0 right-0',
                    'bg-gradient-to-t from-black via-transparent to-transparent',
                    'px-4 pb-5 pt-32',
                  )
                : '',
            )}
          >
            {showIssueName && <IssueName />}{' '}
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
                'text-white': showOgImage,
              })}
            >
              {props.fact.date}
            </p>
            <Link href={props.fact.source} passHref>
              <a
                rel="noreferrer"
                target="_blank"
                className={c(
                  'pointer-events-auto flex select-none items-center gap-1 text-xs hover:underline default:text-neutral-500',
                  { 'text-white': showOgImage },
                )}
              >
                {getSourceHost(props.fact.source)}
              </a>
            </Link>
          </div>
        </div>

        <div ref={factBodyRef} className="FACT-BODY flex flex-col gap-3">
          {(props.fact.type === 'quote' && renderFactBody(props.fact)) || (
            <p>{(props.fact as any).content}</p>
          )}
        </div>

        <div className="FACT-FOOTER flex gap-2.5 text-neutral-600">
          {showCommentsButton && (
            <button
              onClick={() => setShowComments(!showComments)}
              id="fact-comments-link"
              className="pointer-events-auto flex select-none items-center gap-0.5 text-base text-neutral-500 underline"
            >
              <BiMessage className="text-lg" />

              <div className={c({ hidden: showComments })}>
                <FacebookCommentsCount slug={props.slug} fact={props.fact} />
              </div>

              {showComments ? 'Close comments' : `What's your opinion?`}
            </button>
          )}

          <div className="flex-1" />

          <ShareButton
            className="pointer-events-auto"
            buttonText="Share"
            share={{
              text: getFactPageTitle(props.celebName, props.fact, 200),
              url: `https://hollowverse.com${getFactPagePathname(
                props.slug,
                props.fact,
              )}`,
            }}
          />
        </div>

        {showComments && (
          <div className="-mx-5 -mb-5">
            <hr />
            <div className="mx-3 my-1">
              <FacebookComments
                pathname={getFactPagePathname(props.slug, props.fact)}
                limit={5}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );

  function IssueName() {
    const issue = getFactIssue(props.fact);

    return (
      <Link href={`/${props.slug}/issue/${issue._id}`}>
        <a
          title={celebNameToIssue(props.celebName, issue)}
          className={c(
            'pointer-events-auto border-b px-2 font-semibold default:border-purple-500 default:text-neutral-500',
            { 'border-purple-200 text-white': showOgImage },
          )}
        >
          {issue.name}
        </a>
      </Link>
    );
  }

  function renderFactBody(fact: QuoteFact) {
    return fact.quote.length > fact.context.length ? (
      <>
        {renderQuote()}
        {renderContext()}
      </>
    ) : (
      <>
        {renderContext()}
        {renderQuote()}
      </>
    );

    function renderQuote() {
      return (
        <div className="my-3 flex gap-2" id="fact-quote">
          <div>
            <FaQuoteLeft className="text-2xl text-neutral-300" />
          </div>
          <blockquote>{fact.quote}</blockquote>
        </div>
      );
    }

    function renderContext() {
      return (
        <p className="text-base text-neutral-500" id="fact-context">
          {props.celebName} said, {lowercaseFirstLetter()}
        </p>
      );

      function lowercaseFirstLetter() {
        return fact.context.charAt(0).toLowerCase() + fact.context.slice(1);
      }
    }
  }
};
