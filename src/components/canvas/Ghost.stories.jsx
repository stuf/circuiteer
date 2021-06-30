import React from 'react';
import { Ghost } from './Ghost';

export default {
  title: 'Canvas/Ghost',
  component: Ghost,
};

//

const Template = args => <Ghost {...args} />;

//

export const Default = Template.bind({});
Default.args = {
  pos: { x: 20, y: 20 },
  size: { width: 100, height: 100 },
  id: 'rtg',
};
