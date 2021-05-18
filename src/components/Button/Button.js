import * as P from 'prop-types';
import cx from 'classnames';

import './Button.css';

export function Button(props) {
  const { children, className, label, size, type, icon: Icon, ...rest } = props;

  const cns = [
    'button',
    Icon && 'button--with-icon',
    type && `button--${type}`,
    size && `button--${size}`,
  ];

  return (
    <button className={cx(...cns)} {...rest}>
      {Icon && (
        <span className="__icon-wrapper">
          <Icon className="__icon" />
        </span>
      )}

      {label || children}
    </button>
  );
}

Button.propTypes = {
  className: P.string,
  icon: P.any,
  label: P.oneOfType([P.string, P.node, P.elementType]),
  type: P.oneOf(['primary', 'secondary']),
  size: P.oneOf(['sm', 'md', 'lg']),
};
