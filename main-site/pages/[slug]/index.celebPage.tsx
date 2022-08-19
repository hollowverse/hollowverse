import { isEmpty } from 'lodash-es';
import { AppBar, StickyAppBar } from '~/lib/AppBar';
import { c } from '~/lib/c';
import { Card } from '~/lib/Card.ui';
import { CelebPageProps } from '~/lib/celebPage.getStaticProps';
import { CelebPageFacts } from '~/lib/CelebPageFacts';
import { CelebPageHero } from '~/lib/CelebPageHero';
import { ContributeCta, TweetItAtUs } from '~/lib/ContributeCta';
import { FacebookComments } from '~/lib/FacebookComments';
import { Md } from '~/lib/Md';
import { Page } from '~/lib/Page';
import { TitledCard } from '~/lib/TitledCard.ui';

export default function Celeb(props: CelebPageProps) {
  const name = props.celeb.name;

  return (
    <Page
      title={
        props.hasFacts
          ? `What are the political views and Religious Beliefs of ${name}?`
          : `${name}'s Religion and Political Views`
      }
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
        {/* <Card className="flex flex-col gap-5 p-5">
          <Link href="/edit" passHref>
            <a className="flex w-fit items-center gap-3 rounded-md border border-blue-600 bg-blue-500 py-2 px-5 text-white">
              Edit Chris Pratt&apos;s page <FaRegEdit className="text-xl" />
            </a>
          </Link>
        </Card> */}

        {!isEmpty(props.facts) && <CelebPageFacts {...props} />}

        {props.celeb.oldContent && <Md {...props} />}

        <Card>
          <div className="flex flex-col gap-2 px-5 py-5">
            <p className="text-neutral-600">
              Send us a tip about {props.celeb.name}&apos;s politics or beliefs.
              Or <TweetItAtUs />
            </p>
            <ContributeCta name={props.celeb.name} />
          </div>
        </Card>

        {!props.hasFacts && (
          <TitledCard
            titledContentProps={{
              title: (
                <span className="text-base">
                  Your thoughts on {props.celeb.name}?
                </span>
              ),
              stickyTitle: false,
            }}
          >
            <div className="my-1 mx-3">
              <FacebookComments pathname={`/${props.celeb.slug}`} />
            </div>
          </TitledCard>
        )}
      </div>
    </Page>
  );
}

export { getStaticProps } from '~/lib/celebPage.getStaticProps';
export { getStaticPaths } from '~/lib/default.getStaticPaths';
