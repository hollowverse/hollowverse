import { RadioGroup } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '~/lib/Button.ui';
import { Card } from '~/lib/Card.ui';
import { H3 } from '~/lib/H3.ui';
import { Input } from '~/lib/Input.ui';
import { RadioOption } from '~/lib/RadioOption.ui';
import { EditPageProps } from '~/pages/[slug]/edit.page';

export function EditForm(props: EditPageProps) {
  const { register, handleSubmit, setValue, reset, watch } = useForm();
  const radioValue = watch('radio');
  const [data, setData] = useState('');

  useEffect(() => {
    register('radio');
  }, [register]);

  const handleChange = (e: any) => setValue('radio', e);

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit((data_) => setData(JSON.stringify(data_)))}
    >
      <Card className="flex flex-col gap-3 p-5">
        <H3>What's {props.celeb.name}'s date of birth?</H3>

        <Input {...register('dob')} type="date" />
      </Card>

      <Card className="flex flex-col gap-3 p-5">
        <H3>Is {props.celeb.name} alive or dead?</H3>

        <RadioGroup
          value={radioValue}
          onChange={handleChange}
          className="flex gap-3"
        >
          <RadioOption value={'alive'}>Alive</RadioOption>
          <RadioOption value={'dead'}>Dead</RadioOption>
        </RadioGroup>

        <div>
          <label
            htmlFor="dod"
            className="block text-sm font-medium text-gray-700"
          >
            Date {props.celeb.name} passed away
          </label>
          <div className="mt-1">
            <Input {...register('dod')} type="date" name="dod" id="dod" />
          </div>
        </div>
      </Card>

      <div className="flex justify-end p-5">
        <Button type="submit">Submit</Button>
      </div>

      <p>{data}</p>
    </form>
  );
}
