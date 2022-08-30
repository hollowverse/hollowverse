import { RadioGroup } from '@headlessui/react';
import { c } from '~/lib/c';

export { RadioGroup } from '@headlessui/react';

export function RadioOption(props: Parameters<typeof RadioGroup.Option>[0]) {
  return (
    <RadioGroup.Option
      {...props}
      className={({ active, checked }) => {
        return c(
          'cursor-pointer shadow-sm focus:outline-none',
          active ? 'ring-2 ring-purple-600 ring-offset-2' : '',
          checked
            ? 'border-transparent bg-purple-700 text-white hover:bg-purple-800'
            : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
          'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium',
          props.className,
        );
      }}
    />
  );
}
