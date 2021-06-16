import * as P from 'prop-types';
import cx from 'classnames';

import { actions } from 'common/util';
import { Icon } from '../Icon';

export function Dropdown(props) {
  const { label, id, value, onChange, choices, disabled, className } = props;

  return (
    <>
      {label && (
        <label
          className="block mb-1"
          htmlFor={`input-${id}`}
          id={`label-${id}`}
        >
          {label}
        </label>
      )}
      <div
        className={cx(
          className,
          'relative shadow-md rounded-md border-2 bg-white',
          !disabled ? `hover:shadow-lg` : '',
          disabled ? `opacity-50` : '',
        )}
      >
        <span
          className="absolute inset-y-0 right-2 inline-flex items-center"
          aria-hidden="true"
        >
          <Icon name="unfold_more" />
        </span>

        <select
          className={`px-4 py-2 pr-10 appearance-none block w-full bg-transparent`}
          value={value}
          onChange={actions(onChange)}
          disabled={disabled}
        >
          {choices.map((choice, ix) => (
            <option key={ix} value={choice.value}>
              {choice.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

Dropdown.propTypes = {
  id: P.string.isRequired,
  value: P.any,
  choices: P.arrayOf(
    P.shape({
      value: P.any,
      label: P.string,
    }),
  ).isRequired,
  onChange: P.func,
};

Dropdown.defaultProps = {
  choices: [],
};
