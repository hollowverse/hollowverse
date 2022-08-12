import Link from 'next/link';
import { Fragment } from 'react';
import { CelebImage } from '~/components/c/CelebImage';
import { Fact } from '~/components/f/Fact';
import { InFeedAd } from '~/components/i/InFeedAd';
import { TitledCard } from '~/components/t/TitledCard';
import { getFactIssue } from '~/lib/getFactIssue';
import { FactWithCeleb } from '~/lib/groq/fact.projection';
import { celebNameToIssue } from '~/lib/language/celebNameToIssue';

export function FactList(props: { list: FactWithCeleb[] }) {
  return (
    <>
      {props.list.map((f, i: number) => {
        const issue = getFactIssue(f);

        const cardTitle = (
          <Link passHref href={`/${f.celeb.slug}/issue/${issue._id}`}>
            <a
              id="fact-list-item-title"
              title={celebNameToIssue(f.celeb.name, issue)}
            >
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
                  <p className="text-base text-neutral-500">
                    <span className="h-issue-highlight">{issue.name}</span>
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
                <Fact
                  link
                  fact={f}
                  celebName={f.celeb.name}
                  slug={f.celeb.slug}
                />
              </TitledCard>
            </div>

            {i === 0 && <InFeedAd />}
          </Fragment>
        );
      })}
    </>
  );
}
