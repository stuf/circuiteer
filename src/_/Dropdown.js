import cx from 'classnames';
import * as P from 'prop-types';
import { Listbox, Transition } from '@headlessui/react';

import css from './Dropdown.module.css';

/**
 * @deprecated
 * @param {*} props
 * @returns
 */
function Dropdown(props) {
  const { label, value, choices, onChange } = props;

  return (
    <Listbox {...{ value, onChange }} as="div" className={cx(css.root)}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Label>{label}</Listbox.Label>

            <Listbox.Button className={css.button}>
              <span className={css.buttonText}>{value.label}</span>
              <span className={css.buttonIconWrap}>
                {/* <SelectorIcon className={css.buttonIcon} aria-hidden="true" /> */}
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              enter={css.enter}
              enterFrom={css.enterFrom}
              enterTo={css.enterTo}
              leave={css.leave}
              leaveFrom={css.leaveFrom}
              leaveTo={css.leaveTo}
            >
              <Listbox.Options static className={css.choices}>
                {choices.map((choice, ix) => (
                  <Listbox.Option
                    key={`choice-${ix}`}
                    value={choice}
                    disabled={choice.unavailable}
                  >
                    {({ active, selected }) => (
                      <>
                        <span
                          className={cx(css.choice, {
                            [css.active]: active,
                            [css.selected]: selected,
                            [css.unavailable]: choice.unavailable,
                          })}
                        >
                          {choice.label}
                        </span>
                        {selected ? (
                          <span className={css.selectedIconWrap}>
                            {/* <CheckIcon
                              aria-hidden="true"
                              className={css.selectedIcon}
                            /> */}
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

Dropdown.propTypes = {
  value: P.shape({
    id: P.string,
    label: P.string,
  }),
  choices: P.arrayOf(
    P.shape({
      id: P.string,
      label: P.string,
    }),
  ),
};

Dropdown.defaultProps = {
  value: {},
  choices: [
    { id: 'one', label: 'One' },
    { id: 'two', label: 'Two', unavailable: true },
    { id: 'three', label: 'Three' },
  ],
};

export default Dropdown;
