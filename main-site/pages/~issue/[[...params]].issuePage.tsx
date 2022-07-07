import { FactList } from '~/components/FactList';
import { JsonView } from '~/components/JsonView';
import { Page } from '~/components/Page';
import { Tag } from '~/components/Tag';
import { Card } from '~/components/ui/Card';
import {
  catchAllParams,
  IssuePageProps,
} from '~/lib/getStatic/issuePage.getStaticProps';

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
          <h1 className="text-3xl text-neutral-600">{props.issue.name}</h1>

          <div className="flex flex-wrap gap-2.5 pt-3">
            {props.tags.map((t) => (
              <Tag
                key={t.tag._id}
                tagId={t.tag._id}
                link={`/~issue/${props.issue._id}/${catchAllParams.stringify({
                  p: props.p,
                  tags: t.tag._id,
                })}`}
              >
                {t.tag.name}
              </Tag>
            ))}
          </div>
        </div>
      </Card>

      <div className="h-container flex flex-col gap-5 py-5">
        <FactList list={props.facts} />
      </div>

      <JsonView src={props} />
    </Page>
  );
}

export { getStaticPaths } from '~/lib/getStatic/default.getStaticPaths';
export { getStaticProps } from '~/lib/getStatic/issuePage.getStaticProps';
