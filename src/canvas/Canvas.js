import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as L from 'partial.lenses';
import { localPoint } from '@visx/event';
import { ParentSizeModern as ParentSize } from '@visx/responsive';
import { Group } from '@visx/group';

import { addEntity } from 'state/editor';
import { resetDrag, setDragging } from 'state/drag';

import EntityObjectList from './_/EntityObjectList';
import Grid from './Grid';

const { round } = Math;

const screenToGrid = ([mx, my], [sx, sy]) => [round(sx / mx), round(sy / my)];

const gridToScreen = ([mx, my], [gx, gy]) => [gx * mx, gy * my];

function Canvas() {
  const update = useDispatch();

  const gxy = useSelector(L.get(['grid', 'size']));
  const entities = useSelector(L.get(['editor', 'entities', L.valueOr([])]));
  const isDragging = useSelector(L.get(['drag', 'dragging']));

  /**
   * Currently dragged element's size in grid space
   */
  const currentSize = useSelector(L.get(['drag', 'size']));

  /**
   * Currently dragged element's size in screen space
   */
  const [mdw, mdh] = gridToScreen(gxy, currentSize);

  const [currentPos, setCurrentPos] = useState([0, 0]);

  const setDragOff = () => !isDragging && update(setDragging(false));

  /**
   * Memoize list of placed structures for rendering
   */
  const entityList = useMemo(
    () =>
      entities.map(entity => {
        const [px, py] = gridToScreen(gxy, entity.pos);
        const [w, h] = gridToScreen(gxy, entity.module.size);
        return (
          <Group key={entity.id} left={px} top={py}>
            <rect
              width={w}
              height={h}
              className="stroke-red stroke-2 fill-white module-object"
            />
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
                <Grid {...{ grid: gxy, size: [width, height] }} />

                {entityList}

                <EntityObjectList />

                {isDragging && (
                  <Group left={currentPos[0]} top={currentPos[1]}>
                    <rect
                      width={mdw}
                      height={mdh}
                      className="module-object stroke-2 stroke-black stroke-opacity-50 fill-white fill-opacity-50 stroke-dash-even"
                    />
                  </Group>
                )}
              </svg>
            </>
          );
        }}
      </ParentSize>
    </>
  );
}

export default Canvas;
