import groq from 'groq';
import { flatten, isEmpty, uniq } from 'lodash-es';
import { customTitleDefinitions } from '~/lib/customTitleDefinitions';
import { oneDay } from '~/lib/date';
import { getCelebIssues } from '~/lib/getStatic/helpers/getCelebIssues';
import { getTagTimeline } from '~/lib/getStatic/helpers/getTagTimeline';
import { transformFact } from '~/lib/getStatic/helpers/transformFact';
import {
  CelebWithFacts,
  getCelebWithFactsGroq,
} from '~/lib/groq/getCelebWithFacts.groq';
import { Issue } from '~/lib/groq/issue.projection';
import { celebNameToIssue } from '~/lib/language/celebNameToIssue';
import { tagIsVerb } from '~/lib/language/tagIsVerb';
import { PageProps } from '~/shared/lib/types';
import { sanityClient } from '~/shared/lib/sanityio';

export type CelebIssuePageProps = PageProps<typeof getStaticProps>;

export async function getStaticProps({
  params,
}: {
  params: { slug: string; issueId: string };
}) {
  if (!params.issueId) {
    return { notFound: true };
  }

  const [celebWithFacts, issue] = await Promise.all([
    sanityClient.fetch<CelebWithFacts<false>>(
      'celeb-and-facts',
      getCelebWithFactsGroq({ includeOldContent: false }),
      {
        slug: params.slug,
        issueId: null,
      },
    ),
    sanityClient.fetch<Issue>(
      'issue',
      groq`*[_type == 'topic' && _id == $issueId][0]`,
      { issueId: params.issueId },
    ),
  ]);

  if (!issue || !celebWithFacts?.celeb) {
    return { notFound: true };
  }

  const facts = celebWithFacts.celeb.facts.filter((f) =>
    f.issues.some((i) => i._id === params.issueId),
  );

  if (isEmpty(facts)) {
    // Some pages link to the celeb Issue page because the celeb has a tag that belongs
    // to the issue. So it is assumed that the celeb also has at least one Fact with the Issue, but that can be
    // a wrong assumption. The celeb may have the tag of one Issue on a Fact of a different
    // Issue, and not have a Fact for the Tag Issue at all, in which case, we'd have an empty
    // list of Facts for the celeb here. So we redirect this link back to the celeb's main-page.
    //
    // We should fix this though. Any Fact that has a Tag that belongs to Issue X, the Fact itself
    // should also have Issue X.
    return {
      redirect: {
        destination: `/${params.slug}`,
        permanent: false,
      },
    };
  }

  const tagTimeline = getTagTimeline(facts);

  const tag = tagTimeline[0][1][0];

  const issues = await getCelebIssues({
    facts: celebWithFacts.celeb.facts,
    excludedId: params.issueId,
  });

  const celeb = {
    ...celebWithFacts.celeb,
    facts: facts.map((f) => transformFact(f)),
    issues,
  };

  const customTitles =
    customTitleDefinitions[`${params.slug}/issue/${params.issueId}`];

  return {
    props: {
      pageTitle:
        customTitles?.title ||
        `What are ${celebNameToIssue(celeb.name, issue)}?`,
      pageDescription: customTitles?.description || getPageDescription(),
      tag,
      tagTimeline,
      issue,
      celeb,
    },
    revalidate: oneDay,
  };

  function getPageDescription() {
    const tags = flatten(tagTimeline.map((tp) => tp[1]));

    let lastSeenIsVerb: boolean | null = null;

    const joinedTags = tags
      .map((t, i) => {
        let postfix: string;

        if (i == tags.length - 2) {
          postfix = ', and ';
        } else if (i < tags.length - 1) {
          postfix = ', ';
        } else {
          postfix = '.';
        }

        const content = `${t.tag.name}${postfix}`;
        if (tagIsVerb(t.tag)) {
          lastSeenIsVerb = true;

          return content;
        }

        if (lastSeenIsVerb == false) {
          return content;
        }

        lastSeenIsVerb = false;
        return `is ${content}`;
      })
      .join('');

    return `${celeb.name} ${joinedTags}`;
  }
}
