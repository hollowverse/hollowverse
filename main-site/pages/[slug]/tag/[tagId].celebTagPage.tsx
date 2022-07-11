import { StickyAppBar } from '~/components/AppBar';
import { FactGroup } from '~/components/FactGroup';
import { useGaEventRecorder } from '~/components/hooks/useGaEventRecorder';
import { InFeedAd } from '~/components/InFeedAd';
import {
  RelatedCelebsByIssue,
  RelatedCelebsByTag,
} from '~/components/RelatedCelebs';
import { Page } from '~/components/Page';
import { InBetweenContentShareButton } from '~/components/ShareButton';
import { TitleSeparator } from '~/components/TitleSeparator';
import { TopSection } from '~/components/TopSection';
import { ReturnToCelebViewsButton } from '~/components/ui/ReturnToCelebViewsButton';
import { TagPageProps } from '~/lib/getStatic/celebTagPage.getStaticProps';

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
      description={`${name} ${props.tag.tag.name} when it comes to ${props.tag.tag.issue.name}?`}
      allowSearchEngines
      pathname={`/${props.celeb.slug}/tag/${props.tag.tag._id}`}
      appBar={
        <StickyAppBar>
          <TopSection {...props.celeb} />
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

          <ReturnToCelebViewsButton
            slug={props.celeb.slug}
            name={props.celeb.name}
          />

          <RelatedCelebsByTag
            celebs={props.otherCelebsWithTag}
            tag={props.tag}
          />

          <InFeedAd />

          <RelatedCelebsByIssue
            celebs={props.otherCelebsWithIssue}
            tag={props.tag}
          />
        </div>
      </div>
    </Page>
  );
}

export { getStaticProps } from '~/lib/getStatic/celebTagPage.getStaticProps';
export { getStaticPaths } from '~/lib/getStatic/default.getStaticPaths';
