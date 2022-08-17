/* This example requires Tailwind CSS v2.0+ */
import { ExclamationIcon, XCircleIcon, XIcon } from '@heroicons/react/solid';
import { MouseEventHandler, PropsWithChildren, ReactNode } from 'react';
import { c } from '~/lib/c';

export default function Alert(
  props: PropsWithChildren<{
    onDismiss?: MouseEventHandler<HTMLButtonElement>;
    color: 'yellow' | 'red';
  }>,
) {
  const { Icon, colors } = getColors();

  return (
    <div className={c('mx-2 rounded-md p-4', colors[0])}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={c('h-5 w-5', colors[1])} aria-hidden="true" />
        </div>

        <div className="ml-3">{props.children}</div>

        {props.onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={props.onDismiss}
                type="button"
                className={c(
                  'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                  colors[2],
                )}
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  function getColors() {
    if (props.color === 'red') {
      return {
        Icon: XCircleIcon,
        colors: [
          'bg-red-50',
          'text-red-400',
          'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50',
        ],
      } as const;
    }

    return {
      Icon: ExclamationIcon,
      colors: [
        'bg-yellow-50',
        'text-yellow-400',
        'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50',
      ],
    } as const;
  }
}
