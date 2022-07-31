import Image, { ImageProps } from 'next/image';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import {
  FaRegChartBar,
  FaRegCommentAlt,
  FaRegShareSquare,
} from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import { FacebookComments } from '~/components/FacebookComments';
import { FacebookCommentsCount } from '~/components/FacebookCommentsCount';
import { FactLikeButton } from '~/components/FactLikeButton';
import { recordGaEvent } from '~/components/hooks/useGaEventRecorder';
import { Link } from '~/components/Link';
import { useShareButton } from '~/components/ShareButton';
import { Tag } from '~/components/Tag';
import { c } from '~/lib/c';
import { factViewCountResultsProvider } from '~/lib/FactViewCountResultsProvider';
import { getFactIssue } from '~/lib/getFactIssue';
import { getFactPagePathname } from '~/lib/getFactPagePathname';
import { getFactPageTitle } from '~/lib/getFactPageTitle';
import { getSourceHost } from '~/lib/getSourceHost';
import { Celeb } from '~/lib/groq/celeb.projection';
import { Fact as TFact } from '~/lib/groq/fact.projection';
import { celebNameToIssue } from '~/lib/language/celebNameToIssue';

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
  const link = props.link ?? false;
  const showIssueName = props.showIssueName ?? false;
  const [ogImageError, setOgImageError] = useState(false);
  const showOgImage = props.fact.openGraphImage && !ogImageError;

  return (
    <section id="fact" className="flex flex-col gap-5">
      <div className="FACT-MAIN-CONTAINER flex flex-col gap-5">
        <FactHead />

        <FactBody />

        <FactFooter />
      </div>
    </section>
  );

  function FactHead() {
    return (
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
    );
  }

  function FactBody() {
    const { ref: factBodyRef, inView: factBodyInView } = useInView({
      triggerOnce: true,
    });

    useEffect(() => {
      if (factBodyInView) {
        recordGaEvent('fact_view', { id: props.fact._id });
      }
    }, [factBodyInView]);

    return (
      <div
        ref={factBodyRef}
        className="FACT-BODY pointer-events-none relative z-0 flex flex-col gap-3"
      >
        {link && (
          <Link href={`/${props.slug}/fact/${props.fact._id}`} passHref>
            <a
              id="fact-details"
              className="pointer-events-auto absolute -inset-5 -z-10 hover:bg-gray-50 focus:bg-gray-50"
            >
              <span className="invisible">Fact details</span>
            </a>
          </Link>
        )}

        {(props.fact.type === 'quote' && (
          <>
            <p className="text-lg text-neutral-600" id="fact-context">
              {props.fact.context} {props.celebName} said
            </p>

            <div className="my-1 flex" id="fact-quote">
              <blockquote className="border-l-4 pl-2 text-lg text-neutral-700">
                {props.fact.quote}
              </blockquote>
            </div>
          </>
        )) || (
          <p className="text-lg text-neutral-700">
            {(props.fact as any).content}
          </p>
        )}
      </div>
    );
  }

  function FactFooter() {
    const { getClickHandler, copied } = useShareButton();
    const [viewCount, setViewCount] = useState('Views');
    const showCommentsButton = props.showCommentsButton ?? true;
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
      async function req() {
        const viewCountRes = await factViewCountResultsProvider.get(
          props.fact._id,
        );

        if (viewCountRes) {
          setViewCount(viewCountRes);
        }
      }

      req();
    }, []);

    return (
      <div>
        <div className="FACT-FOOTER -mx-5 flex content-between justify-between border-t px-5 pt-5 text-neutral-600">
          <FactLikeButton fact={props.fact} />

          {showCommentsButton && (
            <button
              onClick={() => setShowComments(true)}
              id="fact-comments-link"
              className="pointer-events-auto flex select-none flex-col items-center gap-0.5 text-base"
            >
              <FaRegCommentAlt className="text-xl" />

              <div className="font-semibold">
                <FacebookCommentsCount fact={props.fact} slug={props.slug} />
              </div>
            </button>
          )}

          <ButtonContainer>
            <FaRegChartBar className="text-xl" />
            <p className="font-semibold">{viewCount}</p>
          </ButtonContainer>

          <ButtonContainer>
            <button
              onClick={getClickHandler({
                text: getFactPageTitle(props.celebName, props.fact, 200),
                url: `https://hollowverse.com${getFactPagePathname(
                  props.slug,
                  props.fact,
                )}`,
              })}
            >
              <FaRegShareSquare className="text-xl" />
            </button>
            <p className="font-semibold">
              {copied ? <span className="text-xs">URL copied</span> : 'Share'}
            </p>
          </ButtonContainer>
        </div>

        {showComments ? (
          <div className="-mx-5 -mb-5">
            <hr />
            <div className="mx-3 my-1">
              <FacebookComments
                pathname={getFactPagePathname(props.slug, props.fact)}
                limit={5}
              />
            </div>
          </div>
        ) : null}
      </div>
    );

    function ButtonContainer(buttonProps: PropsWithChildren<{}>) {
      return (
        <div className="flex flex-col items-center gap-0.5">
          {buttonProps.children}
        </div>
      );
    }
  }

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
};
