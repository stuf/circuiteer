import { action } from '@storybook/addon-actions';

import { Dropdown } from './Dropdown';

export default {
  title: 'UI/Dropdown',
  component: Dropdown,
  argTypes: {},
};

const Template = ({ onChange, ...args }) => {
  return <Dropdown {...args} onChange={action('onChange')} />;
};

export const Basic = Template.bind({});
Basic.args = {
  value: 1,
  choices: [
    { value: 1, label: 'One' },
    { value: 2, label: 'Two' },
    { value: 3, label: 'Three' },
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
