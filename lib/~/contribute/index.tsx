import { useRouter } from 'next/router';
import React from 'react';
import { getContributeLink } from '~/lib/components/getContributeLink';
import Head from 'next/head';
import Link from 'next/link';
import { FaHourglass, FaPlusCircle, FaStar, FaUser } from 'react-icons/fa';
import { AppBar } from '~/lib/_app/AppBar/AppBar';

export const Contribute = () => {
  const router = useRouter();
  const name = router.query.name;
  const href = getContributeLink(name as string);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>

      <AppBar />

      <div className="mx-auto flex max-w-5xl flex-col gap-5 py-5 px-5 lg:px-0">
        <h1 className="text-2xl font-bold">Add to {name}&apos;s page</h1>
        <main className="flex flex-col gap-5">
          <div className="flex flex-col gap-2.5 bg-gray-100 p-5">
            <div className="leading-normal">
              To show our appreciation for your contributions, we are offering a
              $25 Amazon® gift card to each of the{' '}
              <strong>3 most active</strong> contributors to Hollowverse.
            </div>

            <div className="leading-normal">
              We are collecting new facts about {name}&apos;s religion,
              politics, and social views. If you know something about {name},
              you can share it by posting on the discussion board. Here&apos;s
              some quick details...
            </div>
          </div>
          <div className="border-l-8 border-blue-300 bg-blue-50 p-2.5">
            <h3 className="mb-2 flex items-baseline gap-1.5 text-xl font-semibold">
              <FaUser className="text-sm" />
              First create an account
            </h3>

            <div className="leading-normal">
              There&apos;s a button at the bottom that will open the Hollowverse
              discussion board. If this is your first time, you will be asked to
              sign-up.
            </div>
          </div>
          <div className="border-l-8 border-blue-300 bg-blue-50 p-2.5">
            <h3 className="mb-2 flex items-baseline gap-1.5 text-xl font-semibold">
              <FaPlusCircle className="text-sm" />
              Then submit a post
            </h3>
            <div className="flex flex-col gap-2.5">
              <div className="leading-normal">
                After you complete the sign-up and verify your email address,
                the text editor will be displayed. That&apos;s where you can
                submit the content.
              </div>

              <div className="leading-normal">
                The text editor will be pre-filled with some information to give
                you a bit more help with the process. When you&apos;re finished,
                submit the post.
              </div>
            </div>
          </div>
          <div className="border-l-8 border-blue-300 bg-blue-50 p-2.5">
            <h3 className="mb-2 flex items-baseline gap-1.5 text-xl font-semibold">
              <FaHourglass className="text-sm" />
              Wait for your post to go live
            </h3>

            <div className="leading-rela leading-normal">
              After you submit the post, a moderator will validate that
              everything looks good then we will publish the information on{' '}
              {name}
              &apos;s page. And we will give you credit for the contribution!
            </div>
          </div>
          <div className="border-l-8 border-blue-300 bg-blue-50 p-2.5">
            <h3 className="mb-2 flex items-baseline gap-1.5 text-xl font-semibold">
              <FaStar className="text-sm" />
              Top contributors receive a gift card
            </h3>

            <div className="leading-rela leading-normal">
              At the end of each month, we tally up contributor posts across all
              pages. The 3 contributors with the most posts receive a $25
              Amazon® gift card each.
            </div>
          </div>

          <div className="leading-normal">
            Thanks for contributing! The thousands of readers that visit
            Hollowverse everyday will appreciate it!
          </div>

          <div className="leading-normal">
            Now you can go to the discussion board to tell us what you know
            about {name}!
          </div>
        </main>
        <section className="">
          <button
            className="rounded-lg border-[3.5px] border-gray-100 bg-gray-100 px-3.5 py-2 focus:border-blue-300 active:bg-gray-200"
            onClick={() => {
              localStorage.setItem('hasReadInstructions', JSON.stringify(true));
              router.push(href);
            }}
          >
            Open discussion board
          </button>
        </section>

        <p>
          If you need more help,{' '}
          <Link href="mailto:hollowverse@hollowverse.com">email us</Link>.
          We&apos;d be happy to hear from you!
        </p>
      </div>
    </>
  );
};
