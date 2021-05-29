import * as P from 'prop-types';
import { Switch } from '@headlessui/react';
import cx from 'classnames';
import { actions } from 'common/util';

import './Toggle.css';

export function Toggle(props) {
  const { label, className, checked, disabled, onChange, help } = props;

  const cns = {
    wrap: ['toggle--wrap'],
    root: [
      'toggle',
      'toggle--root',
      checked && 'toggle--checked',
      disabled && 'toggle--disabled',
    ],
    switch: ['toggle__switch'],
    tick: ['toggle__tick'],
    help: [
      'toggle__help',
      'pl-12 ml-1 text-sm block',
      !disabled ? 'text-gray-500' : 'text-gray-300',
    ],
  };

  return (
    <div className={cx(cns.wrap)}>
      <div className={cx(cns.root, className, 'group')}>
        <Switch
          {...{ checked, onChange: actions(onChange) }}
          className={`
        toggle__switch
        ${checked ? 'bg-purple-600' : 'bg-gray-200'}
      `}
        >
          <span className="sr-only">{label}</span>

          <span className={`toggle__tick`}></span>
        </Switch>

        <span className="toggle__label">{label}</span>
      </div>

      {help && <div className={cx(cns.help)}>{help}</div>}
    </div>
  );
}

Toggle.propTypes = {
  label: P.string,
  className: P.string,
  checked: P.bool,
  onChange: P.func,
  help: P.oneOfType([P.node, P.elementType, P.string]),
};
