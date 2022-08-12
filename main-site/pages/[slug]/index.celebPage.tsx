import { isEmpty } from 'lodash-es';
import { StickyAppBar } from '~/lib/a/AppBar';
import { ContributeCta, TweetItAtUs } from '~/components/c/ContributeCta';
import { FacebookComments } from '~/components/f/FacebookComments';
import { Facts } from '~/components/f/Facts';
import { Md } from '~/components/m/Md';
import { Page } from '~/components/p/Page';
import { Pagination } from '~/components/p/Pagination';
import { TopContributorsWidget } from '~/components/t/TopContributorsWidget';
import { Card } from '~/components/c/Card';
import {
  Hero,
  HeroCelebImage,
  HeroTitleContainer,
  HeroTitleSoftText,
  HeroTitleStrongText,
  HeroTopContainer,
} from '~/components/h/Hero';
import { TitledCard } from '~/components/t/TitledCard';
import { c } from '~/lib/c';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

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
