import { useState, useMemo, memo } from 'react';
import * as L from 'partial.lenses';

import { PatternCircles } from '@visx/pattern';
import { ParentSizeModern as ParentSize } from '@visx/responsive';
import { localPoint } from '@visx/event';

import { useSnappingGrid } from './canvas/hooks';
// import Crosshair from './Crosshair';
// import EntityObject from './EntityObject';
import CanvasContent from './CanvasContent';
import { modules } from '../config';

const scalePair = ([p1, p2], [m1, m2]) => {
  const [r1, r2] = [p1 * m1, p2 * m2];
  return [r1, r2];
};

const dividePair = ([a1, a2], [b1, b2]) => {
  const r = [a1 / b1, a2 / b2];
  return r;
};

const gridToScreen = ([gw, gh]) => ([gx, gy]) => scalePair([gx, gy], [gw, gh]);
const screenToGrid = ([gw, gh]) => ([sx, sy]) =>
  dividePair([sx, sy], [gw, gh]).map(n => Math.round(n));

/**
 * @param {Props} props
 */
function Canvas(props) {
  const { entities = [], gridSize = [4, 4] } = props;
  const [gw, gh] = gridSize;

  // eslint-disable-next-line
  const [state, setState] = useState({
    moving: false,
    dragging: false,
    drag: { size: [0, 0], pos: [0, 0] },
  });

  const setMoving = () => setState(s => ({ ...s, moving: true }));
  const setNotMoving = () => setState(s => ({ ...s, moving: false }));
  // const setDragging = () => setState(L.set('dragging', true));
  // const setNotDragging = () => setState(L.set('dragging', false));
  const setDraggingPos = ([px, py]) =>
    setState(L.set(['drag', 'pos'], [px, py]));
  // const setDraggingSize = ([w, h]) => setState(L.set(['drag', 'size'], [w, h]));

  const [grid, updateGrid] = useSnappingGrid(gw, gh);

  const entities_ = useMemo(() => {
    const result = L.transform(
      [
        L.elems,
        L.seq(
          L.modifyOp(it => L.set('module', modules[it.type], it)),
          L.modifyOp(it =>
            L.set(
              L.props('pos', 'size'),
              {
                pos: scalePair(it.pos, gridSize),
                size: scalePair(it.module.size, gridSize),
              },
              it,
            ),
          ),
        ),
      ],
      entities,
    );

    return result;
  }, [entities, gridSize]);

  return (
    <>
      <ParentSize className="relative z-0">
        {parent => {
          const svgProps = { width: parent.width, height: parent.height };
          return (
            <>
              {/* Background grid */}
              <svg {...svgProps} className="absolute z-0">
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
              </svg>
              {/* Crosshair */}
              <svg
                {...{ width: parent.width, height: parent.height }}
                onDragOver={e => {
                  e.preventDefault();
                  const gridPos = screenToGrid(Object.values(localPoint(e)));
                  setDraggingPos(gridPos);
                }}
                onDrop={e => {
                  const [mx, my] = Object.values(localPoint(e));

                  const gridPos = dividePair([mx, my], [gw, gh]).map(p =>
                    Math.round(p),
                  );
                  const screenPos = gridToScreen([gw, gh])(gridPos);
                }}
                className="absolute z-10"
                onMouseOver={setMoving}
                onMouseEnter={setMoving}
                onMouseOut={setNotMoving}
                onMouseLeave={setNotMoving}
                onMouseMove={updateGrid}
              >
                <CanvasContent entities={entities_} />
              </svg>
            </>
          );
        }}
      </ParentSize>
    </>
  );
}

export default memo(Canvas, (a, b) => a.entities.length !== b.entities.length);

//

/**
 * @typedef {object} Props
 * @prop {IEntityObject[]} entities
 */
