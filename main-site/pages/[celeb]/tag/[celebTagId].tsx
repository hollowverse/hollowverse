import React from 'react';
import { StickyAppBar } from '~/components/AppBar';
import { Card, CardTitle } from '~/components/Card';
import { FactGroup } from '~/components/FactGroup';
import { JsonView } from '~/components/JsonView';
import { Page } from '~/components/Page';
import { TitleSeparator } from '~/components/TitleSeparator';
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
      <div className="h-container py-5">
        <div className="flex flex-col gap-7">
          <div className="h-container mt-5 flex flex-col gap-5">
            <FactGroup
              factGroup={props.tagFacts}
              celebName={props.celeb.name}
              slug={props.celeb.slug}
              title={
                <CardTitle>
                  {props.celeb.name} <TitleSeparator />{' '}
                  {props.tag.tag.issue.name}
                </CardTitle>
              }
            />

            <Card
              title={<CardTitle>Similar Celebrities</CardTitle>}
              stickyTitle
              disablePadding
            >
              <JsonView src={props.otherCelebsWithTag} />
            </Card>

            <Card
              title={
                <CardTitle>
                  Other celebrities <TitleSeparator />{' '}
                  {props.tag.tag.issue.name}
                </CardTitle>
              }
              stickyTitle
              disablePadding
            >
              <JsonView src={props.otherCelebsWithIssue} />
            </Card>
          </div>
        </div>
      </div>
    </Page>
  );
}

export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
export { getStaticProps } from '~/lib/getStatic/tagPage.getStaticProps';
