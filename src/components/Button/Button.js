import * as P from 'prop-types';
import cx from 'classnames';

import { Icon } from 'components/Icon';
import { actions } from 'common/util';
import './Button.css';

export function Button(props) {
  const {
    children,
    className,
    onClick,
    label,
    size,
    type,
    icon,
    iconSize = 20,
    ...rest
  } = props;

  const cns = [
    'button',
    icon && 'button--with-icon',
    type && `button--${type}`,
    size && `button--${size}`,
    className,
  ];

  return (
    <button className={cx(...cns)} onClick={actions(onClick)} {...rest}>
      {icon && (
        <span className="__icon-wrapper">
          <Icon className="__icon" name={icon} size={iconSize} />
        </span>
      )}

      {label || children}
    </button>
  );
}

Button.propTypes = {
  className: P.string,
  onClick: P.func.isRequired,
  icon: P.string,
  iconSize: P.number,
  label: P.oneOfType([P.string, P.node, P.elementType]),
  type: P.oneOf(['primary', 'secondary']),
  size: P.oneOf(['sm', 'md', 'lg']),
};
