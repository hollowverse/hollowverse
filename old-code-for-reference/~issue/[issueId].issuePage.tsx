import { FactList } from '~/lib/FactList';
import { Page } from '~/lib/Page';
import { Pagination } from '~/lib/Pagination';
import { InBetweenContentShareButton } from '~/lib/ShareButton';
import { Tag } from '~/lib/disabled/Tag';
import { Card } from '~/lib/Card.ui';
import { IssuePageProps } from '~/lib/disabled/issuePage.getStaticProps';
import { Link } from '~/lib/Link';

export default function IssuePage(props: IssuePageProps) {
  return (
    <Page
      allowSearchEngines
      description={
        props.issue.isAffiliation
          ? `A record of all celebrity's ${props.issue.name}`
          : `The opinions of celebrity's on ${props.issue.name}`
      }
      id="issue-page"
      pathname={`/~issue/${props.issue._id}`}
      title={
        props.issue.isAffiliation
          ? `What are the ${props.issue.name} of celebrities?`
          : `What do celebrities think of ${props.issue.name}?`
      }
    >
      <Card topBorder={false}>
        <div className="h-container flex flex-col gap-5 p-5">
          <h1 className="text-3xl text-neutral-600">
            <Link href={`/~issue/${props.issue._id}`} passHref>
              <a
                id="issue-page-title"
                className="border-b-2 border-purple-400 px-1"
              >
                {props.issue.name}
              </a>
            </Link>
          </h1>

          <div id="issue-page-tags" className="flex flex-wrap gap-2.5 pt-3">
            {props.tags.map((t) => {
              return (
                <Tag
                  key={t.tag._id}
                  tagId={t.tag._id}
                  link={`/~issue/${props.issue._id}/p/1/tag/${t.tag._id}`}
                >
                  {t.tag.name}{' '}
                  <span className="text-neutral-500">x{t.count}</span>
                </Tag>
              );
            })}
          </div>
        </div>
      </Card>

      <div className="h-container flex flex-col gap-5 py-5">
        <InBetweenContentShareButton />

        <FactList list={props.facts} />

        <Pagination
          {...props.pagination}
          getLink={(pageNumber) => {
            if (props.tagId) {
              return `/~issue/${props.issue._id}/p/${pageNumber}/tag/${props.tagId}`;
            }

            return pageNumber === 1
              ? `/~issue/${props.issue._id}`
              : `/~issue/${props.issue._id}/p/${pageNumber}`;
          }}
        />
      </div>
    </Page>
  );
}

export { getStaticPaths } from '~/lib/default.getStaticPaths';
export { getStaticProps } from '~/lib/disabled/issuePage.getStaticProps';
