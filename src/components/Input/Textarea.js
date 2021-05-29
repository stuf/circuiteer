import { forwardRef } from 'react';

export const Textarea = forwardRef((props, ref) => {
  const { defaultValue, placeholder, rows, readOnly, disabled } = props;

  return (
    <>
      <textarea
        ref={ref}
        className="input--base input--textarea"
        {...{ defaultValue, placeholder, rows, readOnly, disabled }}
      />
    </>
  );
});
