import * as P from 'prop-types';
import cx from 'classnames';

import './Button.css';

export function Button(props) {
  const { children, className, icon: Icon, ...rest } = props;

  const cns = ['button', Icon && 'button--with-icon'];

  return (
    <button className={cx(...cns)} {...rest}>
      {Icon && (
        <span className="__icon-wrapper">
          <Icon className="__icon" />
        </span>
      )}

      {children}
    </button>
  );
}

Button.propTypes = {
  children: P.any,
  className: P.string,
  icon: P.any,
};
