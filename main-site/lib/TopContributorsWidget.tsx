import { isEmpty } from 'lodash-es';
import { Fragment } from 'react';
import { ContributorBox } from '~/lib/ContributorBox';
import { useHvApi } from '~/lib/useHvApi';
import { TitledCard } from '~/lib/TitledCard';
import { pluralize } from '~/lib/pluralize';
import {
  TopContributorsQueryParams,
  TopContributorsResults,
} from '~/pages/api/top-contributors';

export function TopContributorsWidget(
  props: TopContributorsQueryParams & { celebName: string },
) {
  const { data: topContributors } = useHvApi<TopContributorsResults>(
    'top-contributors?' + new URLSearchParams({ slug: props.slug }),
  );

  if (!topContributors || isEmpty(topContributors)) {
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
      </div>
    </TitledCard>
  );
}
