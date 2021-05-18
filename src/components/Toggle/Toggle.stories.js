import { useState } from 'react';
import { action } from '@storybook/addon-actions';

import { Toggle } from './Toggle';
import { actions } from 'common/util';

export default {
  title: 'UI/Toggle',
  component: Toggle,
};

const Template = ({ onChange, checked, ...args }) => {
  const [state, setState] = useState(args.checked);

  const onChangeFn = actions(action, () => setState(!state));

  return <Toggle {...args} checked={state} onChange={onChangeFn} />;
};

export const Basic = Template.bind({});
Basic.args = {
  label: 'Toggle switch',
  checked: true,
  onChange: action('onChange'),
};
