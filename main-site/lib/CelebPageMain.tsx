import { Alert, Avatar } from '@mui/material';
import { isEmpty } from 'lodash-es';
import { FaInfoCircle, FaRegEdit } from 'react-icons/fa';
import { AppBar } from '~/lib/AppBar';
import { Article } from '~/lib/Article';
import { c } from '~/lib/c';
import { Card } from '~/lib/Card.ui';
import { CelebPageHero } from '~/lib/CelebPageHero';
import { CelebPageMainProps } from '~/lib/celebPageMain.getStaticProps';
import { FacebookComments } from '~/lib/FacebookComments';
import { InterestingProfiles } from '~/lib/InterestingProfiles';
import { Page } from '~/lib/Page';
import { TitledCard } from '~/lib/TitledCard.ui';

export function CelebPageMain(props: CelebPageMainProps) {
  const name = props.celeb.name;

  return (
    <Page
      title={`What are the political views and Religious Beliefs of ${name}?`}
      description={props.pageDescription}
      allowSearchEngines
      pathname={props.pagePath}
      id="celeb-page"
      appBar={<AppBar />}
    >
      <Card topBorder={false}>
        <CelebPageHero {...props} />
      </Card>

      <div
        className={c('h-container my-5 flex flex-col gap-5', props.celeb.slug)}
        id="content"
      >
        <section className="flex flex-col gap-5">
          {!isEmpty(props.positions) && (
            <TitledCard titledContentProps={{ title: 'Summary' }}>
              <div className="flex flex-col gap-5 p-5" id="editorial-summary">
                {props.positions.map((p) => (
                  <div className="flex flex-col gap-2" key={p._id}>
                    <h3 className="font-semibold">{p.issue}</h3>
                    <p>{p.summary}</p>
                  </div>
                ))}
              </div>
            </TitledCard>
          )}

          <Article {...props} />

          <div className="px-1">
            <Alert severity="info">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p>
                    This wiki was last updated on{' '}
                    <span className="underline">{props.wiki.date}</span> by:
                  </p>

                  <div className="flex items-center gap-3">
                    <Avatar
                      alt={props.wiki.name}
                      src={`https://forum.hollowverse.com/${props.wiki.avatar.replace(
                        '{size}',
                        '90',
                      )}`}
                    />
                    <p className="text-md font-bold">{props.wiki.name}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <p>Today we're opening contributions to all readers.</p>

                  <p>
                    <span className="underline">We invite you</span> and ask you
                    to help us update this wiki by editing it.
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <a
                      href={props.celeb.wiki!}
                      className="flex items-center gap-2 rounded-md bg-blue-500 py-2 px-5 text-white shadow-md"
                    >
                      <FaRegEdit /> Edit this wiki
                    </a>

                    <a
                      href="https://forum.hollowverse.com/t/how-to-edit-or-create-a-wiki/7333"
                      className="flex items-center gap-2 rounded-md border border-blue-400 px-5 py-2 shadow-sm"
                    >
                      <FaInfoCircle />
                      How to edit this wiki
                    </a>
                  </div>
                </div>
              </div>
            </Alert>
          </div>

          <InterestingProfiles {...props} />
        </section>

        <TitledCard
          titledContentProps={{
            title: (
              <span className="text-base">What do you think of this?</span>
            ),
          }}
        >
          <div id="fact-page-comments" className="my-1 mx-3">
            <FacebookComments pathname={`/${props.celeb.slug}`} />
          </div>
        </TitledCard>
      </div>
    </Page>
  );
}
