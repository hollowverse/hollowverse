import { RadioGroup } from '@headlessui/react';
import { isEmpty } from 'lodash-es';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Alert from '~/lib/Alert.ui';
import { Button } from '~/lib/Button.ui';
import { Card } from '~/lib/Card.ui';
import { H3 } from '~/lib/H3.ui';
import { Input } from '~/lib/Input.ui';
import { RadioOption } from '~/lib/RadioOption.ui';
import { EditPageProps } from '~/pages/[slug]/edit.page';

export function EditForm(props: EditPageProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const pfAlive = watch('alive');
  const [data, setData] = useState('');

  useEffect(() => {
    register('alive', { validate: (val) => val !== undefined });
  }, [register]);

  const handleChange = (e: any) => {
    console.log('e', e);
    return setValue('alive', e, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit((data_) => setData(JSON.stringify(data_)))}
    >
      <Card className="flex flex-col gap-3 p-5">
        <H3>What's {props.celeb.name}'s date of birth?</H3>

        <Input
          error={!!errors.dod}
          {...register('dob', { required: true })}
          type="date"
        />
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
                {...register('dod', {
                  validate: (val) => (pfAlive ? true : !!val),
                })}
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
              <p>
                * The answer to {props.celeb.name}'s date of birth wasn't given
              </p>
            )}

            {errors.alive && (
              <p>
                * The answer about {props.celeb.name}'s living status wasn't
                given
              </p>
            )}

            {errors.dod && (
              <p>The answer to {props.celeb.name} date of death wasn't given</p>
            )}
          </div>
        </Alert>
      )}

      <div className="flex justify-end p-5">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
