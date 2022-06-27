/* eslint-disable @next/next/no-img-element */
import { formatFactDate } from '~/lib/date';
import { Fact } from '~/lib/groq/fact.projection';
import { Picture } from '~/lib/groq/picture.projection';
import { sanityImage } from '~/shared/lib/sanityio';

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
      <a
        href={`https://hollowverse.com/${props.slug}`}
        data-theme="fact-heading"
      >
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
            <p className="fact-heading-issue">{props.issues[0].name}</p>
          </div>
        </div>
      </a>

      <div data-theme="fact-tags">
        {props.tags.map((t) => {
          return (
            <div data-theme="fact-tag" key={t.tag.name}>
              # {t.isLowConfidence && 'Possibly '}
              {t.tag.name}
              {t.isBackground && ' Background'}
            </div>
          );
        })}{' '}
        <div data-theme="fact-date">{formatFactDate(props.date)}</div>
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

      <div data-theme="fact-source">
        <a rel="noreferrer" target="_blank" href={props.source}>
          Source &gt;
        </a>
      </div>

      <hr />

      <div>
        This user contribution was reformatted and added to the record of{' '}
        <a href={`https://hollowverse.com/${props.slug}`}>
          {props.name}
          &apos;s views
        </a>{' '}
        on {formatFactDate(props._createdAt.split('T')[0])}.
      </div>
    </div>
  );
}
