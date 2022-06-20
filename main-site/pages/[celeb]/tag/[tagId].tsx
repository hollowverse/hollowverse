import React from 'react';
import { StickyAppBar } from '~/components/AppBar';
import { Page } from '~/components/Page';
import { TopSection } from '~/components/TopSection';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

export default function TagPage(props: CelebPageProps) {
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
      <div className="h-container mt-5 flex flex-col gap-5">TAG PAGE</div>
    </Page>
  );
}

export { getStaticProps } from '~/lib/getStatic/celebPage.getStaticProps';
export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
