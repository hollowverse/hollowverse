import { CelebImage } from '~/components/CelebImage';
import { ContributorBox } from '~/components/ContributorBox';
import { FacebookComments } from '~/components/FacebookComments';
import { Fact } from '~/components/Fact';
import { useGaEventRecorder } from '~/components/hooks/useGaEventRecorder';
import { InFeedAd } from '~/components/InFeedAd';
import { LovelyTopBorder } from '~/components/LovelyTopBorder';
import { Page } from '~/components/Page';
import {
  RelatedCelebsByIssue,
  RelatedCelebsByTag,
} from '~/components/RelatedCelebs';
import { Card } from '~/components/ui/Card';
import { ReturnToCelebViewsButton } from '~/components/ui/ReturnToCelebViewsButton';
import { TitledCard } from '~/components/ui/TitledCard';
import { getFactPagePathname } from '~/lib/getFactPagePathname';
import { getFactPageTitle } from '~/lib/getFactPageTitle';
import { FactPageProps } from '~/lib/getStatic/factPage.getStaticProps';
import { celebNameToIssue } from '~/lib/language/celebNameToIssue';
import { Link } from '~/lib/Link';

export default function FactPage(props: FactPageProps) {
  useGaEventRecorder('issue_view', {
    name: props.fact.issues[0].name,
    id: props.fact.issues[0]._id,
  });

  return (
    <Page
      id="fact-page"
      title={getFactPageTitle(props.celeb.name, props.fact, 90)}
      description={getFactPageTitle(props.celeb.name, props.fact, 145)}
      allowSearchEngines
      pathname={getFactPagePathname(props.celeb.slug, props.fact)}
    >
      <div className="h-container my-5 flex flex-col gap-5">
        <Link
          href={`/${props.celeb.slug}/issue/${props.fact.issues[0]._id}`}
          passHref
        >
          <a
            id="fact-page-header"
            title={celebNameToIssue(props.celeb.name, props.fact.issues[0])}
          >
            <div className="mx-5 flex items-center gap-5">
              <div className="relative aspect-square w-20">
                <CelebImage
                  className="rounded-xl object-cover"
                  picture={props.celeb.picture}
                  name={props.celeb.name}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{props.celeb.name}</h1>
                <h2 className="text-xl text-neutral-500">
                  on {props.fact.issues[0].name}
                </h2>
              </div>
            </div>
          </a>
        </Link>

        <Card>
          <LovelyTopBorder />
          <div className="flex flex-col gap-3 p-5">
            <Fact
              slug={props.celeb.slug}
              fact={props.fact}
              celebName={props.celeb.name}
              showCommentsButton={false}
            />
          </div>
        </Card>

        {props.contributor && (
          <Card className="flex flex-col gap-3 px-5 py-3">
            <h3 className="text-xs font-semibold uppercase tracking-tighter text-neutral-500">
              Contributed by
            </h3>

            <ContributorBox {...props.contributor} />

            <hr className="-mx-5" />

            <p className="text-sm text-neutral-500">
              You can contribute, too!{' '}
              <a
                className="h-link underline"
                href="https://forum.hollowverse.com/t/how-to-contribute-to-hollowverse"
              >
                Learn how
              </a>
              .
            </p>
          </Card>
        )}

        <ReturnToCelebViewsButton
          slug={props.celeb.slug}
          name={props.celeb.name}
        />

        <TitledCard titledContentProps={{ title: 'Comments' }}>
          <div id="fact-page-comments">
            <FacebookComments
              pathname={getFactPagePathname(props.celeb.slug, props.fact)}
            />
          </div>
        </TitledCard>

        <RelatedCelebsByTag celebs={props.relatedCelebsByTag} tag={props.tag} />

        <InFeedAd />

        <RelatedCelebsByIssue
          celebs={props.relatedCelebsByIssue}
          tag={props.tag}
        />
      </div>
    </Page>
  );
}

export { getStaticPaths } from '~/lib/getStatic/default.getStaticPaths';
export { getStaticProps } from '~/lib/getStatic/factPage.getStaticProps';
