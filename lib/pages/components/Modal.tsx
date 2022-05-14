import ReactModal from 'react-modal';
import React from 'react';
import { c } from '~/lib/pages/utils/c';

ReactModal.setAppElement('#__next');

export function Modal(params: ReactModal.Props) {
  const { className, isOpen, ...rest } = params;

  return (
    <ReactModal
      isOpen={isOpen}
      closeTimeoutMS={250}
      overlayClassName={{
        base: 'fixed inset-0 bg-black/50 flex justify-center items-start lg:items-center opacity-0',
        afterOpen: isOpen ? 'opacity-100 transition duration-300' : '',
        beforeClose: isOpen ? '' : 'opacity-0 transition duration-300',
      }}
      className={{
        base: c(
          'absolute ml-3 mr-3 mt-10 overflow-auto rounded-md border border-gray-200 bg-white px-5 py-10 opacity-0 outline-none lg:mt-0',
          className,
        ),
        afterOpen: isOpen ? 'opacity-100 transition duration-500' : '',
        beforeClose: isOpen ? '' : 'opacity-0 transition duration-300',
      }}
      {...rest}
    />
  );
}
