import React from 'react';
import { Card } from '~/components/Card';
import { Page } from '~/components/Page';

export type ResearcherLaunchPadProps = {
  celebName: string;
  pathname: string;
  topics: string[];
};

export default function ResearcherLaunchPad(props: ResearcherLaunchPadProps) {
  return (
    <Page
      title={`${props.celebName}'s religion and political views`}
      description={`Hollowverse researcher's launch pad for researching ${props.celebName}`}
      allowSearchEngines={false}
      pathname={props.pathname}
    >
      <div className="mx-auto mt-5 flex w-full max-w-3xl flex-col gap-5">
        <Card
          title={`Suggested Google searches to research ${props.celebName}'s views`}
        >
          <div className="flex flex-wrap gap-5">
            {props.topics.map((t) => {
              return (
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="h-link rounded-full border p-1 px-3"
                  key={t}
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    `${props.celebName} ${t}`,
                  )}`}
                >
                  {t}
                </a>
              );
            })}
          </div>
        </Card>

        {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      </div>
    </Page>
  );
}

export { getStaticProps } from '~/lib/getStatic/launchPadCeleb.getStaticProps';
export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
