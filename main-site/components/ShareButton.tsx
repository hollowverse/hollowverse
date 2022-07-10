import { MdOutlineIosShare } from 'react-icons/md';
import { c } from '~/lib/c';

export function ShareButton(props: {
  buttonText?: string;
  share?: { text: string; url: string };
  className?: string;
}) {
  return show() ? (
    <button
      className={c('text-blue-500', props.className)}
      onClick={async () => {
        if (show()) {
          try {
            await global.navigator.share(
              props.share || {
                text: document.title,
                url: document.location.href,
              },
            );
          } catch (e) {}
        }
      }}
    >
      <div className="flex items-center justify-center gap-1 border-b border-blue-500">
        {props.buttonText || 'Share this page'}
        <MdOutlineIosShare className="text-lg" />
      </div>
    </button>
  ) : null;
}

export function InBetweenContentShareButton(
  props: Parameters<typeof ShareButton>[0],
) {
  return show() ? (
    <div className="self-center">
      <ShareButton {...props} />
    </div>
  ) : null;
}

function show() {
  return typeof global?.navigator?.share !== 'undefined';
}
