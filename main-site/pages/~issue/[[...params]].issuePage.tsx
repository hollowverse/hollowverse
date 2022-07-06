import { FactList } from '~/components/FactList';
import { JsonView } from '~/components/JsonView';
import { Page } from '~/components/Page';
import { Card } from '~/components/ui/Card';

export default function IssuePage(props: any) {
  return (
    <Page
      allowSearchEngines
      description={`List of views and opinions on ${props.issue.name} by celebrities`}
      id="issue-page"
      pathname={`~issue/${props.issue._id}`}
      title={`Views and opinions on ${props.issue.name} by celebrities`}
    >
      <Card topBorder={false} className="p-5">
        <h1 className="text-3xl text-neutral-600">{props.issue.name}</h1>
      </Card>

      <JsonView src={props} />

      <div className="flex flex-col gap-5 py-5">
        <FactList list={props.facts} />
      </div>
    </Page>
  );
}

export { getStaticPaths } from '~/lib/getStatic/default.getStaticPaths';
export { getStaticProps } from '~/lib/getStatic/issuePage.getStaticProps';
