import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Card } from '~/lib/pages/components/Card';

type Inputs = {
  body: string;
  tags: string;
  source: string;
};

export const getContributeCtaLink = (name: string, data: Inputs) => {
  const title = `[${name}] ${data.body.substring(0, 20)}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedBody = encodeURIComponent(`${data.body}

Tags: ${data.tags || 'none'}

Source: ${data.source}`);

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
    <Card title="Contribute to Hollowverse">
      <p className="text-base">
        {params.cta || (
          <div className="flex flex-col gap-2 text-base">
            <p>Hey! 👋</p>
            <p>
              Did you see anything recently about {params.name}&apos;s religion
              or political views? Send us a tip!
            </p>
            <p>
              <Link
                passHref
                href="https://forum.hollowverse.com/t/how-to-contribute-to-hollowverse/1929"
              >
                <a className="h-link text-sm">
                  Learn more about how to contribute!
                </a>
              </Link>
            </p>
          </div>
        )}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex flex-col gap-4"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="contribute-body"
            className="block text-base font-medium text-neutral-500"
          >
            A quote or action by {params.name}
          </label>
          <textarea
            placeholder={`On twitter ${params.name} posted...In an interview ${params.name} said...${params.name} threw a fund raiser for X politician...etc`}
            id="contribute-body"
            rows={3}
            className="textbox-border block w-full p-2 text-base shadow-sm"
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
            <p className="text-base text-red-600">{errors.body.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="block text-base font-medium text-neutral-500"
            htmlFor="contribute-url"
          >
            A link to the source
          </label>

          <input
            className="textbox-border block w-full p-2 text-base shadow-sm"
            placeholder={`instagram.com, cnbc.com, youtube.com, twitter.com, etc`}
            type="url"
            id="contribute-url"
            {...register('source', {
              required: {
                message: 'Can you provide a link to the source?',
                value: true,
              },
              pattern: {
                value:
                  /https?:\/\/(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
                message: "Your link doesn't look right!",
              },
            })}
          />

          {errors.source && (
            <p className="text-base text-red-600">{errors.source.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="block text-base font-medium text-neutral-500"
            htmlFor="contribute-tags"
          >
            Tags
          </label>

          <input
            className="textbox-border block w-full p-2 text-base shadow-sm"
            placeholder="Democrat, Republican, Supports Biden, Pro Small Government, etc"
            type="text"
            id="contribute-tags"
            {...register('tags', {
              required: {
                message: 'Can you think of a tag or two?',
                value: true,
              },
              minLength: {
                message: 'Your tag is too short!',
                value: 3,
              },
            })}
          />

          {errors.tags && (
            <p className="text-base text-red-600">{errors.tags.message}</p>
          )}
        </div>

        <p>
          <input
            type="submit"
            className="mt-5 inline-flex cursor-pointer justify-center rounded-md bg-gradient-to-r from-blue-500 to-purple-500 py-2 px-4 text-sm font-medium text-white shadow-sm transition hover:hue-rotate-15 active:hue-rotate-30"
            value="Log-in and post"
          />
        </p>
      </form>
    </Card>
  );
}
