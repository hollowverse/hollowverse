import Link from 'next/link';
import React from 'react';
import { BiCalendar, BiLink, BiUserCircle } from 'react-icons/bi';
import { Card } from '~/components/Card';
import { CelebImage } from '~/components/CelebImage';
import { DiscourseThread } from '~/components/DiscourseThread';
import { FactQuote, FactTags } from '~/components/Fact-new';
import { useFact } from '~/components/hooks/useFact';
import { Page } from '~/components/Page';
import { getSourceHost } from '~/lib/factHelpers';
import { FactPageProps } from '~/lib/getStatic/factPage.getStaticProps';

export default function FactPage({ celeb, fact }: FactPageProps) {
  const { ref, commentAuthor } = useFact(fact);

  const sourceHost = getSourceHost(fact.source);

  return (
    <Page
      title={`${celeb.name}'s views on ${fact.topics[0].name}`}
      description={`${celeb.name} on ${sourceHost}: ${fact.tags
        .map((t) => t.tag.name)
        .join(', ')}`}
      allowSearchEngines={false}
      pathname={celeb.slug}
    >
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-5 p-5">
          <div className="relative aspect-square w-20">
            <CelebImage
              className="rounded-xl object-cover"
              layout="fill"
              picture={celeb.picture}
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
                Source:{' '}
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
}

export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
export { getStaticProps } from '~/lib/getStatic/factPage.getStaticProps';
