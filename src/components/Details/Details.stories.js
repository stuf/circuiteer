import React from 'react';
import { Details } from './Details';

export default {
  title: 'UI/Details',
  component: Details,
  argTypes: {
    head: {
      type: 'string',
    },
    children: {
      type: null,
    },
  },
};

const Template = args => <Details {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  head: 'Basic details element',
  children: (
    <>
      <div>
        The words category and functor were borrowed by mathematicians from the
        philosophers Aristotle and Rudolf Carnap, respectively.
      </div>
    </>
  ),
};
