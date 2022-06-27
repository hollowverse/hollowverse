import { isEmpty } from 'lodash-es';
import React from 'react';
import { StickyAppBar } from '~/components/AppBar';
import { FactGroup } from '~/components/FactGroup';
import { Page } from '~/components/Page';
import { Tag } from '~/components/Tag';
import { TitleSeparator } from '~/components/TitleSeparator';
import { TopSection } from '~/components/TopSection';
import { CHRList } from '~/components/ui/CHRList';
import { ReturnToCelebViewsButton } from '~/components/ui/ReturnToCelebViewsButton';
import { c } from '~/lib/c';
import { TagPageProps } from '~/lib/getStatic/tagPage.getStaticProps';
import { Tag as TTag } from '~/lib/groq/tag.projection';
import { ReactElementProps } from '~/lib/types';

export function CardTitle(
  props: ReactElementProps<'div'> & { component?: React.ElementType },
) {
  const Root = 'h2' || props.component;

  return (
    <Root
      {...props}
      className={c(
        'flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-lg',
        props.className,
      )}
    />
  );
}

export function renderTags(tags: TTag[]) {
  return (
    <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
      {tags.map((t) => t.tag.name.trim()).join(', ')}
    </span>
  );
}

export default function TagPage(props: TagPageProps) {
  const name = props.celeb.name;

  return (
    <Page
      id="celeb-tag-page"
      title={`${name} - ${props.tag.tag.name}`}
      description={`${name}'s views on ${props.tag.tag.issue.name}`}
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
              <CardTitle>
                {props.celeb.name} <TitleSeparator /> {props.tag.tag.issue.name}
              </CardTitle>
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
                    <Tag slug={props.celeb.slug} tagId={props.tag.tag._id}>
                      {props.tag.tag.name}
                    </Tag>
                  </>
                }
                celebs={props.otherCelebsWithTag!}
                renderBody={(c) => renderTags(c.tags)}
              />
            </div>
          )}

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

export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
export { getStaticProps } from '~/lib/getStatic/tagPage.getStaticProps';
