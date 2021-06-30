import React from 'react';
import { State } from './State';

export default {
  title: 'Canvas/State',
  component: State,
};

//

const Template = args => <State {...args} />;

//

export const Default = Template.bind({});
Default.args = {
  state: {
    action: 'drag',
    id: '123',
    width: 100,
    height: 120,
    x: 20,
    y: 30,
    origin: {
      x: 24,
      y: 31,
    },
  },
};
