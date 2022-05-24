import { isEmpty } from 'lodash-es';
import React from 'react';
import { Facts } from '~/components/Facts';
import { ContributeCta } from '~/components/ContributeCta';
import { Md } from '~/components/Md';
import { TopSection } from '~/components/TopSection';
import { getHeadDescription, useCeleb } from '~/lib/celebPageHelpers';
import { Page } from '~/components/Page';
import { CelebPageProps } from '~/pages/[celeb]/getStaticProps';

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

      <div className="mx-auto max-w-3xl">
        {!isEmpty(props.celeb.facts.groups) && (
          <div className="mb-5">
            <Facts {...props} />
          </div>
        )}

        {props.celeb.oldContent && <Md {...props} />}

        <ContributeCta name={props.celeb.name} />
      </div>
    </Page>
  );
}

export { getStaticPaths } from '~/pages/[celeb]/getStaticPaths';
export { getStaticProps } from '~/pages/[celeb]/getStaticProps';
