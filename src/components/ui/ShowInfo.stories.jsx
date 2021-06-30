import React from 'react';
import { ShowInfo } from './ShowInfo';

export default {
  title: 'UI/ShowInfo',
  component: ShowInfo,
};

//

const Template = args => <ShowInfo {...args} />;

//

export const Default = Template.bind({});
Default.args = {
  label: 'labell',
  content: 'contentt',
};

export const Narrow = Template.bind({});
Narrow.args = {
  label: 'Label name',
  content: 'Content name',
  narrow: true,
};
