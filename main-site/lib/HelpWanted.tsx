import { FaRegEdit } from 'react-icons/fa';
import Alert from '~/lib/Alert.ui';
import { Card } from '~/lib/Card.ui';
import { Link } from '~/lib/Link';
import Image from 'next/image';

export function HelpWanted(props: { pfName: string; slug: string }) {
  return (
    <Alert color="yellow">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-3">
          <p className="font-bold">Dear friend,</p>

          <p>I need your help.</p>

          <p>
            Do you have a moment to help me update {props.pfName}'s information?
            It's very easy!
          </p>

          <p>
            <Link href={`/${props.slug}/edit`} passHref>
              <a className="flex w-fit items-center gap-3 rounded-md border border-blue-600 bg-blue-500 py-1 px-5 text-white">
                Edit {props.pfName}&apos;s page{' '}
                <FaRegEdit className="h-4 w-4" />
              </a>
            </Link>
          </p>

          <p>Thank you very much!</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-[55px] w-[55px] overflow-hidden rounded-full border border-gray-300">
            <Image
              objectFit="cover"
              width={55}
              height={55}
              alt="Picture"
              src="/images/my-pic.jpeg"
            />
          </div>

          <div className="font-bold text-neutral-500">
            <p className="">M.K. Safi</p>
            <p className="">Founder</p>
            <a
              href="mailto:hollowverse@hollowverse.com"
              className="font-normal underline"
            >
              hollowverse@hollowverse.com
            </a>
          </div>
        </div>
      </div>
    </Alert>
  );
}
