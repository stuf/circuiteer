import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import cx from 'classnames';

import css from './Options.module.css';

const items = [
  {
    label: 'peepee',
    action: () => {},
  },
  {
    label: 'poopoo 123',
    action: () => {},
  },
];

function Options(props) {
  return (
    <>
      <Menu as="div" className={css.menu}>
        {({ open }) => (
          <>
            <Menu.Button className={css.menuButton}>
              Options
              <ChevronDownIcon
                className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>

            <Transition
              show={open}
              as={Fragment}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items
                static
                className={cx(
                  css.menuItems,
                  'bg-white',
                  'divide-y',
                  'shadow-lg',
                  'ring-1',
                  'ring-black',
                  'rounded-md',
                  'ring-opacity-5',
                  'focus:outline-none',
                )}
              >
                <div className="px-1 py-1">
                  {items.map((item, i) => (
                    <Menu.Item key={`options-${i}`}>
                      {({ active }) => (
                        <button
                          className={cx(
                            css.menuItem,
                            active && css.activeMenuItem,
                          )}
                        >
                          {item.label}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
}

export default Options;
