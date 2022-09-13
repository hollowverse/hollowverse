import { Alert, TextField } from '@mui/material';
import { CelebPageMainProps } from '~/lib/celebPageMain.getStaticProps';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';
import { isEmpty, values } from 'lodash-es';
import { summaryFormValidate } from '~/lib/summaryFormValidate';
import { hvApiClient, post } from '~/lib/hvApiClient';

type SummaryFormFields = {
  religionSummary: string;
  polvisSummary: string;
};

export type SummaryFormPayload = {
  celeb: CelebPageMainProps['celeb'];
} & SummaryFormFields;

export default function SummaryForm(props: CelebPageMainProps) {
  const form = useForm<SummaryFormFields>({
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
    <div>
      <form
        className="flex flex-col gap-7"
        onSubmit={form.handleSubmit(async (data) => {
          const body: SummaryFormPayload = {
            ...data,
            celeb: props.celeb,
          };

          await hvApiClient('summary-form-submit', post(body));
        })}
      >
        <TextField
          {...form.register('religionSummary')}
          multiline
          defaultValue={props.positions[0].summary}
          helperText={`Write a sentence or two summarizing ${props.celeb.name}'s religious views.`}
          label={`${props.celeb.name}'s religion summary`}
          disabled={false}
          variant="outlined"
        />

        <TextField
          {...form.register('polvisSummary')}
          multiline
          defaultValue={props.positions[1].summary}
          helperText={`Write a sentence or two summarizing ${props.celeb.name}'s political views.`}
          label={`${props.celeb.name}'s political views summary`}
          disabled={false}
          variant="outlined"
        />

        {!isEmpty(form.formState.errors) && (
          <div>
            <Alert severity="error">
              <div className="flex flex-col gap-2 text-neutral-600">
                {values(form.formState.errors).map((v, i) => (
                  // @ts-ignore
                  <p key={i}>{v}</p>
                ))}
              </div>
            </Alert>
          </div>
        )}

        <LoadingButton
          loading={false}
          type="submit"
          color="secondary"
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
          className="w-fit bg-blue-500"
        >
          Submit Changes
        </LoadingButton>
      </form>
    </div>
  );
}
