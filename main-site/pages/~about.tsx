import React from 'react';
import { RiHome2Line, RiQuillPenLine } from 'react-icons/ri';
import { Card } from '~/components/Card';
import { Page } from '~/components/Page';

export default function About() {
  return (
    <Page
      title={`About`}
      description={`About Hollowverse and contact info`}
      pathname={`~about`}
      allowSearchEngines={false}
    >
      <Card className="mt-5 border-t text-neutral-500">
        <div className="h-container flex flex-col gap-8 p-5">
          <div className="flex flex-col gap-2">
            <h2 className="flex items-center gap-2 text-xl font-medium">
              <RiHome2Line />
              About
            </h2>

            <div className="flex flex-col gap-5 text-lg text-neutral-600">
              <p>
                The goal of Hollowverse is to allow you to read and share what
                you know about celebrities&apos; religions and political views,
                regardless of what those might be. We want to be a place of
                entertainment and discovery, and we also want to be as
                informative and unbiased as possible.
              </p>

              <p>
                Anyone can{' '}
                <a
                  className="h-link"
                  href="https://forum.hollowverse.com/t/how-to-contribute-to-hollowverse/1929"
                >
                  contribute to Hollowverse
                </a>
                , including you! Through our unique process, you can submit
                Facts.
              </p>

              <p>
                Facts are to Hollowverse what Tweets are to Twitter. Hollowverse
                Facts are simply sayings or actions that celebrities did
                publicly.
              </p>

              <p>
                You can submit a Fact or write a reply to one. Our Fact
                guidelines are open for everyone to see, our process is
                transparent. We accept Facts for any celebrity of any political
                or religious ideology and our own ideologies have no influence
                on our decision to accept or reject a Fact.
              </p>

              <p>
                Once a Fact is accepted, it receives Issues and Tags. Issues are
                the discussion subjects related to the Fact, and the Tag is a
                way for users to easily understand the position of that
                celebrity when it comes to the Issue in question.
              </p>

              <p>
                For example, if a celebrity claims to confess to a priest every
                week, we would assign the Issue:{' '}
                <span className="italic">Religion</span> and the Tag:{' '}
                <span className="italic">Catholic</span>. Or, as another
                example, if a celebrity has voted for Democrat candidates for
                the past 20 years, we would assign the Issue:{' '}
                <span className="italic">Political Affiliation</span>, and the
                Tag: <span className="italic">Democrat</span>.
              </p>

              <p>
                We also have a{' '}
                <a className="h-link" href="https://forum.hollowverse.com/">
                  forum
                </a>{' '}
                where you can comment on any Fact. This is our way to stimulate
                conversations about the Issues and Tags applied to celebrities.
                It&apos;s a place for you to learn with the community, but more
                importantly, a place to argue and question the Issues and Tags
                applied to the Fact. After all, religion and politics are
                complex subjects close to most people&apos;s hearts, and we want
                to make sure Hollowverse represents in as objective and clear a
                way as possible what the beliefs of celebrities are.
              </p>

              <p>
                So Hollowverse is not only a source of unbiased information
                about celebrities and their personal beliefs, but also a place
                of respectful discussion and free-thinking. We hope to see you
                on our{' '}
                <a className="h-link" href="https://forum.hollowverse.com/">
                  forum
                </a>
                !
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="flex items-center gap-2 text-xl font-medium">
              <RiQuillPenLine /> Write to us
            </h2>
            <p>
              At{' '}
              <a
                href="mailto:hollowverse@hollowverse.com"
                className="lovely-gradient cursor-pointer select-none bg-clip-text text-lg text-transparent"
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
