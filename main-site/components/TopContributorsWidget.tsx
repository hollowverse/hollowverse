import { isEmpty } from 'lodash-es';
import { Fragment } from 'react';
import { ContributeCta } from '~/components/ContributeCta';
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
