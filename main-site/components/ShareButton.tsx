import { useState } from 'react';
import { MdCheck, MdOutlineIosShare } from 'react-icons/md';
import { c } from '~/lib/c';

export function ShareButton(props: {
  buttonText?: string;
  share?: { text: string; url: string };
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      className={c('text-blue-500', props.className)}
      onClick={async () => {
        try {
          if (typeof global?.navigator?.share !== 'undefined') {
            await global.navigator.share(
              props.share || {
                text: document.title,
                url: document.location.href,
              },
            );
          } else {
            await global.navigator.clipboard.writeText(
              props.share?.url || document.location.href,
            );

            setCopied(true);
          }
        } catch (e) {}
      }}
    >
      <div
        className={c('flex items-center justify-center gap-1', {
          'border-b border-blue-500': !copied,
        })}
      >
        {getButtonText()}

        {copied ? (
          <MdCheck className="text-lg" />
        ) : (
          <MdOutlineIosShare className="text-lg" />
        )}
      </div>
    </button>
  );

  function getButtonText() {
    if (copied) {
      return 'Link copied to clipboard';
    }

    return props.buttonText || 'Share this page';
  }
}

export function InBetweenContentShareButton(
  props: Parameters<typeof ShareButton>[0],
) {
  return (
    <div className="self-center">
      <ShareButton {...props} />
    </div>
  );
}
