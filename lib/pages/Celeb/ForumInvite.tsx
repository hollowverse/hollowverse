import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Card } from '~/lib/pages/components/Card';

type Inputs = {
  forumPost: string;
};

export const getForumInviteLink = (name: string, data: Inputs) => {
  const title = `[${name}] ${data.forumPost.substring(0, 20)}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedBody = encodeURIComponent(data.forumPost);

  const href = `https://discuss.hollowverse.com/new-topic?title=${encodedTitle}&body=${encodedBody}&category=comments`;

  return href;
};

export function ForumInvite(params: { name: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    window.open(getForumInviteLink(params.name, data));
  };

  return (
    <>
      <div className="h-2 w-full bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400" />
      <Card>
        <p className="text-base">
          Hey! Know something about {params.name}&apos;s religion or political
          views? Post it to the forum!
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5">
            <textarea
              placeholder={`What about ${params.name}?`}
              id="celeb-fact"
              rows={3}
              className="block w-full rounded-md border border-gray-500 p-2 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              {...register('forumPost', {
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
            {errors.forumPost && (
              <p className="mt-2 text-base text-red-600">
                {errors.forumPost.message}
              </p>
            )}
          </div>

          <p>
            <input
              className="mt-5 inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-gradient-to-r from-blue-500 to-purple-500 py-2 px-4 text-sm font-bold text-white shadow-sm"
              type="submit"
              value="Go to Forum &amp; Post It"
            />
          </p>
        </form>
      </Card>
    </>
  );
}
