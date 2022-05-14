import React, { ReactNode, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Card } from '~/lib/pages/components/Card';
import { LovelyTopBorder } from '~/lib/pages/components/LovelyTopBorder';
import { Modal } from '~/lib/pages/components/Modal';
import { c } from '~/lib/pages/utils/c';

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
      setModal(false);
      // window.open(getForumInviteLink(params.name, data));
    }, 3000);
  };

  return (
    <>
      <Modal isOpen={showModal} className="flex flex-col gap-4 text-center">
        <p className="text-2xl text-gray-700">
          You will be redirected to the forum to post
        </p>
        <p className="text-lg text-gray-500">Redirecting...</p>
        <p className="flex justify-center">
          <svg
            role="status"
            className="mr-2 h-8 w-8 animate-spin fill-purple-500 text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
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
