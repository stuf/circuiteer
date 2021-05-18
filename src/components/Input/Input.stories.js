import { Input } from './Input';

export default {
  title: 'UI/Input',
  component: Input,
  argTypes: {
    value: {
      type: 'string',
    },
  },
};

const Template = args => <Input {...args} />;

export const Basic = Template.bind({});
Basic.args = {};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: 'Placeholder text',
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  type: 'number',
};

export const SearchInput = Template.bind({});
SearchInput.args = {
  type: 'search',
};
