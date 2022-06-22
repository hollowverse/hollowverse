import React from 'react';
import { StickyAppBar } from '~/components/AppBar';
import { FactGroup } from '~/components/FactGroup';
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
                <h2 className="flex flex-wrap gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-base">
                  {props.celeb.name} <TitleSeparator />{' '}
                  {props.tag.tag.issue.name} <TitleSeparator />{' '}
                  {props.tag.tag.name}
                </h2>
              }
            />
            {/* <pre>{JSON.stringify(props.tagFacts, null, 2)}</pre> */}
          </div>

          {/* <div className="h-container mt-5 flex flex-col gap-5">
            <pre>
              {JSON.stringify(
                props.otherCelebsWithTag.map((f, i) => ({ ...f, i })),
                null,
                2,
              )}
            </pre>
          </div> */}
        </div>
      </div>
    </Page>
  );
}

export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
export { getStaticProps } from '~/lib/getStatic/tagPage.getStaticProps';
