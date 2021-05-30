import * as P from 'prop-types';
import cx from 'classnames';

import { actions } from 'common/util';

export function Dropdown(props) {
  const { value, onChange, choices, disabled } = props;

  return (
    <div
      className={cx(
        'relative shadow-md rounded-md border-2 bg-white',
        !disabled ? `hover:shadow-lg` : '',
        disabled ? `opacity-50` : '',
      )}
    >
      <span className="absolute inset-y-0 right-2 inline-flex items-center">
        {/* <UnfoldMore className="w-5 h-5" /> */}
      </span>
      <select
        className={`px-4 py-2 appearance-none block w-full bg-transparent`}
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
  );
}

Dropdown.propTypes = {
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
