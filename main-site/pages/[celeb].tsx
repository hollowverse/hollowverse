import { isEmpty } from 'lodash-es';
import React from 'react';
import { Container, Logo, Nav, SearchButton } from '~/components/AppBar';
import { Card } from '~/components/Card';
import { ContributeCta } from '~/components/ContributeCta';
import { Facts } from '~/components/Facts';
import { Md } from '~/components/Md';
import { Page } from '~/components/Page';
import { TopSection } from '~/components/TopSection';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

export default function Celeb(props: CelebPageProps) {
  const name = props.celeb.name;

  return (
    <Page
      title={`${name}'s religion and political views`}
      description={`A collection of everything political or religious that ${name} said or did.`}
      allowSearchEngines
      pathname={props.celeb.slug}
      appBar={
        <Card
          stickyTitle
          disablePadding
          disableTitlePadding
          className="border-x-0"
          title={
            <Nav>
              <Logo />
              <SearchButton />
            </Nav>
          }
        >
          <TopSection {...props} />
        </Card>
      }
    >
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