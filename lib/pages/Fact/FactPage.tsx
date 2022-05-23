import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { BiCalendar, BiLink, BiUserCircle } from 'react-icons/bi';
import { Card } from '~/lib/pages/components/Card';
import { Page } from '~/lib/pages/components/Page';
import { FactQuote, FactTags } from '~/lib/pages/components/Fact';
import { DiscourseThread } from '~/lib/pages/components/DiscourseThread';
import { CelebImage } from '~/lib/pages/components/CelebImage';
import { getSourceHost } from '~/lib/pages/Celeb/Facts/factHelpers';
import { useFact } from '~/lib/pages/Celeb/Facts/useFact';
import { FactPageProps } from '~/lib/pages/utils/types';

export const FactPage: NextPage<FactPageProps> = ({ celeb, fact, placeholderImage }) => {
  const { ref, commentAuthor } = useFact(fact);

  const sourceHost = getSourceHost(fact.source);

  return (
    <Page
      title={`${celeb.name}'s views on ${fact.topics[0].name}`}
      description={`${celeb.name} on ${sourceHost}: ${fact.tags.map((t) => t.tag.name).join(', ')}`}
      allowSearchEngines
      pathname={celeb.slug}
    >
      <div className="mx-auto max-w-3xl">
        <div className="flex gap-5 items-center p-5">
          <div className="relative w-20 aspect-square">
            <CelebImage
              className="rounded-xl object-cover"
              layout="fill"
              picture={celeb.picture || placeholderImage}
              name={celeb.name}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">{celeb.name}</h1>
            <h3 className="text-neutral-500">on {sourceHost}</h3>
          </div>
        </div>
        <Card disablePadding title={fact.topics[0].name}>
          <div className="flex flex-col gap-5 p-5">
            <FactTags tags={fact.tags} date={fact.date} />

            <FactQuote fact={fact} name={celeb.name} />

            <hr />

            <div className="inline-flex items-center">
              <BiCalendar size={22} className="mr-2" />
              <p>This happened on {fact.date}</p>
            </div>
            <div className="inline-flex items-center">
              <BiUserCircle size={22} className="mr-2" />
              <p ref={ref}>Contributed by @{commentAuthor}</p>
            </div>
            <div className="inline-flex items-center">
              <BiLink size={22} className="mr-2" />
              <p>
                Source:
                {' '}
                <Link href={fact.source} passHref>
                  <a
                    rel="noreferrer"
                    target="_blank"
                    className="select-none gap-1 transition focus:border-blue-300"
                  >
                    {sourceHost}
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </Card>

        <Card title="Comments">
          <DiscourseThread threadUrl={fact.forumLink} />
        </Card>
      </div>
    </Page>
  );
};
