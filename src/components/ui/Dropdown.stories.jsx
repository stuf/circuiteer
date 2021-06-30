import React from 'react';
import { action } from '@storybook/addon-actions';

import { Dropdown } from './Dropdown';

export default {
  title: 'UI/Dropdown',
  component: Dropdown,
  args: {
    onChange: action('onChange'),
  },
};

//

const Template = args => <Dropdown {...args} />;

//

export const Default = Template.bind({});
Default.args = {
  choices: [
    { id: 1, label: 'One' },
    { id: 2, label: 'Two' },
  ],

  renderChoice: ({ item, i }) => <option key={i}>{item.label}</option>,
};
