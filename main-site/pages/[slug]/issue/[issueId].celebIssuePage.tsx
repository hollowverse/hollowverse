import { StickyAppBar } from '~/components/AppBar';
import { CelebViewsSelector } from '~/components/CelebViewsSelector';
import { FacebookComments } from '~/components/FacebookComments';
import { FactGroup } from '~/components/FactGroup';
import { InFeedAd } from '~/components/InFeedAd';
import { Page } from '~/components/Page';
import {
  RelatedCelebsByTag,
  RelatedCelebsByIssue,
} from '~/components/RelatedCelebs';
import { InBetweenContentShareButton } from '~/components/ShareButton';
import { TopSection } from '~/components/TopSection';
import { ReturnToCelebViewsButton } from '~/components/ui/ReturnToCelebViewsButton';
import { TitledCard } from '~/components/ui/TitledCard';
import { CelebIssuePageProps } from '~/lib/getStatic/celebIssuePage.getStaticProps';

export default function CelebIssuePage(props: CelebIssuePageProps) {
  const name = props.celeb.name;

  return (
    <Page
      title={`${name}'s religion and political views`}
      description={`Did ${name} say or do anything political or about religion? Find out here!`}
      allowSearchEngines
      pathname={props.celeb.slug}
      id="celeb-page"
      appBar={
        <StickyAppBar>
          <TopSection
            celeb={props.celeb}
            tagTimeline={props.tagTimeline}
            title={
              <h1 className="flex flex-col gap-1">
                <span className="text-lg font-normal tracking-wide text-neutral-500">
                  What are the views of
                </span>
                <span
                  id="main-name"
                  className="mt-1 text-4xl font-extrabold tracking-tight text-neutral-600"
                >
                  {props.celeb.name}
                </span>
                <span className="text-lg font-normal tracking-wide text-neutral-500">
                  on{' '}
                  <span className="border-b border-purple-500 px-1 font-semibold">
                    {props.issue.name}
                  </span>
                  ?
                </span>
              </h1>
            }
          />
        </StickyAppBar>
      }
    >
      <div
        className="h-container my-5 flex flex-col gap-5"
        id={`celeb-page-${props.celeb.slug}`}
      >
        <InBetweenContentShareButton />

        <FactGroup
          factGroup={props.celeb.facts}
          celebName={props.celeb.name}
          slug={props.celeb.slug}
          title={
            <h2 className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-lg">
              {props.celeb.name}
            </h2>
          }
        />

        <CelebViewsSelector
          celebName={props.celeb.name}
          slug={props.celeb.slug}
          issues={props.celeb.issues}
        />

        <ReturnToCelebViewsButton
          slug={props.celeb.slug}
          name={props.celeb.name}
        />

        <TitledCard
          titledContentProps={{
            title: (
              <span className="text-base">
                Your thoughts on {props.celeb.name}?
              </span>
            ),
            stickyTitle: false,
          }}
        >
          <FacebookComments
            pathname={`/${props.celeb.slug}/issue/${props.issue._id}`}
          />
        </TitledCard>

        <RelatedCelebsByTag celebs={props.relatedCelebsByTag} tag={props.tag} />

        <InFeedAd />

        <RelatedCelebsByIssue
          celebs={props.relatedCelebsByIssue}
          tag={props.tag}
        />
      </div>
    </Page>
  );
}

export { getStaticProps } from '~/lib/getStatic/celebIssuePage.getStaticProps';
export { getStaticPaths } from '~/lib/getStatic/default.getStaticPaths';
