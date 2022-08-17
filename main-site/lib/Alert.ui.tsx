/* This example requires Tailwind CSS v2.0+ */
import { ExclamationIcon, XIcon } from '@heroicons/react/solid';
import { MouseEventHandler, ReactNode } from 'react';

export default function Alert(props: {
  body: ReactNode;
  onDismiss?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>

        <div className="ml-3">{props.body}</div>

        {props.onDismiss && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                onClick={props.onDismiss}
                type="button"
                className="inline-flex rounded-md bg-yellow-50 p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
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
}
