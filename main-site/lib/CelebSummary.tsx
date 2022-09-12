import { isEmpty } from 'lodash-es';
import { FaRegEdit } from 'react-icons/fa';
import { CelebPageMainProps } from '~/lib/celebPageMain.getStaticProps';
import { TitledCard } from '~/lib/TitledCard.ui';
import { useLocationHref } from '~/lib/useLocationHref';
import { useUser } from '~/lib/useUser';

export function CelebSummary(props: CelebPageMainProps) {
  const href = useLocationHref();
  const user = useUser();

  return !isEmpty(props.positions) ? (
    <TitledCard
      titledContentProps={{
        title: (
          <span className="flex gap-3">
            Summary{' '}
            <button
              onClick={() => {
                if (user) {
                  // edit
                  console.log('here');
                } else {
                  window.location.href = `/api/login?redirect=${encodeURI(
                    href,
                  )}`;
                }
              }}
              // href={props.celeb.wiki!}
              className="h-link flex items-center text-base font-normal"
            >
              <span className="flex items-center gap-1 ">
                <FaRegEdit /> Edit
              </span>
            </button>
          </span>
        ),
      }}
    >
      <div className="flex flex-col gap-5 p-5" id="editorial-summary">
        {props.positions.map((p) => (
          <div className="flex flex-col gap-2" key={p._id}>
            <h3 className="font-semibold">{p.issue}</h3>
            <p>{p.summary}</p>
          </div>
        ))}
      </div>
    </TitledCard>
  ) : null;
}
