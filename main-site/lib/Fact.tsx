import Image, { ImageProps } from 'next/image';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FactFooter } from '~/lib/FactFooter';
import { recordGaEvent } from '~/lib/useGaEventRecorder';
import { Link } from '~/lib/Link';
import { Tag } from '~/lib/Tag';
import { c } from '~/lib/c';
import { getFactIssue } from '~/lib/getFactIssue';
import { getSourceHost } from '~/lib/getSourceHost';
import { Celeb } from '~/lib/celeb.projection';
import { Fact as TFact } from '~/lib/fact.projection';
import { celebNameToIssue } from '~/lib/celebNameToIssue';

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
  const showIssueName = props.showIssueName ?? false;
  const [ogImageError, setOgImageError] = useState(false);
  const showOgImage = false && props.fact.openGraphImage && !ogImageError;

  return (
    <section id="fact" className="flex flex-col p-5 pb-0">
      <div className="FACT-MAIN-CONTAINER flex flex-col gap-5">
        <FactHead />

        <FactBody />

        <FactFooter {...props} />
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
              <Tag key={t.tag.name} tagId={t.tag._id}>
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
        {/* {link && (
          <Link href={`/${props.slug}/fact/${props.fact._id}`} passHref>
            <a
              id="fact-details"
              className="pointer-events-auto absolute -inset-5 -z-10 hover:bg-gray-50 focus:bg-gray-50"
            >
              <span className="invisible">Fact details</span>
            </a>
          </Link>
        )} */}

        {(props.fact.type === 'quote' && (
          <>
            <p className="text-neutral-600" id="fact-context">
              {props.fact.context}
            </p>

            <div className="my-1 flex" id="fact-quote">
              <blockquote className="border-l-4 pl-2 text-neutral-700">
                {props.fact.quote}
              </blockquote>
            </div>
          </>
        )) || <p className="text-neutral-700">{(props.fact as any).content}</p>}
      </div>
    );
  }

  function IssueName() {
    const issue = getFactIssue(props.fact);

    return (
      <p
        title={celebNameToIssue(props.celebName, issue)}
        className={c(
          'pointer-events-auto border-b px-2 font-semibold default:border-purple-500 default:text-neutral-500',
          { 'border-purple-200 text-white': showOgImage },
        )}
      >
        {issue.name}
      </p>
    );
  }
};
