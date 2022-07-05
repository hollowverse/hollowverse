import { JsonView } from '~/components/JsonView';

export default function IssuePage(props: any) {
  return (
    <div>
      <JsonView src={props.facts} />
    </div>
  );
}

export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
export { getStaticProps } from '~/lib/getStatic/issuePage.getStaticProps';
