import { StickyAppBar } from '~/components/AppBar';
import { FacebookComments } from '~/components/FacebookComments';
import { FactGroup } from '~/components/FactGroup';
import { InFeedAd } from '~/components/InFeedAd';
import { IssueSelector, noIssueFilter } from '~/components/IssueSelector';
import { Page } from '~/components/Page';
import { RelatedCelebsWidget } from '~/components/RelatedCelebsWidget';
import { InBetweenContentShareButton } from '~/components/ShareButton';
import { TagCollection } from '~/components/TagCollection';
import {
  Hero,
  HeroCelebImage,
  HeroTitleContainer,
  HeroTitleSoftText,
  HeroTitleStrongText,
  HeroTopContainer,
} from '~/components/ui/Hero';
import { TitledCard } from '~/components/ui/TitledCard';
import { CelebIssuePageProps } from '~/lib/getStatic/celebIssuePage.getStaticProps';
import { Issue } from '~/lib/groq/issue.projection';
import { celebNameToIssue } from '~/lib/language/celebNameToIssue';

export function CelebIssueSelector(props: {
  issue: Issue;
  celeb: { slug: string; name: string; issues: Issue[] };
}) {
  return (
    <div className="border-t border-b">
      <IssueSelector
        getAnchorTitle={(i) => celebNameToIssue(props.celeb.name, i)}
        isSelected={(i) => i._id == props.issue._id}
        issues={props.celeb.issues}
        getLink={(_id) =>
          _id == noIssueFilter._id
            ? `/${props.celeb.slug}`
            : `/${props.celeb.slug}/issue/${_id}`
        }
      />
    </div>
  );
}

export default function CelebIssuePage(props: CelebIssuePageProps) {
  return (
    <Page
      title={props.pageTitle}
      description={props.pageDescription}
      allowSearchEngines
      pathname={props.celeb.slug}
      id="celeb-issue-page"
      appBar={
        <StickyAppBar>
          <Hero>
            <HeroTopContainer>
              <HeroCelebImage
                name={props.celeb.name}
                picture={props.celeb.picture}
              />
              {props.issue.isAffiliation ? (
                <HeroTitleContainer>
                  <HeroTitleSoftText>
                    What are the <IssueName /> of{' '}
                  </HeroTitleSoftText>
                  <HeroTitleStrongText>{props.celeb.name}</HeroTitleStrongText>
                </HeroTitleContainer>
              ) : (
                <HeroTitleContainer>
                  <HeroTitleSoftText>What are the views of </HeroTitleSoftText>
                  <HeroTitleStrongText>{props.celeb.name} </HeroTitleStrongText>
                  <HeroTitleSoftText>
                    on <IssueName />?
                  </HeroTitleSoftText>
                </HeroTitleContainer>
              )}{' '}
            </HeroTopContainer>

            <CelebIssueSelector {...props} />

            <TagCollection
              slug={props.celeb.slug}
              tagTimeline={props.tagTimeline}
            />
          </Hero>
        </StickyAppBar>
      }
    >
      <div
        className="h-container my-5 flex flex-col gap-5"
        id={`celeb-issue-page-${props.issue._id}`}
      >
        <InBetweenContentShareButton />

        <FactGroup
          factGroup={props.celeb.facts}
          celebName={props.celeb.name}
          slug={props.celeb.slug}
          title={
            <h2 className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-lg">
              {celebNameToIssue(props.celeb.name, props.issue)}
            </h2>
          }
        />

        <CelebIssueSelector {...props} />

        <TitledCard
          titledContentProps={{
            title: (
              <span className="text-base">
                Your thoughts on {props.celeb.name}&apos;s {props.issue.name}
                {props.issue.isAffiliation ? '' : ' views'}?
              </span>
            ),
            stickyTitle: false,
          }}
        >
          <div className="my-1 mx-3">
            <FacebookComments
              pathname={`/${props.celeb.slug}/issue/${props.issue._id}`}
            />
          </div>
        </TitledCard>

        <InFeedAd />

        <RelatedCelebsWidget
          slug={props.celeb.slug}
          tagId={props.tag.tag._id}
        />
      </div>
    </Page>
  );

  function IssueName() {
    return (
      <span className="h-issue-highlight px-1 font-semibold">
        {props.issue.name}
      </span>
    );
  }
}

export { getStaticProps } from '~/lib/getStatic/celebIssuePage.getStaticProps';
export { getStaticPaths } from '~/lib/getStatic/default.getStaticPaths';
