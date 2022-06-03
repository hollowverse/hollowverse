import React from 'react';
import { CelebImage } from '~/components/CelebImage';
import { Page } from '~/components/Page';
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
      <CelebImage
        className="rounded-md object-cover"
        key={props.celeb.name + '-topSection-image'}
        picture={props.celeb.picture}
        name={props.celeb.name}
      />
    </Page>
  );
}

export { getStaticProps } from '~/lib/getStatic/celebPage.getStaticProps';
export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
