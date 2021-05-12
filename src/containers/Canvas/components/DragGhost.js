import { localPoint } from '@visx/event';
import { screenToGrid, gridToScreen } from 'common/util';
import { useEffect, useMemo, useState } from 'react';

/**
 * @param {Props} props
 */
export function DragGhost(props) {
  const { grid, size, svgEl } = props;

  const [state, setState] = useState({ pos: [0, 0], size });

  const elSize = useMemo(() => {
    const sizeʼ = [size[0] * grid[0], size[1] * grid[1]];
    return sizeʼ;
  }, [size, grid]);

  const [width, height] = elSize;

  /**
   * @param {DragEvent} e
   */
  const onMove = e => {
    const p = localPoint(e);
    const xy = screenToGrid(grid, [p.x, p.y]);
    const pos = gridToScreen(grid, [xy[0], xy[1]]);
    setState(s => ({ ...s, pos }));
  };

  useEffect(() => {
    console.log('ON effect');
    console.log({ grid, size, svgEl });
    svgEl.addEventListener('dragover', onMove);

    return () => {
      console.log('OFF effect');
      svgEl.removeEventListener('dragover', onMove);
    };
  }, []); // eslint-disable-line

  return (
    <>
      <rect
        {...{ width, height }}
        x={state.pos[0]}
        y={state.pos[1]}
        className="module-object fill-white stroke-black stroke-2"
      />
    </>
  );
}

/**
 * @typedef {object} Props
 * @prop {SVGSVGElement} svgEl
 * @prop {Size} grid
 * @prop {Size} size
 */
