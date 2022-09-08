import { Alert, Avatar } from '@mui/material';
import { FaInfoCircle, FaRegEdit } from 'react-icons/fa';
import { CelebPageMainProps } from '~/lib/celebPageMain.getStaticProps';
import { Article } from './Article';
import { InterestingProfiles } from './InterestingProfiles';

export function Wiki(props: CelebPageMainProps) {
  console.log('props.wiki.avatar', props.wiki.avatar);
  return (
    <section className="flex flex-col gap-5">
      <Article {...props} />

      <div className="px-1">
        <Alert severity="info">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p>
                This wiki was last updated on{' '}
                <span className="underline">{props.wiki.date}</span> by:
              </p>

              <div className="flex items-center gap-3">
                <Avatar
                  alt={props.wiki.name}
                  src={`https://forum.hollowverse.com/${props.wiki.avatar.replace(
                    '{size}',
                    '90',
                  )}`}
                />
                <p className="text-md font-bold">{props.wiki.name}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p>Today we're opening contributions to all readers.</p>

              <p>
                <span className="underline">We invite you</span> and ask you to
                help us update this wiki by editing it.
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <a
                  href={props.celeb.wiki!}
                  className="flex items-center gap-2 rounded-md bg-blue-500 py-2 px-5 text-white shadow-md"
                  title="asdf"
                >
                  <FaRegEdit /> Edit this wiki
                </a>

                <a
                  href="https://forum.hollowverse.com/t/how-to-edit-or-create-a-wiki/7333"
                  className="flex items-center gap-2 rounded-md border border-blue-400 px-5 py-2 shadow-sm"
                >
                  <FaInfoCircle />
                  How to edit this wiki
                </a>
              </div>
            </div>
          </div>
        </Alert>
      </div>

      <InterestingProfiles {...props} />
    </section>
  );
}
