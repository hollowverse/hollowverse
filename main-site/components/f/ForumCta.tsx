import { FcVoicePresentation } from 'react-icons/fc';
import { Card } from '~/components/c/Card';

export function ForumCta(props: { message?: string | null }) {
  const message = props.message ?? 'What are your political views and beliefs?';

  return (
    <div className="flex flex-col gap-2.5">
      <h2 className="scale-y-110 px-5 text-xl font-semibold">Discussion</h2>

      <Card className="flex flex-col gap-3 p-5 text-neutral-600">
        <p className="text-lg font-semibold">{message}</p>

        <p>
          <a
            href="https://forum.hollowverse.com"
            className="h-link flex w-fit items-center gap-2 rounded-md border p-2 px-4 font-semibold shadow-sm"
          >
            <FcVoicePresentation className="text-2xl" /> Join the Forum
          </a>
        </p>
      </Card>
    </div>
  );
}
