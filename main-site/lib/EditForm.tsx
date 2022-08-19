import { RadioGroup } from '@headlessui/react';
import { ExternalLinkIcon } from '@heroicons/react/solid';
import { isEmpty } from 'lodash-es';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Alert from '~/lib/Alert.ui';
import { c } from '~/lib/c';
import { Card } from '~/lib/Card.ui';
import { H3 } from '~/lib/H3.ui';
import { Input } from '~/lib/Input.ui';
import { RadioOption } from '~/lib/RadioOption.ui';
import { EditPageProps } from '~/pages/[slug]/edit.page';
import * as yup from 'yup';
import { EditFormFields, editFormValidate } from '~/lib/editFormValidate';

export function EditForm(props: EditPageProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditFormFields>({
    criteriaMode: 'all',
    reValidateMode: 'onBlur',
    resolver: (values, _context, { names }) => {
      return {
        values,
        errors: editFormValidate(values),
      };
    },
  });
  const pfAlive = watch('alive');
  const [data, setData] = useState('');

  useEffect(() => {
    register('alive');
  }, [register]);

  const handleChange = (e: any) => {
    return setValue('alive', e, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(async (data_) => {
        // const s = yup.object({
        //   livingStatus: yup.bool().required(),
        //   dob: yup.date().required(),
        //   dod: yup.date().when('livingStatus', {
        //     is: true,
        //     then: yup.date().required(),
        //   }),
        // });
        // console.log(await s.validate({ livingStatus: false, dob: '1' }));
        // console.log(JSON.stringify(data_));
      })}
    >
      <Card className="flex flex-col gap-3 p-5">
        <H3>What's {props.celeb.name}'s date of birth?</H3>

        <Input error={!!errors.dod} {...register('dob')} type="date" />

        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(
            `What is ${props.celeb.name}'s date of birth?`,
          )}`}
          target="_blank"
          rel="noreferrer"
          className="h-link flex items-center gap-1 underline"
        >
          <ExternalLinkIcon className="h-5 w-5" /> Google the answer
        </a>
      </Card>

      <Card className="flex flex-col gap-3 p-5">
        <H3>Is {props.celeb.name} still living or passed away?</H3>

        <RadioGroup
          value={pfAlive}
          onChange={handleChange}
          className="flex gap-3"
        >
          <RadioOption value={true}>Still living</RadioOption>
          <RadioOption value={false}>Passed away</RadioOption>
        </RadioGroup>

        {pfAlive === false && (
          <div className="mt-5">
            <label htmlFor="dod" className="block font-medium text-gray-700">
              What date did {props.celeb.name} pass away?
            </label>
            <div className="mt-1">
              <Input
                error={!!errors.dod}
                {...register('dod')}
                type="date"
                name="dod"
                id="dod"
              />
            </div>
          </div>
        )}
      </Card>

      {!isEmpty(errors) && (
        <Alert color="red">
          <div className="flex flex-col gap-2 text-neutral-600">
            {errors.dob && (
              <p>* {props.celeb.name}'s date of birth is missing</p>
            )}

            {errors.alive && (
              <p>* {props.celeb.name}'s living status is missing</p>
            )}

            {errors.dod && (
              <p>* {props.celeb.name}'s date of death is missing</p>
            )}
          </div>
        </Alert>
      )}

      <div className="flex justify-end p-5">
        <button
          className={c(
            'inline-flex justify-center rounded-md border border-transparent bg-purple-600 py-2 px-10 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 default:hover:bg-purple-700',
            { 'opacity-30 hover:bg-purple-600': false },
          )}
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
