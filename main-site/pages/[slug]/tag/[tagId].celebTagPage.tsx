import { StickyAppBar } from '~/components/AppBar';
import { FactGroup } from '~/components/FactGroup';
import { useGaEventRecorder } from '~/components/hooks/useGaEventRecorder';
import { InFeedAd } from '~/components/InFeedAd';
import { IssueSelector, noIssueFilter } from '~/components/IssueSelector';
import { Page } from '~/components/Page';
import { RelatedCelebsWidget } from '~/components/RelatedCelebsWidget';
import { InBetweenContentShareButton } from '~/components/ShareButton';
import { TagCollection } from '~/components/TagCollection';
import { TitleSeparator } from '~/components/TitleSeparator';
import {
  Hero,
  HeroCelebImage,
  HeroTitleContainer,
  HeroTitleSoftText,
  HeroTitleStrongText,
  HeroTopContainer,
} from '~/components/ui/Hero';
import { TagPageProps } from '~/lib/getStatic/celebTagPage.getStaticProps';
import { celebNameToIssue } from '~/lib/language/celebNameToIssue';

// export default function TagPage(props: TagPageProps) {
export default function TagPage(props: any) {
  const name = props.celeb.name;

  useGaEventRecorder('issue_view', {
    name: props.tag.tag.issue.name,
    id: props.tag.tag.issue._id,
  });

  return (
    <Page
      id="celeb-tag-page"
      title={`${name} ${props.tag.tag.name}?`}
      description={`${celebNameToIssue(name, props.tag.tag.issue)}, ${
        props.tag.tag.name
      }?`}
      allowSearchEngines
      pathname={`/${props.celeb.slug}/tag/${props.tag.tag._id}`}
      appBar={
        <StickyAppBar>
          <Hero>
            <HeroTopContainer>
              <HeroCelebImage
                name={props.celeb.name}
                picture={props.celeb.picture}
              />
              <HeroTitleContainer>
                <HeroTitleStrongText>{props.celeb.name}</HeroTitleStrongText>
                <HeroTitleSoftText>
                  <span className="text-xl font-semibold">
                    {props.tag.tag.name}?
                  </span>
                </HeroTitleSoftText>
              </HeroTitleContainer>
            </HeroTopContainer>

            <TagCollection
              slug={props.celeb.slug}
              tagTimeline={props.tagTimeline}
            />
          </Hero>
        </StickyAppBar>
      }
    >
      <div
        id={`celeb-tag-page-${props.tag.tag._id}`}
        className="h-container py-5"
      >
        <div className="flex flex-col gap-5" id="content">
          <IssueSelector
            key={props.tag.tag._id}
            getAnchorTitle={(i) => celebNameToIssue(props.celeb.name, i)}
            isSelected={() => false}
            issues={props.issues}
            getLink={(_id) =>
              _id === noIssueFilter._id
                ? `/${props.celeb.slug}`
                : `/${props.celeb.slug}/issue/${_id}`
            }
          />

          <InBetweenContentShareButton />

          <FactGroup
            factGroup={props.tagFacts}
            celebName={props.celeb.name}
            slug={props.celeb.slug}
            title={
              <h2 className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-lg">
                {props.celeb.name} <TitleSeparator /> {props.tag.tag.issue.name}
              </h2>
            }
          />

          <InFeedAd />

          <RelatedCelebsWidget
            slug={props.celeb.slug}
            tagId={props.tag.tag._id}
          />
        </div>
      </div>
    </Page>
  );
}

export { getStaticProps } from '~/lib/getStatic/celebTagPage.getStaticProps';
export { getStaticPaths } from '~/lib/getStatic/default.getStaticPaths';
