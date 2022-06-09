import groq from 'groq';
import { uniq } from 'lodash-es';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Logo } from '~/components/AppBar';
import { Card } from '~/components/Card';
import { CelebGallery } from '~/components/CelebGallery';
import { CelebImage } from '~/components/CelebImage';
import { Fact } from '~/components/Fact';
import { Page } from '~/components/Page';
import { Spinner } from '~/components/Spinner';
import { formatFactDate } from '~/lib/date';
import { Fact as TFact, factPartialGroq } from '~/lib/groq/fact.partial.groq';
import { Link } from '~/lib/Link';
import { nextApiClient } from '~/lib/nextApiClient';
import { sanityClient } from '~/lib/sanityio';
import { top100CelebSlugs as _top100CelebSlugs } from '../lib/top100CelebSlugs';

const top100CelebSlugs = uniq(_top100CelebSlugs);

export default function Index(props: any) {
  const [facts, setFacts] = useState<TFact[]>(props.firstBatch.slice(0, 10));
  const [hasMore, setMore] = useState(true);

  return (
    <Page
      title="The political views and religious beliefs of celebrities"
      description="Learn the political views and religious beliefs of any celebrity"
      pathname=""
      allowSearchEngines
      className="text-neutral-600"
      appBar={
        <Container navClasses="flex-col py-3">
          <Logo className="justify-center text-3xl" />

          <h1 className="text-center text-xl italic text-neutral-500">
            The Political Views
            <br />
            and Religions of Celebrities
          </h1>
        </Container>
      }
    >
      <div className="h-container py-5">
        <div className="flex flex-col gap-7">
          <div className="px-5">
            <Link
              href={{
                pathname: '/~search',
                query: { local: true },
              }}
              passHref
            >
              <a className="textbox-border flex h-16 w-full items-center justify-center gap-2 bg-gray-50 text-lg text-gray-400 shadow-inner hover:bg-white hover:text-gray-400">
                Search for a celebrity{' '}
                <FaSearch aria-hidden className="text-xl" />
              </a>
            </Link>
          </div>

          <div className="flex flex-col gap-2.5">
            <h2 className="scale-y-110 px-5 text-xl font-semibold">
              Trending Celebrities
            </h2>

            <div className="relative z-0">
              <div className="no-scrollbar flex flex-row overflow-auto pl-5">
                <CelebGallery
                  prefetch={false}
                  celebGalleryItems={props.top100Celebs}
                  className="flex flex-row flex-nowrap justify-start"
                />
                <div className="FILLER min-w-[50px] flex-grow" />
              </div>
              <div className="LEFT-FADE absolute top-0 left-0 bottom-0 z-10 w-7 bg-gradient-to-r from-gray-100 via-gray-100 to-transparent" />
              <div className="RIGHT-FADE absolute top-0 right-0 bottom-0 z-10 w-7 bg-gradient-to-l from-gray-100 via-gray-100 to-transparent" />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <h2 className="scale-y-110 px-5 text-xl font-semibold">
              The Latest
            </h2>

            <InfiniteScroll
              className="no-scrollbar flex flex-col gap-5 overflow-hidden"
              dataLength={facts.length}
              next={() => {
                if (facts.length >= props.firstBatch.length) {
                  setMore(false);
                }

                setTimeout(() => {
                  setFacts(props.firstBatch.slice(0, facts.length + 10));
                }, 2000);
              }}
              hasMore={hasMore}
              loader={
                <div className="mt-5 flex items-center justify-center">
                  <Spinner />
                </div>
              }
            >
              {facts.map((f: any) => {
                return (
                  <Card
                    title={
                      <Link passHref href={`/${f.celeb.slug}`}>
                        <a>
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
                                {f.topics[0].name}
                              </p>
                            </div>
                          </div>
                        </a>
                      </Link>
                    }
                    key={f._id}
                    disablePadding
                  >
                    <Fact
                      fact={f}
                      celebName={f.celeb.name}
                      linkSlug={f.celeb.slug}
                    />
                  </Card>
                );
              })}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </Page>
  );
}

export async function getStaticProps() {
  console.log('name', JSON.stringify(arguments as any, null, 2));
  const top100Celebs = await nextApiClient('get-trending-celebs');

  console.log('top100Celebs', top100Celebs);

  const firstBatch = await sanityClient.fetch(
    'latest-page-facts',
    groq`*[_type == 'fact'] | order(date desc)[0..49] {
      'celeb': celeb->{
        name,
        'picture': picture.asset->{
          _id,
          'metadata': {
            'lqip': metadata.lqip,
            'palette': metadata.palette
          }
        },
        'slug': slug.current
      },
      ${factPartialGroq}
    }`,
  );

  return {
    props: {
      top100Celebs,
      firstBatch: firstBatch.map((f: TFact) => ({
        ...f,
        date: formatFactDate(f.date),
      })),
    },
  };
}
