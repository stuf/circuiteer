import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as L from 'partial.lenses';
import { localPoint } from '@visx/event';
import { ParentSizeModern as ParentSize } from '@visx/responsive';
import { Group } from '@visx/group';

import Grid from './Grid';
import { addEntity } from '../state/editor';
import { resetDrag, setDragging } from '../state/drag';
import { preventDefault } from '../common/util';

const { round } = Math;

const screenToGrid = ([mx, my], [sx, sy]) => [round(sx / mx), round(sy / my)];

const gridToScreen = ([mx, my], [gx, gy]) => [gx * mx, gy * my];

function Canvas() {
  const update = useDispatch();

  const gxy = useSelector(L.get(['grid', 'size']));
  const entities = useSelector(L.get(['editor', 'entities', L.valueOr([])]));
  const isDragging = useSelector(L.get(['drag', 'dragging']));
  const dragPos = useSelector(L.get(['drag', 'pos']));

  /**
   * Currently dragged element's size in grid space
   */
  const currentSize = useSelector(L.get(['drag', 'size']));

  /**
   * Currently dragged element's size in screen space
   */
  const [mdw, mdh] = gridToScreen(gxy, currentSize);

  const [currentPos, setCurrentPos] = useState([0, 0]);

  const pos = useMemo(
    () => ({
      left: dragPos[0],
      top: dragPos[1],
    }),
    [dragPos],
  );

  const setDragOff = () => !isDragging && update(setDragging(false));

  const entityList = useMemo(
    () =>
      entities.map(entity => {
        const [px, py] = gridToScreen(gxy, entity.pos);
        const [w, h] = gridToScreen(gxy, entity.module.size);
        return (
          <Group key={entity.id} left={px} top={py}>
            <rect width={w} height={h} stroke="#f00" />
          </Group>
        );
      }),
    [entities, gxy],
  );

  return (
    <>
      <ParentSize>
        {({ width, height }) => {
          return (
            <>
              <svg
                {...{ width, height }}
                onDragOver={e => {
                  e.preventDefault();
                  const posʼ = Object.values(localPoint(e));
                  const posʼʼ = screenToGrid(gxy, posʼ);
                  const gpos = gridToScreen(gxy, posʼʼ);
                  setCurrentPos(gpos);
                }}
                onDragEnd={setDragOff}
                onDragExit={setDragOff}
                onDrop={e => {
                  const sxy = Object.values(localPoint(e));
                  const pos = screenToGrid(gxy, sxy);
                  const { module } =
                    JSON.parse(e.dataTransfer.getData('application/json')) ??
                    {};

                  setTimeout(() => {
                    update(addEntity({ pos, module }));
                    update(resetDrag());
                  }, 100);
                }}
              >
                <Grid {...{ grid: [32, 32], size: [width, height] }} />

                {isDragging && (
                  <Group left={currentPos[0]} top={currentPos[1]}>
                    <rect
                      width={mdw}
                      height={mdh}
                      stroke="#f00"
                      fill="#0006"
                      strokeWidth={2}
                    />
                  </Group>
                )}

                {entityList}
              </svg>
            </>
          );
        }}
      </ParentSize>
    </>
  );
}

export default Canvas;
