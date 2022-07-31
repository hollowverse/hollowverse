import { flatten, isEmpty } from 'lodash-es';
import { customTitleDefinitions } from '~/lib/customTitleDefinitions';
import { oneDay } from '~/lib/date';
import { getCeleb } from '~/lib/getStatic/helpers/getCeleb';
import { getCelebFacts } from '~/lib/getStatic/helpers/getCelebFacts';
import { getFactIssues } from '~/lib/getStatic/helpers/getFactIssues';
import { getIssue } from '~/lib/getStatic/helpers/getIssue';
import { getTagTimeline } from '~/lib/getStatic/helpers/getTagTimeline';
import { transformFact } from '~/lib/getStatic/helpers/transformFact';
import { celebNameToIssue } from '~/lib/language/celebNameToIssue';
import { tagIsVerb } from '~/lib/language/tagIsVerb';
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

  const tagTimeline = getTagTimeline(facts);
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
