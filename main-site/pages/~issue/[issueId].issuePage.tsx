import { FactList } from '~/components/FactList';
import { JsonView } from '~/components/JsonView';
import { Page } from '~/components/Page';
import { Pagination } from '~/components/Pagination';
import { Tag } from '~/components/Tag';
import { Card } from '~/components/ui/Card';
import { IssuePageProps } from '~/lib/getStatic/issuePage.getStaticProps';
import { Link } from '~/lib/Link';

export default function IssuePage(props: IssuePageProps) {
  return (
    <Page
      allowSearchEngines
      description={`List of views and opinions on ${props.issue.name} by celebrities`}
      id="issue-page"
      pathname={`~issue/${props.issue._id}`}
      title={`What do celebrities think of ${props.issue.name}?`}
    >
      <Card topBorder={false}>
        <div className="h-container p-5">
          <h1 className="text-3xl text-neutral-600">
            <Link href={`/~issue/${props.issue._id}`} passHref>
              <a className="border-b-2 border-purple-200 px-1">
                {props.issue.name}
              </a>
            </Link>
          </h1>

          <div className="flex flex-wrap gap-2.5 pt-3">
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
        <FactList list={props.facts} />
      </div>

      <Pagination />
    </Page>
  );
}

export { getStaticPaths } from '~/lib/getStatic/default.getStaticPaths';
export { getStaticProps } from '~/lib/getStatic/issuePage.getStaticProps';
