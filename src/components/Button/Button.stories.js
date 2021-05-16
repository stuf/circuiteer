import { Button } from './Button';

export default {
  title: 'UI/Button',
  component: Button,
};

const Template = args => <Button {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: 'text',
};
