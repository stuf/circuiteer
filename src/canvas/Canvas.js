/* eslint-disable */
import { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as L from 'partial.lenses';
import * as R from 'ramda';
import { localPoint } from '@visx/event';
import { PatternLines } from '@visx/pattern';
import { ParentSizeModern as ParentSize } from '@visx/responsive';
import { Group } from '@visx/group';

import { gridToScreen, screenToGrid } from 'common/util';
import { addEntity } from 'state/editor';
import { resetDrag, setDragging } from 'state/drag';

import EntityObject from './_/EntityObject';
import Power from './_/Power';
import Grid from './Grid';
import {
  resetCurrent,
  startEntityMove as startMove,
  stopEntityMove as stopMove,
  moveEntity,
} from '../state/editor';

function Canvas() {
  const update = useDispatch();

  const gxy = useSelector(L.get(['grid', 'size']));
  const entities = useSelector(L.get(['editor', 'entities', L.valueOr([])]));
  const currentEntityId = useSelector(L.get(['editor', 'current']));
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

  let prevmpos = [0, 0];
  /** @param {MouseEvent} e */
  const updateEntityPos = id => e => {
    const p = localPoint(e);
    console.log({ p, e });
    const mxy = Object.values(p);

    const mxy_ = screenToGrid(gxy, mxy);

    if (!R.equals(mxy_, prevmpos)) {
      console.log('location', mxy_);
      update(moveEntity({ id, pos: mxy_ }));
    }

    prevmpos[0] = mxy_[0];
    prevmpos[1] = mxy_[1];

    // console.log('updateEntityPos:', id, mxy_);
  };

  /** @param {MouseEvent} e */
  const startEntityMove = id => e => {
    update(startMove({ id }));
  };

  /** @param {MouseEvent} e */
  const stopEntityMove = id => e => {
    update(stopMove({ id }));
  };

  /**
   * Memoize list of placed structures for rendering
   */
  const entityList = useMemo(
    () =>
      entities.map(entity => {
        if (!entity.module || !Object.keys(entity.module)) {
          console.warn(
            'Entity `%s` is missing its module definition',
            entity.id,
          );
          return <EntityObject.Invalid key={entity.id} />;
        }

        const [px, py] = gridToScreen(gxy, entity.pos);
        const [w, h] = gridToScreen(gxy, entity.module.size);

        return (
          <></>
          // <EntityObject
          //   key={entity.id}
          //   object={entity}
          //   width={w}
          //   height={h}
          //   left={px}
          //   top={py}
          //   onMoveStart={startEntityMove(entity.id)}
          //   onMoveStop={stopEntityMove(entity.id)}
          //   onMove={updateEntityPos(entity.id)}
          // />
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
                onClick={e => {
                  if (currentEntityId) update(resetCurrent());
                }}
              >
                <PatternLines
                  id="diagonal"
                  width={10}
                  height={10}
                  orientation={['diagonal']}
                  stroke="#000"
                  strokeWidth={3}
                />

                <Grid {...{ grid: gxy, size: [width, height] }} />

                {entityList}

                {isDragging && (
                  <Group left={currentPos[0]} top={currentPos[1]}>
                    <rect
                      width={mdw}
                      height={mdh}
                      className="module-object stroke-2 stroke-black stroke-opacity-50 fill-white fill-opacity-50 stroke-dash-even"
                    />
                  </Group>
                )}

                <Power />
              </svg>
            </>
          );
        }}
      </ParentSize>
    </>
  );
}

export default Canvas;
