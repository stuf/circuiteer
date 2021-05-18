import { Modal } from './Modal';

export default {
  title: 'UI/Modal',
  component: Modal,
  argTypes: {
    title: {
      type: 'string',
    },
    children: {
      type: 'string',
    },
  },
};

const Template = ({ children, ...args }) => {
  return (
    <>
      <Modal {...args}>{children}</Modal>
    </>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  open: true,
  title: 'Modal title',
  children: 'Modal contents come here.',
  footer: (...args) => (
    <div className="flex justify-between">
      <button className="px-4 py-2 bg-red-500 text-white rounded-lg">No</button>
      <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
        Yes
      </button>
    </div>
  ),
};
