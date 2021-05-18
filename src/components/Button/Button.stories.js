import { Button } from './Button';

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    label: {
      type: 'string',
    },
    icon: {
      type: 'string',
    },
  },
};

const Template = args => <Button {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  label: 'Regular button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary',
  type: 'secondary',
};

export const Small = Template.bind({});
Small.args = {
  label: 'Small',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  label: 'Large',
  size: 'lg',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  disabled: true,
};
