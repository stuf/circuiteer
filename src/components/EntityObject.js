import { useState, memo } from 'react';
import cx from 'classnames';
import { Group } from '@visx/group';

function EntityObject(props) {
  const { item } = props;
  const { pos, size } = item;
  const [x, y] = pos;
  const [w, h] = size;

  const [state, setState] = useState({ hover: false });
  const setHover = v => () => setState(s => ({ ...s, hover: v }));

  return (
    <Group
      left={x}
      top={y}
      onMouseEnter={setHover(true)}
      onMouseOver={setHover(true)}
      onMouseOut={setHover(false)}
      onMouseLeave={setHover(false)}
    >
      <rect
        width={w}
        height={h}
        className={cx(
          'fill-white',
          item.module.power < 0 && 'stroke-red',
          item.module.power > 0 && 'stroke-green',
          state.hover ? 'stroke-2' : 'stroke-1',
        )}
      />

      <text
        x={w / 2}
        y={h / 2}
        style={{ alignmentBaseline: 'middle', textAnchor: 'middle' }}
        className="text-xs font-bold font-mono"
      >
        {item.module.shortId}
      </text>

      <text
        x={w}
        y={h}
        dx={-5}
        dy={-5}
        style={{
          alignmentBaseline: 'end',
          textAnchor: 'end',
        }}
        className={cx(
          'text-xs',
          'font-mono',
          item.module.power < 0 ? 'stroke-red' : 'stroke-green',
        )}
      >
        {item.module.power}
      </text>
    </Group>
  );
}

export default memo(EntityObject);

//

/**
 * @typedef {object} Props
 */
