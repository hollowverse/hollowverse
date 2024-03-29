import { RadioGroup } from '@headlessui/react';
import { ExternalLinkIcon } from '@heroicons/react/solid';
import { isEmpty } from 'lodash-es';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import { Accordion } from '~/lib/Accordion.ui';
import Alert from '~/lib/Alert.ui';
import { c } from '~/lib/c';
import { Card } from '~/lib/Card.ui';
import { EditFormFields, editFormValidate } from '~/lib/editFormValidate';
import { H3 } from '~/lib/H3.ui';
import { hvApiClient, post } from '~/lib/hvApiClient';
import { Input } from '~/lib/Input.ui';
import { RadioOption } from '~/lib/RadioOption.ui';
import { useHvApi } from '~/lib/useHvApi';
import { EditPageProps } from '~/pages/[slug]/edit.page';

export function EditForm(props: EditPageProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
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
  const currentEdit = useHvApi(`edit?id=${props.celeb._id}`);

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
        await hvApiClient<any>(`submit-edit`, post(data_))!;
      })}
    >
      <input type="hidden" {...register('id')} value={props.celeb._id} />
      <input
        type="hidden"
        {...register('knowledgeGraphId')}
        value={props.celeb.knowledgeGraphId}
      />

      <Card className="flex flex-col gap-8 p-5">
        {renderBasicInfo()}
        {renderReligion()}
        <div>
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
        </div>
      </Card>
    </form>
  );

  function renderBasicInfo() {
    return (
      <div>
        <h2 className="text-2xl">Basic info</h2>

        <div className="flex flex-col gap-3">
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
        </div>

        <div className="flex flex-col gap-3">
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
        </div>

        {!isEmpty(errors) && (
          <div>
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
          </div>
        )}
      </div>
    );
  }

  function renderReligion() {
    return (
      <div>
        <h2 className="text-2xl">Religion</h2>

        <div>
          <H3>What religion is {props.celeb.name}?</H3>
          <p>
            Is {props.celeb.name} Christian, Jewish, Atheist, Agnostic, Muslim,
            Hindu, etc? Feel free to get specific. For example, "Protestant" or
            "Catholic", or even "Evangelical" are good answers. Same goes for
            branches of other religions or beliefs.
          </p>

          <Input
            type="text"
            placeholder="Christian, Agnostic, Sikh, Sunni, etc"
          />

          <H3>Summarize {props.celeb.name}'s beliefs</H3>

          <p>
            In your own words, summarize {props.celeb.name}'s religious beliefs.
            One or two sentences would suffice. For example...
          </p>

          <p>
            {props.celeb.name} is a lifelong Christian, grew up in a Christian
            household, and continues to pray and go to church
          </p>
        </div>
      </div>
    );
  }
}
