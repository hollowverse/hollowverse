import { Alert, TextField } from '@mui/material';
import { CelebPageMainProps } from '~/lib/celebPageMain.getStaticProps';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useForm } from 'react-hook-form';
import { isEmpty, values } from 'lodash-es';
import { editSummaryValidate } from '~/lib/editSummaryValidate';

type EditSummaryFields = {
  religionSummary: string;
  polvisSummary: string;
};

export default function EditSummary(props: CelebPageMainProps) {
  const form = useForm<EditSummaryFields>({
    criteriaMode: 'all',
    reValidateMode: 'onBlur',
    resolver: (formValues) => {
      return {
        values: formValues,
        errors: editSummaryValidate(formValues),
      };
    },
  });

  return (
    <div>
      <form
        className="flex flex-col gap-7"
        onSubmit={form.handleSubmit(async (data) => {
          console.log(data);
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
