import React from 'react';
import { action } from '@storybook/addon-actions';

import { Entity } from './Entity';

export default {
  title: 'Canvas/Entity',
  component: Entity,
};

//

const Template = args => <Entity {...args} />;

//

export const Default = Template.bind({});
Default.args = {
  object: {
    entity: {
      id: 'rtg',
      width: 100,
      height: 100,
      power: 4,
      powerType: 'constant',
    },
  },
  onDelete: action('onDelete'),
};
