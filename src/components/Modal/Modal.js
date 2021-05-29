import * as P from 'prop-types';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import cns from 'classnames';

import { modal } from 'common/motion';

import './Modal.css';

export function Modal(props) {
  const { open, className, children, title, description } = props;

  const [isOpen, setIsOpen] = useState(open);

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
      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            open={isOpen}
            as={motion.div}
            onClose={() => setIsOpen(false)}
            className={cns(classNames.root)}
          >
            <div className="flex items-center justify-center min-h-screen">
              <Dialog.Overlay className={cns(classNames.overlay)} />

              <motion.div
                variants={modal}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.25 }}
                className={cns(classNames.modal)}
              >
                <Dialog.Title className={cns(classNames.title)}>
                  {title}
                </Dialog.Title>

                {description && (
                  <Dialog.Description>{description}</Dialog.Description>
                )}

                <div>{children}</div>
              </motion.div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}

Modal.propTypes = {
  open: P.bool,
  className: P.string,
  children: P.oneOfType([P.node, P.elementType, P.string]),
  title: P.string,
  description: P.string,
};
