import { StickyAppBar } from '~/components/AppBar';
import { FactGroup } from '~/components/FactGroup';
import { useGaEventRecorder } from '~/components/hooks/useGaEventRecorder';
import { InFeedAd } from '~/components/InFeedAd';
import { Page } from '~/components/Page';
import { InBetweenContentShareButton } from '~/components/ShareButton';
import { TitleSeparator } from '~/components/TitleSeparator';
import {
  TopSection,
  TsTitleContainer,
  TsTitleSoftText,
  TsTitleStrongText,
} from '~/components/TopSection';
import { ReturnToCelebViewsButton } from '~/components/ui/ReturnToCelebViewsButton';
import { TagPageProps } from '~/lib/getStatic/celebTagPage.getStaticProps';
import { CelebViewsSelector } from '~/components/CelebViewsSelector';
import { celebNameToIssue } from '~/lib/language/celebNameToIssue';
import { RelatedCelebsWidget } from '~/components/RelatedCelebsWidget';

export default function TagPage(props: TagPageProps) {
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
          <TopSection
            celeb={props.celeb}
            tagTimeline={props.tagTimeline}
            title={
              <TsTitleContainer>
                <TsTitleStrongText>{name}</TsTitleStrongText>
                <TsTitleSoftText>{props.tag.tag.name}?</TsTitleSoftText>
              </TsTitleContainer>
            }
          />
        </StickyAppBar>
      }
    >
      <div
        id={`celeb-tag-page-${props.tag.tag._id}`}
        className="h-container py-5"
      >
        <div className="flex flex-col gap-5" id="content">
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

          <CelebViewsSelector
            issues={props.issues}
            celebName={props.celeb.name}
            slug={props.celeb.slug}
          />

          <ReturnToCelebViewsButton
            slug={props.celeb.slug}
            name={props.celeb.name}
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
