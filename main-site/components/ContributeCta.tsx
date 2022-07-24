import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  body: string;
  tags: string;
  source: string;
};

export const getContributeCtaLink = (name: string, data: Inputs) => {
  const title = `[${name}] ${data.body.substring(0, 80)}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedBody = encodeURIComponent(data.body);
  const href = `https://forum.hollowverse.com/new-topic?title=${encodedTitle}&body=${encodedBody}&category=comments`;

  return href;
};

export function ContributeCta(params: { name: string; cta?: ReactNode }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    router.push(getContributeCtaLink(params.name, data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      noValidate
    >
      <div className="flex flex-col gap-1">
        <textarea
          placeholder={`On twitter ${params.name} posted...In an interview ${params.name} said...${params.name} threw a fund raiser for X politician...etc`}
          id="contribute-body"
          rows={3}
          className="textbox-border block w-full border border-gray-400 p-2 text-base shadow-inner focus:-m-[1px]"
          {...register('body', {
            required: {
              message: 'Can you write something first?',
              value: true,
            },
            minLength: {
              value: 10,
              message: 'You wrote very little. Can you expand?',
            },
          })}
        />

        {errors.body && (
          <p className="text-base text-red-700">{errors.body.message}</p>
        )}
      </div>

      <div>
        <input
          type="submit"
          className="cursor-pointer justify-center rounded-sm bg-gradient-to-r from-blue-500 to-purple-500 py-2 px-4 text-sm font-medium text-white shadow-md transition hover:hue-rotate-15 active:hue-rotate-30"
          value="Log-in and send tip"
        />
      </div>
    </form>
  );
}
