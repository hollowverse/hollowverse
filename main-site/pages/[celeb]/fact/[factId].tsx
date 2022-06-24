import { Link } from '~/lib/Link';
import React from 'react';
import { BiCalendar, BiLink, BiUserCircle } from 'react-icons/bi';
import { FiMessageSquare } from 'react-icons/fi';
import { CelebImage } from '~/components/CelebImage';
import { DiscourseThread } from '~/components/DiscourseThread';
import { Fact } from '~/components/Fact';
import { useFact } from '~/components/hooks/useFact';
import { LovelyTopBorder } from '~/components/LovelyTopBorder';
import { Page } from '~/components/Page';
import { Spinner } from '~/components/Spinner';
import { getSourceHost } from '~/lib/getSourceHost';
import { FactPageProps } from '~/lib/getStatic/factPage.getStaticProps';
import { Fact as TFact } from '~/lib/groq/fact.projection';
import { Card2 } from '~/components/ui/Card2';
import { TitledCard } from '~/components/ui/TitledCard';
import { formatFactDate } from '~/lib/date';

function getTextSummary(name: string, fact: TFact, length: number) {
  let text: string;

  if (fact.type === 'quote') {
    text = `${name}: ${fact.quote}`;
  } else {
    text = fact.content;
  }

  return text.substring(0, length) + '...';
}

export default function FactPage({ celeb, fact }: FactPageProps) {
  const { contributorUsername, commentCount } = useFact(fact);
  const sourceHost = getSourceHost(fact.source);

  return (
    <Page
      title={getTextSummary(celeb.name, fact, 55)}
      description={getTextSummary(celeb.name, fact, 145)}
      allowSearchEngines
      pathname={`${celeb.slug}/fact/${fact._id}`}
    >
      <div className="h-container flex flex-col gap-5">
        <div className="mx-5 mt-5 flex items-center gap-5">
          <div className="relative aspect-square w-20">
            <CelebImage
              className="rounded-xl object-cover"
              picture={celeb.picture}
              name={celeb.name}
            />
          </div>
          <div>
            <Link href={`/${celeb.slug}`} passHref>
              <a>
                <h1 className="text-2xl font-bold">{celeb.name}</h1>
              </a>
            </Link>
            <h2 className="text-xl text-neutral-500">
              on {fact.issues[0].name}
            </h2>
          </div>
        </div>

        <Card2>
          <LovelyTopBorder />
          <div className="flex flex-col gap-3 p-5">
            <Fact
              slug={celeb.slug}
              fact={fact}
              celebName={celeb.name}
              showFooter={false}
            />

            <hr className="-mx-5" />

            <div className="flex flex-col gap-2 text-sm text-gray-500">
              <div className="inline-flex items-center">
                <BiCalendar size={22} className="mr-2" />
                <p>Happened on {formatFactDate(fact.date)}</p>
              </div>
              <div className="inline-flex items-center">
                <BiUserCircle size={22} className="mr-2" />
                <p>
                  Contributed by{' '}
                  <Link
                    href={`https://forum.hollowverse.com/u/${contributorUsername}`}
                  >
                    <a className="h-gray-link">@{contributorUsername}</a>
                  </Link>
                </p>
              </div>
              <div className="inline-flex items-center">
                <BiLink size={22} className="mr-2" />
                <p>
                  Source:{' '}
                  <Link href={fact.source} passHref>
                    <a rel="noreferrer" target="_blank" className="h-gray-link">
                      {sourceHost}
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Card2>

        <TitledCard titledContentProps={{ title: 'Comments' }}>
          <div className="p-5">
            {(commentCount === null && (
              <div className="w-ful flex justify-center">
                <Spinner />
              </div>
            )) ||
              (commentCount !== null && commentCount > 0 ? (
                <DiscourseThread threadUrl={fact.forumLink} />
              ) : (
                <div className="flex w-full flex-col gap-5 text-base">
                  <p>
                    What are your thoughts on this? Share them in the comments
                    below.
                  </p>

                  <Link href={`${fact.forumLink}#reply`}>
                    <a className="textbox-border flex h-20 w-full items-center justify-center gap-2 bg-gray-50 text-lg text-gray-400 shadow-inner hover:bg-gray-100 hover:text-gray-500">
                      <FiMessageSquare /> Start discussion
                    </a>
                  </Link>
                </div>
              ))}
          </div>
        </TitledCard>
      </div>
    </Page>
  );
}

export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
export { getStaticProps } from '~/lib/getStatic/factPage.getStaticProps';
