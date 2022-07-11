import { isEmpty } from 'lodash-es';
import { TitleSeparator } from '~/components/TitleSeparator';
import { CHRList } from '~/components/ui/CHRList';
import { RelatedCelebs } from '~/lib/getStatic/helpers/getRelatedCelebs';
import { Tag } from '~/lib/groq/tag.projection';
import { renderTags } from '~/pages/[slug]/tag/[tagId].celebTagPage';

export function OtherCelebsWithIssue(props: {
  otherCelebsWithIssue: RelatedCelebs['otherCelebsWithIssue'];
  tag: Tag;
}) {
  return isEmpty(props.otherCelebsWithIssue) ? (
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
  ) : null;
}
