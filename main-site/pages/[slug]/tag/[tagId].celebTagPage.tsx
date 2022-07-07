import { isEmpty } from 'lodash-es';
import { StickyAppBar } from '~/components/AppBar';
import { FactGroup } from '~/components/FactGroup';
import { useGaEventRecorder } from '~/components/hooks/useGaEventRecorder';
import { InFeedAd } from '~/components/InFeedAd';
import { Page } from '~/components/Page';
import { Tag } from '~/components/Tag';
import { TitleSeparator } from '~/components/TitleSeparator';
import { TopSection } from '~/components/TopSection';
import { CHRList } from '~/components/ui/CHRList';
import { ReturnToCelebViewsButton } from '~/components/ui/ReturnToCelebViewsButton';
import { TagPageProps } from '~/lib/getStatic/celebTagPage.getStaticProps';
import { Tag as TTag } from '~/lib/groq/tag.projection';

export function renderTags(tags: TTag[]) {
  return (
    <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-500 xs:text-base">
      {tags.map((t) => t.tag.name.trim()).join(', ')}
    </p>
  );
}

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

          {!isEmpty(props.otherCelebsWithTag) && (
            <div id="related-celebs-tag">
              <CHRList
                title={
                  <>
                    Others <TitleSeparator />{' '}
                    <Tag
                      link={`/${props.celeb.slug}/tag/${props.tag.tag._id}#content`}
                      tagId={props.tag.tag._id}
                    >
                      {props.tag.tag.name}
                    </Tag>
                  </>
                }
                celebs={props.otherCelebsWithTag!}
                renderBody={(c) => renderTags(c.tags)}
              />
            </div>
          )}

          <InFeedAd />

          {!isEmpty(props.otherCelebsWithIssue) && (
            <div id="related-celebs-issue">
              <CHRList
                title={
                  <>
                    Others <TitleSeparator /> {props.tag.tag.issue.name}
                  </>
                }
                celebs={props.otherCelebsWithIssue!}
                renderBody={(c) => renderTags(c.tags)}
              />
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}

export { getStaticPaths } from '~/lib/getStatic/default.getStaticPaths';
export { getStaticProps } from '~/lib/getStatic/celebTagPage.getStaticProps';
