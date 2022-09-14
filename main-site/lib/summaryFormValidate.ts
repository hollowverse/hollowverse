import { isValid } from 'date-fns';
import { parseDate } from '~/lib/date';

function validateDate(date: string) {
  const parsedDate = parseDate(date);

  return isValid(parsedDate);
}

export type EditFormFields = {
  religionSummary: string | null;
  polvisSummary: string;
};

export const editFormFieldDefinitions = {
  religionSummary: {
    validate: (vals: EditFormFields) => {
      if (!vals.religionSummary) {
        return 'Religion summary is required';
      }

      if (vals.religionSummary.length < 10) {
        return 'Religion summary is too short.';
      }

      return null;
    },
  },

  polvisSummary: {
    validate: (vals: EditFormFields) => {
      if (!vals.polvisSummary) {
        return 'Political Views summary is required';
      }

      if (vals.polvisSummary.length < 10) {
        return 'Political Views summary is too short.';
      }

      return null;
    },
  },
} as const;

export function summaryFormValidate(vals: EditFormFields) {
  let errors: { [fieldName: string]: string } = {};

  (Object.keys(vals) as Array<keyof EditFormFields>).forEach((k) => {
    const validationResults = editFormFieldDefinitions[k]?.validate(vals);

    if (validationResults) {
      errors[k] = validationResults;
    }
  });

  return errors;
}
