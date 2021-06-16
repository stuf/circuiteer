import { forwardRef } from 'react';
import * as P from 'prop-types';

import { actions } from 'common/util';
import { Textarea } from './Textarea';

export const Input = forwardRef((props, ref) => {
  const {
    id,
    value,
    readOnly,
    type,
    label,
    disabled,
    onChange,
    placeholder,
    rows,
    className,
    required,
  } = props;

  const inputProps = {
    id,
    defaultValue: value,
    disabled,
    onChange: actions(onChange),
    placeholder,
    readOnly,
    ref,
    required,
  };

  if (type === 'textarea') {
    return (
      <div className={className}>
        {label && (
          <label className="block mb-1" id={`label-${id}`}>
            {label}
          </label>
        )}

        <Textarea {...inputProps} rows={rows} aria-labelledby={`label-${id}`} />
      </div>
    );
  }

  return (
    <div className={className}>
      {label && (
        <label
          className="block mb-1"
          htmlFor={`input-${id}`}
          id={`label-${id}`}
        >
          {label}
        </label>
      )}

      <input
        className="input--base"
        id={`input-${id}`}
        aria-labelledby={`label-${id}`}
        {...{
          ...inputProps,
          type,
        }}
      />
    </div>
  );
});

Input.propTypes = {
  id: P.string.isRequired,
  value: P.any,
  type: P.oneOf(['text', 'number', 'search', 'textarea']),
  disabled: P.bool,
  onChange: P.func,
  placeholder: P.string,
};
