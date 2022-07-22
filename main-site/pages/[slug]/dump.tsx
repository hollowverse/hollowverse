import groq from 'groq';
import { JsonView } from '~/components/JsonView';
import { Page } from '~/components/Page';
import { oneMinute } from '~/lib/date';
import { Fact as TFact, factProjection } from '~/lib/groq/fact.projection';
import { sanityClient } from '~/shared/lib/sanityio';
import { PageProps } from '~/shared/lib/types';

type DumpPageProps = PageProps<typeof getStaticProps>;

export default function DumpPage(props: DumpPageProps) {
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
  const facts = await sanityClient.fetch<TFact[]>(
    'dump',
    groq`
    *[_type == 'fact' && celeb->slug.current == $slug]{${factProjection}}
  `,
    { slug: params.slug },
  );

  return {
    props: {
      slug: params.slug,
      facts,
    },

    revalidate: oneMinute,
  };
}

export { getStaticPaths } from '~/lib/getStatic/default.getStaticPaths';
