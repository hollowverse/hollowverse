import Link from 'next/link';
import { Fragment } from 'react';
import { CelebImage } from '~/components/CelebImage';
import { Fact } from '~/components/Fact';
import { InFeedAd } from '~/components/InFeedAd';
import { TitledCard } from '~/components/ui/TitledCard';
import { FactWithCeleb } from '~/lib/groq/fact.projection';

export function FactList(props: { list: FactWithCeleb[] }) {
  return (
    <>
      {props.list.map((f, i: number) => {
        const cardTitle = (
          <Link passHref href={`/${f.celeb.slug}/issue/${f.issues[0]._id}`}>
            <a id="fact-list-item-title">
              <div className="flex flex-row items-center gap-3">
                <div className="h-[75px] w-[75px] overflow-hidden rounded-md">
                  <CelebImage
                    width={150}
                    height={150}
                    name={f.celeb.name}
                    picture={f.celeb.picture}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p>{f.celeb.name}</p>
                  <p className="h-issue-highlight text-base text-neutral-500">
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
                    celebName={f.celeb.name}
                    slug={f.celeb.slug}
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
