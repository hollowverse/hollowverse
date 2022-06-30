import { isEmpty } from 'lodash-es';
import Image from 'next/image';
import { AiOutlineTwitter } from 'react-icons/ai';
import { FiMessageSquare } from 'react-icons/fi';
import { CgWebsite } from 'react-icons/cg';
import { CelebImage } from '~/components/CelebImage';
import { DiscourseThread } from '~/components/DiscourseThread';
import { Fact } from '~/components/Fact';
import { useFact } from '~/components/hooks/useFact';
import { useGaEventRecorder } from '~/components/hooks/useGaEventRecorder';
import { InFeedAd } from '~/components/InFeedAd';
import { LovelyTopBorder } from '~/components/LovelyTopBorder';
import { Page } from '~/components/Page';
import { Spinner } from '~/components/Spinner';
import { TitleSeparator } from '~/components/TitleSeparator';
import { Card } from '~/components/ui/Card';
import { CHRList } from '~/components/ui/CHRList';
import { ReturnToCelebViewsButton } from '~/components/ui/ReturnToCelebViewsButton';
import { TitledCard } from '~/components/ui/TitledCard';
import { getSourceHost } from '~/lib/getSourceHost';
import { FactPageProps } from '~/lib/getStatic/factPage.getStaticProps';
import { Fact as TFact } from '~/lib/groq/fact.projection';
import { Link } from '~/lib/Link';
import { renderTags } from '~/pages/[celeb]/tag/[celebTagId]';

function getTextSummary(name: string, fact: TFact, length: number) {
  let text: string;

  if (fact.type === 'quote') {
    text = `${name}: ${fact.quote}`;
  } else {
    text = fact.content;
  }

  return text.substring(0, length) + '...';
}

export default function FactPage(props: FactPageProps) {
  const { celeb, fact, otherCelebsWithIssue, otherCelebsWithTag, tag } = props;
  const { contributorUsername, commentCount } = useFact(fact);
  const sourceHost = getSourceHost(fact.source);

  useGaEventRecorder('issue_view', {
    name: fact.issues[0].name,
    id: fact.issues[0]._id,
  });

  return (
    <Page
      id="fact-page"
      title={getTextSummary(celeb.name, fact, 55)}
      description={getTextSummary(celeb.name, fact, 145)}
      allowSearchEngines
      pathname={`${celeb.slug}/fact/${fact._id}`}
    >
      <div className="h-container my-5 flex flex-col gap-5">
        <Link href={`/${celeb.slug}`} passHref>
          <a id="fact-page-header">
            <div className="mx-5 flex items-center gap-5">
              <div className="relative aspect-square w-20">
                <CelebImage
                  className="rounded-xl object-cover"
                  picture={celeb.picture}
                  name={celeb.name}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{celeb.name}</h1>
                <h2 className="text-xl text-neutral-500">
                  on {fact.issues[0].name}
                </h2>
              </div>
            </div>
          </a>
        </Link>

        <Card>
          <LovelyTopBorder />
          <div className="flex flex-col gap-3 p-5">
            <Fact
              slug={celeb.slug}
              fact={fact}
              celebName={celeb.name}
              showComments={false}
            />
          </div>
        </Card>

        <Card className="flex flex-col gap-5 px-5 py-5">
          <h3 className="text-xs font-semibold uppercase tracking-tighter text-neutral-500">
            Contributed by
          </h3>

          <div className="flex gap-4">
            <div className="shrink-0">
              <Image
                className="rounded-full"
                width={50}
                height={50}
                alt={`${props.contributor.username}'s image`}
                src={`https://forum.hollowverse.com${props.contributor.avatar_template.replace(
                  '{size}',
                  '150',
                )}`}
              />
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <div className="flex items-center gap-1">
                <p className="font-semibold">{props.contributor.name}</p>
                <p className="font-semibold text-neutral-400">
                  @{props.contributor.username}
                </p>
                <div className="flex-1" />
                <AiOutlineTwitter className="text-2xl text-blue-400" />
              </div>

              <p
                className="pointer-events-none text-sm text-neutral-600"
                dangerouslySetInnerHTML={{
                  __html: props.contributor.bio_excerpt,
                }}
              />

              <div className="flex items-center gap-1">
                <CgWebsite className="text-neutral-500" />
                <a
                  href={props.contributor.website}
                  className="truncate text-sm text-blue-400 underline"
                >
                  {props.contributor.website_name}
                </a>
              </div>
            </div>
          </div>

          <hr className="-mx-5" />

          <div>
            <p className="text-sm text-neutral-500">
              You&apos;re invited to contribute, too! Learn how.
            </p>
          </div>
        </Card>

        <ReturnToCelebViewsButton slug={celeb.slug} name={celeb.name} />

        <TitledCard titledContentProps={{ title: 'Comments' }}>
          <div className="p-5" id="fact-page-comments">
            {(commentCount === null && (
              <div className="w-ful flex justify-center">
                <Spinner />
              </div>
            )) ||
              (commentCount !== null && commentCount > 0 ? (
                <DiscourseThread threadUrl={fact.forumLink} />
              ) : (
                <div className="flex w-full flex-col gap-5 text-base">
                  <p>
                    What are your thoughts on this? Share them in the comments
                    below.
                  </p>

                  <Link href={`${fact.forumLink}#reply`}>
                    <a className="textbox-border flex h-20 w-full items-center justify-center gap-2 bg-gray-50 text-lg text-gray-400 shadow-inner hover:bg-gray-100 hover:text-gray-500">
                      <FiMessageSquare /> Start discussion
                    </a>
                  </Link>
                </div>
              ))}
          </div>
        </TitledCard>

        {!isEmpty(otherCelebsWithTag) && (
          <div id="related-celebs-tag">
            <CHRList
              title={
                <>
                  Others <TitleSeparator /> {tag.tag.name}
                </>
              }
              celebs={otherCelebsWithTag!}
              renderBody={(c) => renderTags(c.tags)}
            />
          </div>
        )}

        <InFeedAd />

        {!isEmpty(otherCelebsWithIssue) && (
          <div id="related-celebs-issue">
            <CHRList
              title={
                <>
                  Others <TitleSeparator /> {tag.tag.issue.name}
                </>
              }
              celebs={otherCelebsWithIssue!}
              renderBody={(c) => renderTags(c.tags)}
            />
          </div>
        )}
      </div>
    </Page>
  );
}

export { getStaticPaths } from '~/lib/getStatic/defaultGetStaticPaths';
export { getStaticProps } from '~/lib/getStatic/factPage.getStaticProps';
