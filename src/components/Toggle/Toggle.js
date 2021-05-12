import { Switch } from '@headlessui/react';
import cx from 'classnames';
import { actions } from 'common/util';

import './Toggle.css';

export function Toggle(props) {
  const { label, className, checked, onChange } = props;

  const cns = {
    root: ['toggle', 'toggle--root', checked && 'toggle--checked'],
    switch: ['toggle__switch'],
    tick: ['toggle__tick'],
  };

  return (
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
  );
}
