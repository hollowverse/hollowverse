import { RadioGroup } from '@headlessui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '~/lib/Button.ui';
import { Card } from '~/lib/Card.ui';
import { H3 } from '~/lib/H3.ui';
import { Input } from '~/lib/Input.ui';
import { RadioOption } from '~/lib/RadioOption.ui';
import { EditPageProps } from '~/pages/[slug]/edit.page';

export function EditForm(props: EditPageProps) {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState('');

  return (
    <form className="flex flex-col gap-3">
      <Card className="flex flex-col gap-3 p-5">
        <H3>What's {props.celeb.name}'s date of birth?</H3>

        <Input {...register('dob')} type="date" />
      </Card>

      <Card className="flex flex-col gap-3 p-5">
        <H3>Is {props.celeb.name} alive or dead?</H3>

        <RadioGroup
          value={{ name: 'Yes' }}
          onChange={() => null}
          className="flex gap-3"
        >
          <RadioOption value={{ name: 'alive' }}>
            <RadioGroup.Label>Alive</RadioGroup.Label>
          </RadioOption>
          <RadioOption value={{ name: 'deceased' }}>
            <RadioGroup.Label>Dead</RadioGroup.Label>
          </RadioOption>
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
        <Button disabled type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
