import { isEmpty } from 'lodash-es';
import { CHRList } from '~/components/ui/CHRList';
import { RelatedCelebs } from '~/lib/getStatic/helpers/getRelatedCelebs';
import { Tag } from '~/lib/groq/tag.projection';
import { tagIsVerb } from '~/lib/language/tagIsVerb';
import { renderTags } from '~/pages/[slug]/tag/[tagId].celebTagPage';

export function OtherCelebsWithTag(props: {
  otherCelebsWithTag: RelatedCelebs['otherCelebsWithTag'];
  tag: Tag;
}) {
  return isEmpty(props.otherCelebsWithTag) ? (
    <div id="related-celebs-tag">
      <CHRList
        title={
          <>
            Who else {tagIsVerb(props.tag) ? '' : 'is'} {props.tag.tag.name}?
          </>
        }
        celebs={props.otherCelebsWithTag!}
        renderBody={(c) => renderTags(c.tags)}
      />
    </div>
  ) : null;
}
