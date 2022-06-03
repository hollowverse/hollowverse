import { isEmpty } from 'lodash-es';
import React from 'react';
import { ContributeCta } from '~/components/ContributeCta';
import { Facts } from '~/components/Facts';
import { Md } from '~/components/Md';
import { Page } from '~/components/Page';
import { TopSection } from '~/components/TopSection';
import { getHeadDescription, useCeleb } from '~/lib/celebPageHelpers';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

export default function Celeb(props: CelebPageProps) {
  useCeleb(props.celeb.name, props.celeb.facts.groups);

  return (
    <Page
      title={`${props.celeb.name}'s religion and political views`}
      description={getHeadDescription(
        props.celeb.name,
        props.celeb.tags,
        props.celeb.oldContent,
      )}
      allowSearchEngines
      pathname={props.celeb.slug}
    >
      <TopSection {...props} />
    </Page>
  );
}

export { getStaticProps } from '~/lib/getStatic/celebPage.getStaticProps';
export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
