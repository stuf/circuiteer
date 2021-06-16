import * as P from 'prop-types';
import { Dialog } from '@headlessui/react';
import cns from 'classnames';

import './Modal.css';

export function Modal(props) {
  const { open, className, children, title, description, onClose } = props;

  const classNames = {
    root: ['fixed', 'z-10', 'inset-0', 'overflow-y-auto'],
    overlay: ['fixed', 'inset-0', 'bg-black opacity-30'],
    modal: [
      'modal__body',
      'bg-white',
      'z-10',
      'rounded-lg',
      'max-w-sm',
      'mx-auto',
      'px-6 py-4',
      'space-y-2',
      'shadow-xl',
      className,
    ],
    title: ['text-xl', 'mb-4', 'font-bold'],
  };

  return (
    <>
      <Dialog open={open} className={cns(classNames.root)} onClose={onClose}>
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className={cns(classNames.overlay)} />

          <div className={cns(classNames.modal)}>
            <Dialog.Title className={cns(classNames.title)}>
              {title}
            </Dialog.Title>

            {description && (
              <Dialog.Description>{description}</Dialog.Description>
            )}

            <div className="space-y-2">{children}</div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

Modal.propTypes = {
  open: P.bool,
  className: P.string,
  children: P.oneOfType([P.node, P.elementType, P.string]),
  title: P.string,
  description: P.string,
  onClose: P.func.isRequired,
};
