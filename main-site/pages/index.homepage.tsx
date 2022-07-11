import { ReactNode } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Container, Logo } from '~/components/AppBar';
import { CelebGallery } from '~/components/CelebGallery';
import { FactList } from '~/components/FactList';
import { Page } from '~/components/Page';
import { InBetweenContentShareButton } from '~/components/ShareButton';
import { PurpleDot } from '~/components/ui/PurpleDot';
import { HomepageProps } from '~/lib/getStatic/homepage.getStaticProps';
import { Link } from '~/lib/Link';

export default function Index(props: HomepageProps) {
  return (
    <Page
      title="The political views and religious beliefs of celebrities"
      description="Learn the political views and religious beliefs of any celebrity"
      pathname=""
      allowSearchEngines
      className="text-neutral-600"
      id="homepage"
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
          {renderSearchField()}

          {renderTrendingCelebs()}

          {renderTrendingIssues()}

          <InBetweenContentShareButton buttonText="Share Hollowverse" />

          {renderLatestFacts()}
        </div>
      </div>
    </Page>
  );

  function renderSearchField() {
    return (
      <div className="px-5">
        <Link
          href={{
            pathname: '/~search',
            query: { local: true },
          }}
          passHref
        >
          <a
            id="homepage-search"
            className="textbox-border flex h-16 w-full items-center justify-center gap-2 bg-gray-50 text-lg text-gray-400 shadow-inner hover:bg-white hover:text-gray-400"
          >
            Search for a celebrity <FaSearch aria-hidden className="text-xl" />
          </a>
        </Link>
      </div>
    );
  }

  function renderTrendingCelebs() {
    return (
      <div className="flex flex-col gap-2.5">
        <h2 className="scale-y-110 px-5 text-xl font-semibold">
          Trending Celebrities
        </h2>

        {renderSideScroller(
          <CelebGallery
            prefetch={false}
            celebGalleryItems={props.trendingCelebs}
            className="flex flex-row flex-nowrap justify-start gap-[1px]"
          />,
        )}
      </div>
    );
  }

  function renderTrendingIssues() {
    return (
      <div className="flex flex-col gap-2.5">
        <h2 className="scale-y-110 px-5 text-xl font-semibold">
          Trending Issues
        </h2>

        {renderSideScroller(
          props.trendingIssues.map((i) => {
            return (
              <Link key={i._id} passHref href={`/~issue/${i._id}`}>
                <a>
                  <div
                    id="trending-issue-item"
                    className="mb-2 min-w-[200px] rounded-sm border bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-center gap-3 text-base text-neutral-700">
                      <PurpleDot />
                      <p className="w-max text-lg text-neutral-600">{i.name}</p>
                    </div>
                  </div>
                </a>
              </Link>
            );
          }),
        )}
      </div>
    );
  }

  function renderSideScroller(node: ReactNode) {
    return (
      <div className="relative">
        <div className="no-scrollbar flex flex-row gap-1 overflow-auto pl-7">
          {node}
          <div className="FILLER min-w-[50px] flex-grow" />
        </div>
        <div className="LEFT-FADE absolute top-0 left-0 bottom-0 z-10 w-7 bg-gradient-to-r from-gray-100 via-transparent to-transparent" />
        <div className="RIGHT-FADE absolute top-0 right-0 bottom-0 z-10 w-7 bg-gradient-to-l from-gray-100 via-transparent to-transparent" />
      </div>
    );
  }

  function renderLatestFacts() {
    return (
      <div className="flex flex-col gap-2.5">
        <h2 className="scale-y-110 px-5 text-xl font-semibold">The Latest</h2>

        <FactList list={props.latestFacts} />
      </div>
    );
  }
}

export { getStaticProps } from '~/lib/getStatic/homepage.getStaticProps';
