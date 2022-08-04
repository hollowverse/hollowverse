import { isEmpty } from 'lodash-es';
import { StickyAppBar } from '~/components/AppBar';
import { ContributeCta, TweetItAtUs } from '~/components/ContributeCta';
import { FacebookComments } from '~/components/FacebookComments';
import { Facts } from '~/components/Facts';
import { noIssueFilter } from '~/components/IssueSelector';
import { Md } from '~/components/Md';
import { Page } from '~/components/Page';
import { Pagination } from '~/components/Pagination';
import { InBetweenContentShareButton } from '~/components/ShareButton';
import { TagCollection } from '~/components/TagCollection';
import { TopContributorsWidget } from '~/components/TopContributorsWidget';
import { Card } from '~/components/ui/Card';
import {
  Hero,
  HeroCelebImage,
  HeroTitleContainer,
  HeroTitleSoftText,
  HeroTitleStrongText,
  HeroTopContainer,
} from '~/components/ui/Hero';
import { TitledCard } from '~/components/ui/TitledCard';
import { c } from '~/lib/c';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';
import { CelebIssueSelector } from '~/pages/[slug]/issue/[issueId].celebIssuePage';

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
          <Hero>
            <HeroTopContainer>
              <HeroCelebImage
                name={props.celeb.name}
                picture={props.celeb.picture}
              />
              <HeroTitleContainer>
                <HeroTitleSoftText>
                  The {props.hasFacts ? '' : 'Religion and '}Political Views of{' '}
                </HeroTitleSoftText>
                <HeroTitleStrongText>{props.celeb.name}</HeroTitleStrongText>
              </HeroTitleContainer>
            </HeroTopContainer>
          </Hero>
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

export { getStaticProps } from '~/lib/getStatic/celebPage.getStaticProps';
export { getStaticPaths } from '~/lib/getStatic/default.getStaticPaths';
