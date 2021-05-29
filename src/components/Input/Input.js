import { forwardRef } from 'react';
import * as P from 'prop-types';

import { actions } from 'common/util';
import { Textarea } from './Textarea';

export const Input = forwardRef((props, ref) => {
  const {
    value,
    readOnly,
    type,
    label,
    disabled,
    onChange,
    placeholder,
    rows,
    className,
  } = props;

  const inputProps = {
    defaultValue: value,
    disabled,
    onChange: actions(onChange),
    placeholder,
    readOnly,
    ref,
  };

  if (type === 'textarea') {
    return (
      <div className={className}>
        {label && <label className="block mb-1">{label}</label>}

        <Textarea {...inputProps} rows={rows} />
      </div>
    );
  }

  return (
    <div className={className}>
      {label && <label className="block mb-1">{label}</label>}

      <input
        className="input--base"
        {...{
          ...inputProps,
          type,
        }}
      />
    </div>
  );
});

Input.propTypes = {
  value: P.any,
  type: P.oneOf(['text', 'number', 'search', 'textarea']),
  disabled: P.bool,
  onChange: P.func,
  placeholder: P.string,
};
