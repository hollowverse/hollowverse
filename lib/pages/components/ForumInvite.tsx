import React, { ReactNode, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Card } from '~/lib/pages/components/Card';
import { LovelyTopBorder } from '~/lib/pages/components/LovelyTopBorder';
import { Modal } from '~/lib/pages/components/Modal';
import { Spinner } from '~/lib/pages/components/Spinner';

type Inputs = {
  forumPost: string;
};

export const getForumInviteLink = (name: string, data: Inputs) => {
  const title = `[${name}] ${data.forumPost.substring(0, 20)}`;
  const encodedTitle = encodeURIComponent(title);
  const encodedBody = encodeURIComponent(data.forumPost);

  const href = `https://forum.hollowverse.com/new-topic?title=${encodedTitle}&body=${encodedBody}&category=comments`;

  return href;
};

export function ForumInvite(params: { name: string; cta?: ReactNode }) {
  const [showModal, setModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setModal(true);

    setTimeout(() => {
      window.open(getForumInviteLink(params.name, data));
      setModal(false);
    }, 5000);
  };

  return (
    <>
      <Modal isOpen={showModal} className="flex flex-col gap-4 text-center">
        <p className="text-2xl text-gray-700">
          You will be redirected to the forum to post
        </p>
        <p className="text-lg text-gray-500">Redirecting...</p>
        <p className="flex justify-center">
          <Spinner />
        </p>
      </Modal>
      <LovelyTopBorder className="h-2" />

      <Card>
        <p className="text-base">
          {params.cta || (
            <>
              Hey! Know something about {params.name}&apos;s religion or
              political views? Tell us!
            </>
          )}
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5">
            <textarea
              placeholder={`What about ${params.name}?`}
              id="celeb-fact"
              rows={3}
              className="textbox-border block w-full p-2 text-base shadow-sm sm:text-sm"
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
              className="mt-5 inline-flex cursor-pointer justify-center rounded-md bg-gradient-to-r from-blue-500 to-purple-500 py-2 px-4 text-sm font-medium text-white shadow-sm"
              type="submit"
              value="Log-in and post"
            />
          </p>
        </form>
      </Card>
    </>
  );
}
