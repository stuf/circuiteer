import * as P from 'prop-types';
import cx from 'classnames';

import { Icon } from 'components';
import './Button.css';

export function Button(props) {
  const { children, className, label, size, type, icon, ...rest } = props;

  const cns = [
    'button',
    icon && 'button--with-icon',
    type && `button--${type}`,
    size && `button--${size}`,
  ];

  return (
    <button className={cx(...cns)} {...rest}>
      {icon && (
        <span className="__icon-wrapper">
          <Icon className="__icon" name={icon} />
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
