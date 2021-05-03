import { useState } from 'react';

import { PatternCircles } from '@visx/pattern';
import { ParentSizeModern as ParentSize } from '@visx/responsive';

import { useSnappingGrid } from './canvas/hooks';
import Crosshair from './Crosshair';
import EntityObject from './EntityObject';
import { modules } from '../config';

const scalePair = ([p1, p2], [m1, m2]) => {
  const [r1, r2] = [p1 * m1, p2 * m2];
  return [r1, r2];
};

/**
 * @param {Props} props
 */
function Canvas(props) {
  const { entities = [], gridSize = [4, 4] } = props;
  const [gw, gh] = gridSize;

  // eslint-disable-next-line
  const [state, setState] = useState({ moving: false });

  const setMoving = () => setState(s => ({ ...s, moving: true }));
  const setNotMoving = () => setState(s => ({ ...s, moving: false }));

  const [grid, updateGrid] = useSnappingGrid(gw, gh);

  return (
    <>
      <div className="absolute left-2 bottom-2 text-xs p-2 border border-black border-opacity-20 bg-white shadow-lg">
        <pre>{JSON.stringify({ grid }, null, 2)}</pre>
      </div>
      <ParentSize>
        {parent => {
          return (
            <svg
              {...{ width: parent.width, height: parent.height }}
              className="flex-1"
              onMouseOver={setMoving}
              onMouseEnter={setMoving}
              onMouseOut={setNotMoving}
              onMouseLeave={setNotMoving}
              onMouseMove={updateGrid}
            >
              <PatternCircles
                id="grid"
                width={gw}
                height={gh}
                radius={2}
                className="fill-none stroke-black"
              />

              <rect
                x={0}
                y={0}
                width={parent.width}
                height={parent.height}
                fill="url(#grid)"
                opacity="0.5"
              />

              {entities
                .map(item => {
                  return {
                    ...item,
                    pos: scalePair(item.pos, gridSize),
                    size: scalePair(item.size, gridSize),
                    module: modules[item.type],
                  };
                })
                .map((item, ix) => (
                  <EntityObject key={`module-${ix}`} item={item} />
                ))}

              <Crosshair {...{ grid, parent }} />
            </svg>
          );
        }}
      </ParentSize>
    </>
  );
}

export default Canvas;

//

/**
 * @typedef {object} Props
 * @prop {IEntityObject[]} entities
 */
