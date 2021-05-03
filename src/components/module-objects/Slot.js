import { Group } from '@visx/group';

const Socket = () => <div />;

const Connector = () => <div />;

function Slot(props) {
  return (
    <Group>
      <Socket />
      <Socket />
    </Group>
  );
}

export default Slot;
