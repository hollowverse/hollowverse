import { Alert, Button, TextField } from '@mui/material';
import { CelebPageMainProps } from '~/lib/celebPageMain.getStaticProps';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';
import { isEmpty, values } from 'lodash-es';
import { summaryFormValidate } from '~/lib/summaryFormValidate';
import { hvApiClient, post } from '~/lib/hvApiClient.v2';
import { useState } from 'react';
import { Json } from '~/shared/lib/types';
import { Position } from '~/lib/position.projection';
import { Celeb } from '~/lib/celeb.projection';

type SummaryFormFields = {
  religionSummary: string;
  polvisSummary: string;
};

export type SummaryFormPayload = {
  celeb: { name: string; slug?: string };
} & SummaryFormFields;

export default function SummaryForm(props: {
  onDone: () => any;
  positions: (Position | null)[];
  celeb: { name: string; slug?: string };
}) {
  const [status, setStatus] = useState<'ready' | 'loading' | 'done'>('ready');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [forumPost, setForumPost] = useState<Json | null>(null);

  return <div>{status === 'done' ? <Done /> : <Form />}</div>;

  function Done() {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p>Thank you!</p>

          <p>
            Your edits have been posted to the community forum and will go live
            soon!
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            href={`https://forum.hollowverse.com/t/-/${forumPost?.topic_id}/${forumPost?.post_number}`}
            size="small"
            variant="contained"
            className="w-fit bg-blue-500"
          >
            See community forum post
          </Button>

          <Button size="small" onClick={props.onDone}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  function Form() {
    const loading = status === 'loading';
    const form = useForm<SummaryFormFields>({
      defaultValues: {
        religionSummary: props.positions[0]?.summary,
        polvisSummary: props.positions[1]?.summary,
      },
      criteriaMode: 'all',
      reValidateMode: 'onBlur',
      resolver: (formValues) => {
        return {
          values: formValues,
          errors: summaryFormValidate(formValues),
        };
      },
    });

    return (
      <form
        className="flex flex-col gap-7"
        onSubmit={form.handleSubmit(async (data) => {
          const body: SummaryFormPayload = {
            ...data,
            celeb: props.celeb,
          };

          setStatus('loading');

          try {
            const res = await hvApiClient(
              'summary-form-submit',
              post({ ...body }),
            );

            if (res.ok) {
              setForumPost(await res.json());
              setStatus('done');
            } else {
              setStatus('ready');
              const json = await res.json();

              if (json.message) {
                setErrorMessage(json.message);
              } else {
                setErrorMessage(JSON.stringify(json));
              }
            }
          } catch (e) {
            setStatus('ready');
          }
        })}
      >
        <TextField
          {...form.register('religionSummary')}
          multiline
          helperText={`Write a sentence or two summarizing ${props.celeb.name}'s religious views.`}
          label={`${props.celeb.name}'s religion summary`}
          disabled={loading}
          variant="outlined"
        />

        <TextField
          {...form.register('polvisSummary')}
          multiline
          helperText={`Write a sentence or two summarizing ${props.celeb.name}'s political views.`}
          label={`${props.celeb.name}'s political views summary`}
          disabled={loading}
          variant="outlined"
        />

        {!isEmpty(errorMessage) && (
          <Alert severity="error">
            <div className="flex flex-col gap-2 text-neutral-600">
              {errorMessage}
            </div>
          </Alert>
        )}

        {!isEmpty(form.formState.errors) && (
          <Alert severity="error">
            <div className="flex flex-col gap-2 text-neutral-600">
              {values(form.formState.errors).map((v, i) => (
                // @ts-ignore
                <p key={i}>{v}</p>
              ))}
            </div>
          </Alert>
        )}

        <div className="flex gap-3">
          <LoadingButton
            loading={loading}
            type="submit"
            color="secondary"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            className="w-fit bg-blue-500"
          >
            Submit Changes
          </LoadingButton>

          <Button onClick={props.onDone}>Cancel</Button>
        </div>
      </form>
    );
  }
}
