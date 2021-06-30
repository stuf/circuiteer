import React from 'react';
import { Flex } from './Flex';

export default {
  title: 'UI/Flex',
  component: Flex,
};

//

const Template = args => <Flex {...args} />;

//

export const Default = Template.bind({});
Template.args = {};
