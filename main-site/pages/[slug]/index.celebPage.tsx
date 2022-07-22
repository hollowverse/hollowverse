import { isEmpty } from 'lodash-es';
import { StickyAppBar } from '~/components/AppBar';
import { FacebookComments } from '~/components/FacebookComments';
import { Facts } from '~/components/Facts';
import { IssueSelector, noIssueFilter } from '~/components/IssueSelector';
import { Md } from '~/components/Md';
import { Page } from '~/components/Page';
import { InBetweenContentShareButton } from '~/components/ShareButton';
import { TagCollection } from '~/components/TagCollection';
import { TopContributors } from '~/components/TopContributors';
import {
  Hero,
  HeroCelebImage,
  HeroTitleContainer,
  HeroTitleSoftText,
  HeroTitleStrongText,
  HeroTopContainer,
} from '~/components/ui/Hero';
import { TitledCard } from '~/components/ui/TitledCard';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';
import { Celeb as TCeleb } from '~/lib/groq/celeb.projection';
import { Issue } from '~/lib/groq/issue.projection';
import { celebNameToIssue } from '~/lib/language/celebNameToIssue';
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
      pathname={props.celeb.slug}
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

            <div className="border-t border-b">
              <CelebIssueSelector {...props} issue={noIssueFilter} />
            </div>

            <TagCollection
              slug={props.celeb.slug}
              tagTimeline={props.tagTimeline}
            />
          </Hero>
        </StickyAppBar>
      }
    >
      <div
        className="h-container my-5 flex flex-col gap-5"
        id={`celeb-page-${props.celeb.slug}`}
      >
        <InBetweenContentShareButton />

        {!isEmpty(props.celeb.facts) && <Facts {...props} />}

        {props.celeb.oldContent && <Md {...props} />}

        {!isEmpty(props.topContributors) ? (
          <TopContributors
            contributors={props.topContributors!}
            celebName={props.celeb.name}
          />
        ) : null}

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
      </div>
    </Page>
  );
}

export { getStaticProps } from '~/lib/getStatic/celebPage.getStaticProps';
export { getStaticPaths } from '~/lib/getStatic/default.getStaticPaths';
