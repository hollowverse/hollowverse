import React from 'react';
import { StickyAppBar } from '~/components/AppBar';
import { Page } from '~/components/Page';
import { TopSection } from '~/components/TopSection';

export default function TagPage(props: any) {
  const name = props.celeb.name;

  return (
    <Page
      title={`${name}'s religion and political views`}
      description={`A collection of everything political or religious that ${name} said or did.`}
      allowSearchEngines
      pathname={props.celeb.slug}
      appBar={
        <StickyAppBar>
          <TopSection {...props} />
        </StickyAppBar>
      }
    >
      <div className="h-container mt-5 flex flex-col gap-5">
        <pre>{JSON.stringify(props.tagFacts, null, 2)}</pre>
      </div>

      <div className="h-container mt-5 flex flex-col gap-5">
        <pre>
          {JSON.stringify(
            props.otherCelebsWithTag.map((f, i) => ({ ...f, i })),
            null,
            2,
          )}
        </pre>
      </div>
    </Page>
  );
}

export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
export { getStaticProps } from '~/lib/getStatic/tagPage.getStaticProps';
