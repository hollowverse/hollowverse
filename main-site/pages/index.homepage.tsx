import { ReactNode } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Container, Logo } from '~/components/AppBar';
import { CelebGallery } from '~/components/CelebGallery';
import { FactList } from '~/components/FactList';
import { IssueSelector, noIssueFilter } from '~/components/IssueSelector';
import { Page } from '~/components/Page';
import { PurpleDot } from '~/components/ui/PurpleDot';
import { SideScroller } from '~/components/ui/SideScroller';
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

        <SideScroller>
          <CelebGallery
            prefetch={false}
            celebGalleryItems={props.trendingCelebs}
            className="flex flex-row flex-nowrap justify-start gap-[1px]"
          />
        </SideScroller>
      </div>
    );
  }

  function renderTrendingIssues() {
    return (
      <div className="flex flex-col gap-2.5">
        <h2 className="scale-y-110 px-5 text-xl font-semibold">Issues</h2>

        <IssueSelector
          isSelected={(i) => i._id == noIssueFilter._id}
          issues={props.trendingIssues}
          getLink={(_id) => `/~issue/${_id}`}
        />
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
