import * as P from 'prop-types';
import { Switch } from '@headlessui/react';
import cx from 'classnames';

export default function Toggle(props) {
  const { label, checked, onChange, className } = props;

  return (
    <div className={cx('flex items-center', className)}>
      <Switch
        {...{
          checked,
          onChange,
        }}
        className={`${
          checked ? 'bg-purple-600' : 'bg-gray-200'
        } relative inline-flex items-center h-6 rounded-full w-11`}
      >
        <span className="sr-only">{label}</span>

        <span
          className={`${
            checked ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform bg-white rounded-full transition duration-75 ease-out`}
        ></span>
      </Switch>

      <div className="ml-2">{label}</div>
    </div>
  );
}

Toggle.propTypes = {
  label: P.string,
  checked: P.bool,
  onChange: P.func,
};
