import React from 'react';
import { RiHome2Line, RiQuillPenLine } from 'react-icons/ri';
import { Card } from '~/lib/pages/components/Card';
import { Page } from '~/lib/pages/components/Page';

export default function About() {
  return (
    <Page
      title={`About`}
      description={``}
      pathname={`~about`}
      allowSearchEngines={false}
    >
      <Card className="mt-5 border-t text-neutral-500">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="flex items-center gap-2 text-lg font-medium">
              <RiHome2Line />
              About
            </h2>
            <p>Hollowverse is about the important people and their views.</p>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="flex items-center gap-2 text-lg font-medium">
              <RiQuillPenLine /> Write to us
            </h2>
            <p>
              At{' '}
              <a
                href="mailto:hollowverse@hollowverse.com"
                className="lovely-gradient cursor-pointer select-none bg-clip-text text-transparent"
              >
                hollowverse@hollowverse.com
              </a>
            </p>
          </div>
        </div>
      </Card>
    </Page>
  );
}
