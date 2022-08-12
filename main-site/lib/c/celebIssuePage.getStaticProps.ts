import { flatten, isEmpty } from 'lodash-es';
import { customTitleDefinitions } from '~/lib/c/customTitleDefinitions';
import { oneDay } from '~/lib/d/date';
import { getCeleb } from '~/lib/g/getCeleb';
import { getCelebFacts } from '~/lib/g/getCelebFacts';
import { getFactIssues } from '~/lib/g/getFactIssues';
import { getIssue } from '~/lib/g/getIssue';
import { getTagTimeline } from '~/lib/g/getTagTimeline';
import { transformFact } from '~/lib/t/transformFact';
import { celebNameToIssue } from '~/lib/c/celebNameToIssue';
import { tagIsVerb } from '~/lib/t/tagIsVerb';
import { PageProps } from '~/shared/lib/types';

export type CelebIssuePageProps = PageProps<typeof getStaticProps>;

export async function getStaticProps({
  params,
}: {
  params: { slug: string; issueId: string };
}) {
  if (!params.issueId || !params.slug) {
    return { notFound: true };
  }

  const [celeb, issue] = await Promise.all([
    getCeleb(params.slug),
    getIssue(params.issueId),
  ]);

  if (!celeb) {
    return { notFound: true };
  }

  if (!issue) {
    return {
      redirect: {
        destination: `/${params.slug}`,
        permanent: false,
      },
    };
  }

  const allFacts = await getCelebFacts(celeb._id);
  const facts = allFacts.filter((f) =>
    f.tags.some((t) => t.tag.issue._id === params.issueId),
  );

  if (isEmpty(facts)) {
    return {
      redirect: {
        destination: `/${params.slug}`,
        permanent: false,
      },
    };
  }

  const tagTimeline = getTagTimeline(facts, issue);
  const tag = facts[0].tags.find((t) => t.tag.issue._id === params.issueId)!;
  const issues = getFactIssues(allFacts);
  const customTitles =
    customTitleDefinitions[`${params.slug}/issue/${params.issueId}`];

  return {
    props: {
      pageTitle:
        customTitles?.title ||
        `What are ${celebNameToIssue(celeb.name, issue)}?`,
      pageDescription:
        customTitles?.description || getPageDescription(celeb.name),
      tag,
      tagTimeline,
      issue,
      issues,
      celeb,
      facts: facts.map((f) => transformFact(f)),
    },
    revalidate: oneDay,
  };

  function getPageDescription(celebName: string) {
    const tags = flatten(tagTimeline.map((tp) => tp[1]));

    let lastSeenIsVerb: boolean | null = null;

    const joinedTags = tags
      .map((t, i) => {
        let postfix: string;

        if (i === tags.length - 2) {
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

        if (lastSeenIsVerb === false) {
          return content;
        }

        lastSeenIsVerb = false;
        return `is ${content}`;
      })
      .join('');

    return `${celebName} ${joinedTags}`;
  }
}
