import React from 'react';
import { Page } from '~/components/Page';

export default function Celeb(props: {}) {
  return (
    <Page
      title={`'s religion and political views`}
      description={'asdf'}
      allowSearchEngines
      pathname={'props.celeb.slug'}
    >
      test
    </Page>
  );
}

export { getStaticProps } from '~/lib/getStatic/celebPage.getStaticProps';
export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
