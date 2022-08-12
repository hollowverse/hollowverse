import { isEmpty } from 'lodash-es';
import { useHvApi } from '~/lib/u/useHvApi';
import { CHRList } from '~/lib/c/CHRList';
import { CelebTag } from '~/lib/t/tag.projection';
import { tagIsVerb } from '~/lib/t/tagIsVerb';
import {
  RelatedCelebs,
  RelatedCelebsQueryParams,
} from '~/pages/api/related-celebs';

export function renderTags(tags: CelebTag[]) {
  return (
    <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-gray-500 xs:text-base">
      {tags.map((t) => t.tag.name.trim()).join(', ')}
    </p>
  );
}

export function RelatedCelebsWidget(props: RelatedCelebsQueryParams) {
  const { data: relatedCelebs } = useHvApi<RelatedCelebs>(
    'related-celebs?' +
      new URLSearchParams({ tagId: props.tagId, slug: props.slug }),
  );

  if (!relatedCelebs) {
    return null;
  }

  return (
    <>
      {!isEmpty(relatedCelebs.byTag) ? (
        <div id="related-celebs-tag">
          <CHRList
            title={
              <>
                Who Else {tagIsVerb(relatedCelebs.tag) ? '' : 'is'}{' '}
                {relatedCelebs.tag.name}?
              </>
            }
            celebs={relatedCelebs.byTag!}
            renderBody={(c) => renderTags(c.tags)}
            renderLink={(c) =>
              `/${c.slug}/issue/${relatedCelebs.tag.issue._id}`
            }
          />
        </div>
      ) : null}

      {!isEmpty(relatedCelebs.byIssue) ? (
        <div id="related-celebs-issue">
          <CHRList
            title={
              <>
                Other {relatedCelebs.tag.issue.isAffiliation ? '' : 'Views on'}{' '}
                {relatedCelebs.tag.issue.name}
              </>
            }
            celebs={relatedCelebs.byIssue!}
            renderBody={(c) => renderTags(c.tags)}
            renderLink={(c) =>
              `/${c.slug}/issue/${relatedCelebs.tag.issue._id}`
            }
          />
        </div>
      ) : null}
    </>
  );
}
