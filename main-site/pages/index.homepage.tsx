import { FaSearch } from 'react-icons/fa';
import { Logo } from '~/lib/AppBar';
import { c } from '~/lib/c';
import { Card } from '~/lib/Card.ui';
import { CelebGallery } from '~/lib/CelebGallery';
import { HomepageProps } from '~/lib/homepage.getStaticProps';
import { Link } from '~/lib/Link';
import { LovelyTopBorder } from '~/lib/LovelyTopBorder';
import { Page } from '~/lib/Page';

export default function Index(props: HomepageProps) {
  return (
    <Page
      title="The political views and religious beliefs of public figures"
      description="Learn the political views and religious beliefs of public figures"
      pathname={props.pagePath}
      allowSearchEngines
      className="text-neutral-600"
      id="homepage"
      appBar={
        <Card topBorder={false} className="font-normal">
          <LovelyTopBorder />

          <nav
            role="navigation"
            aria-label="Main Navigation"
            className={c(
              'NAV h-container flex flex-col items-center justify-between py-3 px-5 default:flex-row default:gap-2',
            )}
          >
            <Logo className="justify-center text-3xl" />

            <h1 className="text-center text-xl italic text-neutral-500">
              The Political Views
              <br />
              and Religions of Public Figures
            </h1>
          </nav>
        </Card>
      }
    >
      <div className="h-container py-5">
        <div className="flex flex-col gap-7">
          <SearchField />

          <TrendingCelebs />

          {/* <ForumCta message={props.forumCta} /> */}

          {/* <TrendingIssues /> */}

          {/* <LatestFacts /> */}

          {/* <Pagination
            {...props.pagination}
            getLink={(pageNumber) =>
              pageNumber === 1 ? '/' : `/~p/${pageNumber}`
            }
          /> */}
        </div>
      </div>
    </Page>
  );

  function SearchField() {
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

  function TrendingCelebs() {
    return (
      <div className="flex flex-col gap-2.5">
        <h2 className="scale-y-110 px-5 text-xl font-semibold">
          Trending Celebrities
        </h2>

        <div className="flex justify-center">
          <CelebGallery
            prefetch={false}
            celebGalleryItems={props.trendingCelebs}
            className="flex flex-row gap-[1px]"
          />
        </div>
        {/* <SideScroller>
        </SideScroller> */}
      </div>
    );
  }

  // function TrendingIssues() {
  //   return (
  //     <div className="flex flex-col gap-2.5">
  //       <h2 className="scale-y-110 px-5 text-xl font-semibold">Issues</h2>

  //       <div className="border-y">
  //         <IssueSelector
  //           isSelected={(i) => i._id === noIssueFilter._id}
  //           issues={props.trendingIssues}
  //           getLink={(_id) =>
  //             _id === noIssueFilter._id ? '/' : `/~issue/${_id}`
  //           }
  //         />
  //       </div>
  //     </div>
  //   );
  // }

  // function LatestFacts() {
  //   return (
  //     <div className="flex flex-col gap-2.5">
  //       <h2 className="scale-y-110 px-5 text-xl font-semibold">
  //         Recently added
  //       </h2>

  //       <FactList list={props.latestFacts} />
  //     </div>
  //   );
  // }
}

export { getStaticProps } from '~/lib/homepage.getStaticProps';
