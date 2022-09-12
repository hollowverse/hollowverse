import { TextField } from '@mui/material';
import { CelebPageMainProps } from '~/lib/celebPageMain.getStaticProps';

export default function EditSummary(props: CelebPageMainProps) {
  return (
    <div>
      <div className="flex flex-col gap-7">
        {/* <h3 className="font-semibold">Religion</h3> */}
        <TextField
          multiline
          value={props.positions[0].summary}
          helperText={`Write a sentence or two summarizing ${props.celeb.name}'s religious views.`}
          label={`${props.celeb.name}'s religion summary`}
          variant="outlined"
        />

        <TextField
          multiline
          value={props.positions[1].summary}
          helperText={`Write a sentence or two summarizing ${props.celeb.name}'s political views.`}
          label={`${props.celeb.name}'s political views summary`}
          variant="outlined"
        />
      </div>
    </div>
  );
}
