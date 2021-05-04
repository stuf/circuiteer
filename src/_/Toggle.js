import { Switch } from '@headlessui/react';

function Toggle(props) {
  const { label, checked, onChange } = props;

  return (
    <div className="flex items-center">
      <Switch
        {...{ checked, onChange }}
        className={`${
          checked ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex items-center h-6 rounded-full w-11`}
      >
        <span className="sr-only">{label}</span>

        <span
          className={`${
            checked ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform bg-white rounded-full`}
        ></span>
      </Switch>

      <div className="ml-2">{label}</div>
    </div>
  );
}

export default Toggle;
