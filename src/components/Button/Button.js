import * as P from 'prop-types';
import cx from 'classnames';

import { Icon } from 'components/Icon';
import { actions } from 'common/util';
import './Button.css';

export function Button(props) {
  const {
    children,
    className,
    disabled,
    onClick,
    label,
    size,
    type,
    pressed,
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

  const buttonProps = {
    type: 'button',
    className: cx(...cns),
    onClick: actions(onClick),
    disabled,
    'aria-label': label,
    'aria-pressed': pressed,
    'aria-disabled': disabled,
  };

  return (
    <button {...buttonProps} {...rest}>
      {icon && (
        <span className="__icon-wrapper" aria-hidden="true">
          <Icon className="__icon" name={icon} size={iconSize} />
        </span>
      )}

      {children}
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
  pressed: P.bool,
  disabled: P.bool,
};
