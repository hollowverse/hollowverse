import { isEmpty } from 'lodash-es';
import { Fragment } from 'react';
import { ContributorBox } from '~/components/ContributorBox';
import { useHvApi } from '~/components/hooks/useHvApi';
import { TitledCard } from '~/components/ui/TitledCard';
import { pluralize } from '~/lib/language/pluralize';
import { TopContributors } from '~/lib/psql/celebTopContributors.psql';
import {
  TopContributorsQueryParams,
  TopContributorsResults,
} from '~/pages/api/top-contributors';

export function TopContributors(
  props: TopContributorsQueryParams & { celebName: string },
) {
  const { data: topContributors } = useHvApi<TopContributorsResults>(
    'top-contributors?' + new URLSearchParams({ slug: props.slug }),
  );

  if (isEmpty(topContributors)) {
    return null;
  }

  return (
    <TitledCard
      titledContentProps={{
        title: (
          <span className="block truncate text-base">
            Top{' '}
            {pluralize(topContributors.length, 'Contributor', 'Contributors')}{' '}
            to {props.celebName}&apos;s page
          </span>
        ),
      }}
    >
      <div className="flex flex-col gap-3 p-3 px-5">
        {topContributors.map((c, i) => (
          <Fragment key={c.username}>
            <ContributorBox showBio={i === 0} {...c} />
            {i !== topContributors.length - 1 ? <hr className="-mx-5" /> : null}
          </Fragment>
        ))}

        <hr className="-mx-5" />

        <div className="flex flex-col gap-2 text-sm text-neutral-500">
          <p>
            <span className="font-bold">Help us out!</span> Can you do some
            research on {props.celebName} to help us grow this page? We&apos;ll
            make it worth your while!
          </p>

          <p>
            Get in touch with us at{' '}
            <a
              rel="noreferrer"
              target="_blank"
              className="h-link"
              href={getEmailLink()}
            >
              hollowverse@hollowverse.com
            </a>
            !
          </p>
        </div>
      </div>
    </TitledCard>
  );

  function getEmailLink() {
    const subject = encodeURIComponent(
      `I'm interested in researching ${props.celebName}`,
    );
    const body = encodeURIComponent(
      `Hi Hollowverse!\n\nI'm interested in helping research ${props.celebName}!\n\nTell me more.\n\nThanks!`,
    );

    return `mailto:hollowverse@hollowverse.com?subject=${subject}&body=${body}`;
  }
}
