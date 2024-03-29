import { isEmpty } from 'lodash-es';
import { AppBar } from '~/lib/AppBar';
import { ContributeCta, TweetItAtUs } from '~/lib/disabled/ContributeCta';
import { CelebFacts } from '~/lib/deprecated/CelebFacts';
import { InFeedAd } from '~/lib/InFeedAd';
import { IssueSelector, noIssueFilter } from '~/lib/disabled/IssueSelector';
import { Page } from '~/lib/Page';
import { RelatedCelebsWidget } from '~/lib/disabled/RelatedCelebsWidget';
import { TagCollection } from '~/lib/disabled/TagCollection';
import { Card } from '~/lib/Card.ui';
import {
  Hero,
  HeroCelebImage,
  HeroTitleContainer,
  HeroTitleSoftText,
  HeroTitleStrongText,
  HeroTopContainer,
} from '~/lib/Hero';
import { CelebIssuePageProps } from '~/lib/celebIssuePage.getStaticProps';
import { Issue } from '~/lib/issue.projection';
import { celebNameToIssue } from '~/lib/celebNameToIssue';
import { NavigationTip } from '~/lib/NavigationTip';

export function CelebIssueSelector(props: {
  issue: Issue;
  celeb: { slug: string; name: string };
  issues: Issue[];
}) {
  if (isEmpty(props.issues)) {
    return null;
  }

  return (
    <div className="border-t border-b">
      <IssueSelector
        getAnchorTitle={(i) => celebNameToIssue(props.celeb.name, i)}
        isSelected={(i) => i._id === props.issue._id}
        issues={props.issues}
        getLink={(_id) =>
          _id === noIssueFilter._id
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
      pathname={`/${props.celeb.slug}/issue/${props.issue._id}`}
      id="celeb-issue-page"
      appBar={<AppBar />}
    >
      <Card topBorder={false}>
        <Hero>
          <HeroTopContainer>
            <HeroCelebImage
              slug={props.celeb.slug}
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

          <TagCollection
            slug={props.celeb.slug}
            tagTimeline={props.tagTimeline}
          />
        </Hero>
      </Card>

      <div
        className="h-container my-5 flex flex-col gap-5"
        id={`celeb-issue-page-${props.issue._id}`}
      >
        <NavigationTip celebName={props.celeb.name} issue={props.issue} />

        <CelebFacts
          factGroup={props.facts}
          celeb={props.celeb}
          slug={props.celeb.slug}
          issue={props.issue}
          issues={props.issues}
        />

        <Card>
          <div className="flex flex-col gap-2 px-5 py-5">
            <p className="text-neutral-600">
              Send us a tip about{' '}
              {celebNameToIssue(props.celeb.name, props.issue)}, or other
              issues! You can also <TweetItAtUs />
            </p>
            <ContributeCta name={props.celeb.name} />
          </div>
        </Card>

        {/* <TitledCard
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
        </TitledCard> */}

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

export { getStaticProps } from '~/lib/celebIssuePage.getStaticProps';
export { getStaticPaths } from '~/lib/default.getStaticPaths';
