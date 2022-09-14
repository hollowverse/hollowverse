import { Button } from '@mui/material';
import { isEmpty } from 'lodash-es';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { Celeb } from '~/lib/celeb.projection';
import { Position } from '~/lib/position.projection';
import { TitledCard } from '~/lib/TitledCard.ui';
import { useLocationHref } from '~/lib/useLocationHref';
import { useUser } from '~/lib/useUser';
import EditIcon from '@mui/icons-material/Edit';

const EditSummary = dynamic(() => import('~/lib/SummaryForm'), {
  loading: () => <div>Loading...</div>,
});

export function CelebSummary(props: { positions: Position[]; celeb: Celeb }) {
  const [edit, setEdit] = useState(false);
  const href = useLocationHref();
  const user = useUser();

  return isEmpty(props.positions) ? <AskForSummaryContrib /> : <Summary />;

  function onClick() {
    if (user) {
      setEdit(!edit);
    } else {
      window.location.href = `/api/login?redirect=${encodeURI(href)}`;
    }
  }

  function AskForSummaryContrib() {
    return (
      <TitledCard
        titledContentProps={{
          title: 'Summary',
        }}
      >
        <div className="p-5" id="editorial-summary">
          {(edit && (
            <EditSummary {...props} onDone={() => setEdit(false)} />
          )) || (
            <div className="flex flex-col gap-5 ">
              <p>
                No one has written a summary for {props.celeb.name}'s religion
                and political views. We'd like to invite you to do it!
              </p>

              <Button
                startIcon={<EditIcon />}
                onClick={onClick}
                size="small"
                variant="contained"
                className="w-fit bg-blue-500"
              >
                Write a Quick Summary
              </Button>
            </div>
          )}
        </div>
      </TitledCard>
    );
  }

  function Summary() {
    return (
      <TitledCard
        titledContentProps={{
          title: (
            <span className="flex gap-3">
              Summary{' '}
              {!edit && (
                <button
                  onClick={onClick}
                  className="h-link flex items-center text-base font-normal"
                >
                  <span className="flex items-center gap-1 ">
                    <FaRegEdit /> Edit
                  </span>
                </button>
              )}
            </span>
          ),
        }}
      >
        <div className="flex flex-col gap-5 p-5" id="editorial-summary">
          {(edit && <EditSummary {...props} onDone={() => setEdit(false)} />) ||
            props.positions.map((p) => (
              <div className="flex flex-col gap-2" key={p._id}>
                <h3 className="font-semibold">{p.issue}</h3>
                <p>{p.summary}</p>
              </div>
            ))}
        </div>
      </TitledCard>
    );
  }
}
