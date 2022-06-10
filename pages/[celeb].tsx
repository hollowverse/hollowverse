import { isEmpty } from 'lodash-es';
import React from 'react';
import { ContributeCta } from '~/components/ContributeCta';
import { Facts } from '~/components/Facts';
import { Md } from '~/components/Md';
import { Page } from '~/components/Page';
import { TopSection } from '~/components/TopSection';
import { getHeadDescription } from '~/lib/celebPageHelpers';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

export default function Celeb(props: CelebPageProps) {
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

      <div className="h-container mt-5 flex flex-col gap-5">
        {!isEmpty(props.celeb.facts.groups) && <Facts {...props} />}

        {props.celeb.oldContent && <Md {...props} />}

        <ContributeCta name={props.celeb.name} />
      </div>
    </Page>
  );
}

export { getStaticProps } from '~/lib/getStatic/celebPage.getStaticProps';
export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
