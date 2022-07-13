import Link from 'next/link';
import { Fragment } from 'react';
import { CelebImage } from '~/components/CelebImage';
import { Fact } from '~/components/Fact';
import { InFeedAd } from '~/components/InFeedAd';
import { TitledCard } from '~/components/ui/TitledCard';
import { Celeb } from '~/lib/groq/celeb.projection';
import { Fact as TFact } from '~/lib/groq/fact.projection';

export function SingleCelebFactList(props: { celeb: Celeb; facts: TFact[] }) {
  return (
    <>
      {props.facts.map((f, i: number) => {
        const cardTitle = (
          <Link passHref href={`/${props.celeb.slug}`}>
            <a id="fact-list-item-title">
              <div className="flex flex-row items-center gap-3">
                <div className="h-[75px] w-[75px] overflow-hidden rounded-md">
                  <CelebImage
                    width={150}
                    height={150}
                    name={props.celeb.name}
                    picture={props.celeb.picture}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p>{props.celeb.name}</p>
                  <p className="text-base text-neutral-500">
                    {f.issues[0].name}
                  </p>
                </div>
              </div>
            </a>
          </Link>
        );

        return (
          <Fragment key={f._id}>
            <div id="fact-list-item">
              <TitledCard
                titledContentProps={{
                  title: cardTitle,
                }}
              >
                <div className="p-5">
                  <Fact
                    link
                    fact={f}
                    celebName={props.celeb.name}
                    slug={props.celeb.slug}
                  />
                </div>
              </TitledCard>
            </div>

            {i === 0 && <InFeedAd />}
          </Fragment>
        );
      })}
    </>
  );
}
