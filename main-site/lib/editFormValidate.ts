import { isValid } from 'date-fns';
import { parseDate } from '~/lib/date';

/*
(values, _context, { names }) => {
      return {
        values,
        errors: {
          dob: { message: 'needed' },
          dod: { message: 'needed' },
          alive: null,
        },
      };
    }
    */

function validateDate(date: string) {
  const parsedDate = parseDate(date);

  return isValid(parsedDate);
}

export type EditFormFields = {
  dob: string | null;
  dod: string | null;
  alive: boolean | null;
};

export const editFormFieldDefinitions = {
  dob: {
    validate: (vals: EditFormFields) => {
      if (!vals.dob) {
        return 'date of birth is required';
      }

      if (!validateDate(vals.dob)) {
        return 'date of birth is invalid';
      }

      return null;
    },
  },
  dod: {
    validate: (vals: EditFormFields) => {
      if (vals.alive) {
        return null;
      }

      if (!vals.dod) {
        return 'date of death is required';
      }

      if (!validateDate(vals.dod)) {
        return 'date of death is invalid';
      }

      return null;
    },
  },

  alive: {
    validate: (vals: EditFormFields) => {
      if (vals.alive !== true && vals.alive !== false) {
        return 'living status is required';
      }

      return null;
    },
  },
} as const;

export function editFormValidate(vals: EditFormFields) {
  let errors: any = {};

  (Object.keys(vals) as Array<keyof EditFormFields>).forEach((k) => {
    const validationResults = editFormFieldDefinitions[k].validate(vals);

    if (validationResults) {
      errors[k] = validationResults;
    }
  });

  return errors;
}
