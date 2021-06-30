import clsx from 'clsx';
import * as P from 'prop-types';

export function Checkbox(props) {
  const { id, label, children, checked, onChange, invert } = props;

  return (
    <div className={clsx(!invert ? 'checkbox' : 'checkbox-invert')}>
      <input type="checkbox" {...{ id, checked, onChange }} />
      <label aria-label={children || label} htmlFor={id}>
        {children || label}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  id: P.string.isRequired,
  label: P.string,
  children: P.oneOfType([P.node, P.elementType, P.string]),
  checked: P.bool,
  onChange: P.func.isRequired,
  invert: P.bool,
};
