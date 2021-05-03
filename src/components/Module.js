import { useState } from 'react';
import { Group } from '@visx/group';
import cx from 'classnames';

const Plug = ({ x, y, r = 5 }) => (
  <circle cx={x} cy={y} r={r} stroke="#f00" fill="#00f" />
);

function Module(props) {
  const { item } = props;
  const { pos, size } = item;
  const [px, py] = pos;
  const [w, h] = size;

  const [state, setState] = useState({ dragging: false });

  const setDragging = v => setState(s => ({ ...s, dragging: v }));
  const setDragOn = () => setDragging(true);
  const setDragOff = () => setDragging(false);

  const classes = {
    root: ['text-green-500 stroke-current', state.dragging && 'text-red-500'],
  };

  return (
    <Group
      left={px}
      top={py}
      className={cx(classes.root)}
      onMouseDown={setDragOn}
      onMouseUp={setDragOff}
    >
      {/* Normal medium platform */}
      <rect width={w} height={h} className="stroke-current fill-white" />

      <Plug x={w / 2} y={0} />
      <Plug x={0} y={h / 2} />
      <Plug x={w / 2} y={h} />
      <Plug x={w} y={h / 2} />
    </Group>
  );
}

export default Module;
