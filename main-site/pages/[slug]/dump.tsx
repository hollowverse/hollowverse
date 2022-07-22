import groq from 'groq';
import { JsonView } from '~/components/JsonView';
import { Page } from '~/components/Page';
import { oneMinute } from '~/lib/date';
import { factProjection } from '~/lib/groq/fact.projection';
import { sanityClient } from '~/shared/lib/sanityio';

export default function DumpPage(props: any) {
  return (
    <Page
      allowSearchEngines={false}
      description="Dump"
      id="dump-page"
      pathname={`/${props.slug}/dump`}
      title="Dump"
      appBar={<div />}
    >
      <JsonView src={props.facts} collapsed={100} />
    </Page>
  );
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const facts = await sanityClient.fetch(
    'dump',
    groq`
    *[_type == 'fact' && celeb->slug.current == $slug]{${factProjection}}
  `,
    { slug: params.slug },
  );

  return {
    props: {
      facts,
    },

    revalidate: oneMinute,
  };
}

export { getStaticPaths } from '~/lib/getStatic/default.getStaticPaths';
