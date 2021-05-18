import { Marker } from './Marker';

export default {
  title: 'UI/Marker',
  component: Marker,
  argTypes: {
    text: {
      type: 'string',
    },
    pattern: {
      type: 'string',
    },
  },
};

const Template = ({ text, pattern, highlight }) => (
  <Marker
    text={text}
    pattern={new RegExp(pattern, 'i')}
    highlight={highlight}
  />
);

export const Basic = Template.bind({});
Basic.args = {
  text: 'text to search from',
  pattern: 'search',
  highlight: true,
};
