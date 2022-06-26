import groq from 'groq';
import { GetStaticPropsResult } from 'next';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Logo } from '~/components/AppBar';
import { CelebGallery } from '~/components/CelebGallery';
import { CelebImage } from '~/components/CelebImage';
import { Fact } from '~/components/Fact';
import { Page } from '~/components/Page';
import { Spinner } from '~/components/Spinner';
import { TitledCard } from '~/components/ui/TitledCard';
import { getTrendingCelebs, TrendingCelebs } from '~/lib/getTrendingCelebs';
import { Fact as TFact, factProjection } from '~/lib/groq/fact.projection';
import { Picture } from '~/lib/groq/picture.projection';
import { Link } from '~/lib/Link';
import { log } from '~/shared/lib/log';
import { sanityClient } from '~/shared/lib/sanityio';

type HomepageProps = {
  trendingCelebs: TrendingCelebs;
  latestFacts: any;
};

export default function Index(props: HomepageProps) {
  const [facts, setFacts] = useState<TFact[]>(props.latestFacts.slice(0, 10));
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
                  celebGalleryItems={props.trendingCelebs}
                  className="flex flex-row flex-nowrap justify-start gap-[1px]"
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
                if (facts.length >= props.latestFacts.length) {
                  setMore(false);
                }

                setTimeout(() => {
                  setFacts(props.latestFacts.slice(0, facts.length + 10));
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
                const cardTitle = (
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
                            {f.issues[0].name}
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                );

                return (
                  <TitledCard
                    titledContentProps={{
                      title: cardTitle,
                    }}
                    key={f._id}
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
                );
              })}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </Page>
  );
}

export async function getStaticProps(): Promise<
  GetStaticPropsResult<HomepageProps>
> {
  log('info', 'homepage getStaticProps called');

  const trendingCelebs = await getTrendingCelebs();

  const latestFacts = await sanityClient.fetch<
    (TFact & { celeb: { name: string; Picture: Picture; slug: string } })[]
  >(
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
      ${factProjection}
    }`,
  );

  return {
    props: {
      trendingCelebs,
      latestFacts: latestFacts,
    },
    revalidate: 60 * 60 * 24, // revalidate every 24 hours
  };
}
