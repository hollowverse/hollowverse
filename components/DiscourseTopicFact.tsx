/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { formatFactDate } from '~/lib/date';
import { Fact } from '~/lib/groq/fact.partial.groq';
import { Picture } from '~/lib/groq/picture.partial.groq';
import { sanityImage } from '~/lib/sanityio';

export function DiscourseTopicFact(
  props: Fact & {
    name: string;
    slug: string;
    picture: Picture;
    _createdAt: string;
  },
) {
  return (
    <div data-theme="fact-wrapper">
      <a href={`/${props.slug}`} data-theme="fact-heading">
        <div data-theme="fact-heading-inner">
          <div data-theme="fact-heading-image">
            <img
              alt={props.name}
              src={sanityImage(props.picture)
                .fit('crop')
                .crop('top')
                .width(150)
                .height(150)
                .url()}
            />
          </div>
          <div data-theme="fact-heading-text">
            <p>{props.name}</p>
            <p className="fact-heading-issue">{props.topics[0].name}</p>
          </div>
        </div>
      </a>

      <div data-theme="fact-tags">
        {props.tags.map((t) => {
          return (
            <p data-theme="fact-tag" key={t.tag.name}>
              # {t.isLowConfidence && 'Possibly '}
              {t.tag.name}
              {t.isBackground && ' Background'}
            </p>
          );
        })}{' '}
        <p data-theme="fact-date">{formatFactDate(props.date)}</p>
      </div>

      <div data-theme="fact-body">
        {(props.type === 'quote' && (
          <>
            <p data-theme="quote-intro">
              {props.context}, {props.name} said
            </p>

            <blockquote data-theme="fact-quote">{props.quote}</blockquote>
          </>
        )) || <p data-theme="fact-content">{(props as any).content}</p>}
      </div>

      <hr />

      <div>
        This was added to the record of{' '}
        <a href={`https://hollowverse.com/${props.slug}`}>
          {props.name}
          &apos;s views
        </a>{' '}
        on {formatFactDate(props._createdAt.split('T')[0])}.
      </div>
    </div>
  );
}
