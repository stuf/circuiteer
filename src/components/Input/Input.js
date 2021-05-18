import * as P from 'prop-types';

import { actions } from 'common/util';

export function Input(props) {
  const { value, disabled, onChange, placeholder } = props;

  return (
    <div>
      <input
        className="input--base"
        {...{
          defaultValue: value,
          disabled,
          onChange: actions(onChange),
          placeholder,
        }}
      />
    </div>
  );
}

Input.propTypes = {
  value: P.any,
  disabled: P.bool,
  onChange: P.func,
  placeholder: P.string,
};
