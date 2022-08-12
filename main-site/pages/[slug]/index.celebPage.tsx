import { isEmpty } from 'lodash-es';
import { StickyAppBar } from '~/lib/AppBar';
import { c } from '~/lib/c';
import { Card } from '~/lib/Card';
import { CelebPageProps } from '~/lib/celebPage.getStaticProps';
import { CelebPageHero } from '~/lib/celebPageHero';
import { ContributeCta, TweetItAtUs } from '~/lib/ContributeCta';
import { FacebookComments } from '~/lib/FacebookComments';
import { Facts } from '~/lib/Facts';
import { Md } from '~/lib/Md';
import { Page } from '~/lib/Page';
import { Pagination } from '~/lib/Pagination';
import { TitledCard } from '~/lib/TitledCard';
import { TopContributorsWidget } from '~/lib/TopContributorsWidget';

export default function Celeb(props: CelebPageProps) {
  const name = props.celeb.name;

  return (
    <Page
      title={
        props.hasFacts
          ? `What are the political views of ${name}?`
          : `${name}'s Religion and Political Views`
      }
      description={props.pageDescription}
      allowSearchEngines
      pathname={props.pagePath}
      id="celeb-page"
      appBar={
        <StickyAppBar>
          <CelebPageHero {...props} />
        </StickyAppBar>
      }
    >
      <div
        className={c('h-container my-5 flex flex-col gap-5', props.celeb.slug)}
        id="content"
      >
        {!isEmpty(props.facts) && <Facts {...props} />}

        <Pagination
          {...props.pagination}
          getLink={(pageNumber) =>
            pageNumber === 1
              ? `/${props.celeb.slug}`
              : `/${props.celeb.slug}/p/${pageNumber}#content`
          }
        />

        {props.celeb.oldContent && <Md {...props} />}

        <TopContributorsWidget
          slug={props.celeb.slug!}
          celebName={props.celeb.name}
        />

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
