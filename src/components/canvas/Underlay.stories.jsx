import React from 'react';
import { Underlay } from './Underlay';

export default {
  title: 'Canvas/Underlay',
  component: Underlay,
};

//

const Template = args => <Underlay {...args} />;

//

export const Default = Template.bind({});
Default.args = {
  width: 600,
  height: 400,
  pos: {
    x: 120,
    y: 150,
  },
};
