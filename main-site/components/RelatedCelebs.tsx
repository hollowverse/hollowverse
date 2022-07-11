import { isEmpty } from 'lodash-es';
import { CHRList } from '~/components/ui/CHRList';
import { RelatedCelebs } from '~/lib/getStatic/helpers/getRelatedCelebs';
import { Tag } from '~/lib/groq/tag.projection';
import { tagIsVerb } from '~/lib/language/tagIsVerb';

export function renderTags(tags: Tag[]) {
  return (
    <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-500 xs:text-base">
      {tags.map((t) => t.tag.name.trim()).join(', ')}
    </p>
  );
}

export function RelatedCelebsByTag(props: {
  celebs: RelatedCelebs['relatedCelebsByTag'];
  tag: Tag;
}) {
  return !isEmpty(props.celebs) ? (
    <div id="related-celebs-tag">
      <CHRList
        title={
          <>
            Who else {tagIsVerb(props.tag) ? '' : 'is'} {props.tag.tag.name}?
          </>
        }
        celebs={props.celebs!}
        renderBody={(c) => renderTags(c.tags)}
      />
    </div>
  ) : null;
}

export function RelatedCelebsByIssue(props: {
  celebs: RelatedCelebs['relatedCelebsByIssue'];
  tag: Tag;
}) {
  return !isEmpty(props.celebs) ? (
    <div id="related-celebs-issue">
      <CHRList
        title={
          <>
            Other {props.tag.tag.issue.isPersonal ? '' : 'views on'}{' '}
            {props.tag.tag.issue.name}
          </>
        }
        celebs={props.celebs!}
        renderBody={(c) => renderTags(c.tags)}
      />
    </div>
  ) : null;
}
