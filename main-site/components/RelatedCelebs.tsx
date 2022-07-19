import { isEmpty } from 'lodash-es';
import { CHRList } from '~/components/ui/CHRList';
import { RelatedCelebs as TRelatedCelebs } from '~/lib/getStatic/helpers/getRelatedCelebs';
import { CelebTag } from '~/lib/groq/tag.projection';
import { tagIsVerb } from '~/lib/language/tagIsVerb';

export function renderTags(tags: CelebTag[]) {
  return (
    <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-500 xs:text-base">
      {tags.map((t) => t.tag.name.trim()).join(', ')}
    </p>
  );
}

export function RelatedCelebs(props: { relatedCelebs: TRelatedCelebs }) {
  return (
    <>
      {!isEmpty(props.relatedCelebs.byTag) ? (
        <div id="related-celebs-tag">
          <CHRList
            title={
              <>
                Who Else {tagIsVerb(props.relatedCelebs.tag) ? '' : 'is'}{' '}
                {props.relatedCelebs.tag.tag.name}?
              </>
            }
            celebs={props.relatedCelebs.byTag!}
            renderBody={(c) => renderTags(c.tags)}
            renderLink={(c) =>
              `/${c.slug}/issue/${props.relatedCelebs.tag.tag.issue._id}`
            }
          />
        </div>
      ) : null}

      {!isEmpty(props.relatedCelebs.byIssue) ? (
        <div id="related-celebs-issue">
          <CHRList
            title={
              <>
                Other{' '}
                {props.relatedCelebs.tag.tag.issue.isAffiliation
                  ? ''
                  : 'Views on'}{' '}
                {props.relatedCelebs.tag.tag.issue.name}
              </>
            }
            celebs={props.relatedCelebs.byIssue!}
            renderBody={(c) => renderTags(c.tags)}
            renderLink={(c) =>
              `/${c.slug}/issue/${props.relatedCelebs.tag.tag.issue._id}`
            }
          />
        </div>
      ) : null}
    </>
  );
}
