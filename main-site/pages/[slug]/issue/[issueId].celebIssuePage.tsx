import { StickyAppBar } from '~/components/AppBar';
import { CelebViewsSelector } from '~/components/CelebViewsSelector';
import { FacebookComments } from '~/components/FacebookComments';
import { FactGroup } from '~/components/FactGroup';
import { InFeedAd } from '~/components/InFeedAd';
import { Page } from '~/components/Page';
import { RelatedCelebs } from '~/components/RelatedCelebs';
import { InBetweenContentShareButton } from '~/components/ShareButton';
import {
  TopSection,
  TsTitleContainer,
  TsTitleSoftText,
  TsTitleStrongText,
} from '~/components/TopSection';
import { ReturnToCelebViewsButton } from '~/components/ui/ReturnToCelebViewsButton';
import { TitledCard } from '~/components/ui/TitledCard';
import { CelebIssuePageProps } from '~/lib/getStatic/celebIssuePage.getStaticProps';
import { celebNameToIssue } from '~/lib/language/celebNameToIssue';

export default function CelebIssuePage(props: CelebIssuePageProps) {
  return (
    <Page
      title={`What are ${celebNameToIssue(props.celeb.name, props.issue)}?`}
      description={props.pageDescription}
      allowSearchEngines
      pathname={props.celeb.slug}
      id="celeb-page"
      appBar={
        <StickyAppBar>
          <TopSection
            celeb={props.celeb}
            tagTimeline={props.tagTimeline}
            title={
              props.issue.isAffiliation ? (
                <TsTitleContainer>
                  <TsTitleSoftText>
                    What are the <IssueName /> of{' '}
                  </TsTitleSoftText>
                  <TsTitleStrongText>{props.celeb.name}</TsTitleStrongText>
                </TsTitleContainer>
              ) : (
                <TsTitleContainer>
                  <TsTitleSoftText>What are the views of </TsTitleSoftText>
                  <TsTitleStrongText>{props.celeb.name} </TsTitleStrongText>
                  <TsTitleSoftText>
                    on <IssueName />?
                  </TsTitleSoftText>
                </TsTitleContainer>
              )
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
              {celebNameToIssue(props.celeb.name, props.issue)}
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
                Your thoughts on{' '}
                {celebNameToIssue(props.celeb.name, props.issue)}?
              </span>
            ),
            stickyTitle: false,
          }}
        >
          <FacebookComments
            pathname={`/${props.celeb.slug}/issue/${props.issue._id}`}
          />
        </TitledCard>

        <InFeedAd />

        <RelatedCelebs relatedCelebs={props.relatedCelebs} />
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
