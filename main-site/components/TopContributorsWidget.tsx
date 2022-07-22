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

  if (!topContributors) {
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

        <p className="text-neutral-500">
          You can contribute, too!{' '}
          <a
            className="h-link underline"
            href="https://forum.hollowverse.com/t/how-to-contribute-to-hollowverse"
          >
            Learn how
          </a>
          .
        </p>
      </div>
    </TitledCard>
  );
}
