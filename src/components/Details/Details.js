import * as P from 'prop-types';
import { Disclosure, Transition } from '@headlessui/react';
import cx from 'classnames';

import { Icon } from 'components/Icon';
import './Details.css';

export function Details(props) {
  const { open: isOpen, head, children, className } = props;

  return (
    <div className={cx('mx-auto bg-white rounded-md', className)}>
      <Disclosure className={cx('details details--root')} defaultOpen={isOpen}>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={cx(
                'flex items-center justify-between w-full px-4 py-2 rounded-md',
                'bg-purple-500',
                'text-white',
                'focus:outline-none',
                'focus-visible:ring',
                'focus-visible:ring-purple-500',
                'focus-visible:ring-opacity-75',
              )}
            >
              <span>
                {head} {isOpen}
              </span>

              <Icon
                name="chevron_right"
                aria-hidden="true"
                className={cx(
                  open && 'transform rotate-90',
                  'w-5 h-5 text-white',
                  'transition-transform duration-200 ease-out',
                )}
              />
            </Disclosure.Button>

            <Transition
              show={open}
              className="mt-2"
              enter="details--enter"
              enterFrom="details--enter-from"
              enterTo="details--enter-to"
              leave="details--leave"
              leaveFrom="details--leave-from"
              leaveTo="details--leave-to"
            >
              <Disclosure.Panel static>{children}</Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}

Details.propTypes = {
  open: P.bool,
  head: P.oneOfType([P.string, P.node, P.elementType]),
  className: P.string,
  children: P.oneOfType([P.string, P.node, P.elementType]),
};
