import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, Transition } from '@headlessui/react';

import { Button } from 'components';
import './Modal.css';

export function Modal(props) {
  const { open = false, title, children } = props;

  const { t } = useTranslation();
  const [state, setState] = useState({ open });

  const closeModal = () => setState(s => ({ ...s, open: false }));
  const openModal = () => setState(s => ({ ...s, open: true })); // eslint-disable-line

  const transition = {
    enter: 'ease-out duration-300',
    enterFrom: 'opacity-0',
    enterTo: 'opacity-100',
    leave: 'ease-in duration-200',
    leaveFrom: 'opacity-100',
    leaveTo: 'opacity-0',
  };

  const transitionBody = {
    enter: 'ease-out duration-300',
    enterFrom: 'opacity-0 scale-95',
    enterTo: 'opacity-100 scale-100',
    leave: 'ease-in duration-200',
    leaveFrom: 'opacity-100 scale-100',
    leaveTo: 'opacity-0 scale-95',
  };

  return (
    <>
      <div>
        <Transition appear show={state.open} as={Fragment}>
          <Dialog
            as="div"
            open={state.open}
            onClose={closeModal}
            className="modal--rtoot fixed inset-0 z-10 overflow-y-auto"
          >
            <div className="modal__body min-h-screen px-4 text-center">
              <Transition.Child {...transition}>
                <Dialog.Overlay className="modal__overlay fixed inset-0 bg-purple-500 bg-opacity-50" />
              </Transition.Child>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <Transition.Child as={Fragment} {...transitionBody}>
                <div className="modal__content">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>

                  <div className="modal__content-body">
                    <p>{children}</p>
                  </div>

                  <div className="mt-4">
                    <Button onClick={closeModal}>
                      {t('common:modal.close')}
                    </Button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}
