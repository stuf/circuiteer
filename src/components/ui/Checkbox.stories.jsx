import React from 'react';
import { action } from '@storybook/addon-actions';

import { Checkbox } from './Checkbox';

export default {
  title: 'UI/Checkbox',
  component: Checkbox,
  args: {
    onChange: action('onChange'),
  },
};

//

const Template = args => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 'checkbox',
  label: 'Label',
  invert: true,
  onChange: action('onChange'),
};
