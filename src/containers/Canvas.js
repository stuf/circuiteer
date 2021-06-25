/**
 * @todo Add some a11y considerations to UI elements
 */
import clsx from 'clsx';
import * as L from 'partial.lenses';
import React, { useCallback, useState, useMemo, useRef } from 'react';
import { withParentSizeModern } from '@visx/responsive';
import { inspect } from 'util';

import { euclideanDistance } from 'common/util';
import { getLogger } from 'common/logger';
import { AutosizeUnderlay, Entity } from 'components/canvas';

const logger = getLogger('canvas');

/**
 *
 * @param {import('./Canvas').Props} props
 */
export function Canvas(props) {
  const { objects, options, flags, currentlyAdding } = props;

  const {
    minimumDragDistance = 10,
    onDragStart,
    onDragMove,
    onDragStop,
    onCommitObject,
  } = options || {};

  const entityActions = useMemo(
    () => props.options?.entityActions,
    [props.options?.entityActions],
  );

  const currentObj = useRef(null);

  const [state, setState] = useState({
    dragging: null,
    adding: currentlyAdding,
    current: null,
    objects,
  });

  // #region Dragging handlers

  const dragStart = useCallback(
    e => {
      if (flags.isAddingNew) {
        const newPos = { x: e.clientX, y: e.clientY };
        logger.log(
          'info',
          "adding a new element, don't do the dragging thing ",
        );
        console.log('currently adding =>', currentlyAdding, newPos);
        const newObj = {
          pos: newPos,
          entity: currentlyAdding.entity,
        };

        onCommitObject(newObj);
      }

      const id = e.target.getAttribute('id');
      if (!id) return;

      const obj = state.objects.find(o => o.id === id);
      currentObj.current = obj;

      logger.log(
        'info',
        'start drag for object `%s` from (%s, %s)',
        id,
        obj.pos.x,
        obj.pos.y,
      );

      setState(
        L.set(L.pick({ pos: ['dragging'], current: 'current' }), {
          pos: {
            from: obj.pos,
            to: obj.pos,
            size: obj.entity?.size,
            overThreshold: false,
          },
          current: id,
        }),
      );

      if (onDragStart) {
        onDragStart(e, currentObj.current);
      }
    },
    [
      state.objects,
      onDragStart,
      currentlyAdding,
      onCommitObject,
      flags.isAddingNew,
    ],
  );

  const dragMove = useCallback(
    e => {
      if (state.dragging === null) return;

      const pxRatio = window.devicePixelRatio;
      const { movementX: dx, movementY: dy } = e;
      const x = dx / pxRatio + state.dragging.to.x;
      const y = dy / pxRatio + state.dragging.to.y;

      const origin = state.dragging.from;
      const draggedDistance = euclideanDistance(origin, { x, y });
      const overThreshold = draggedDistance >= minimumDragDistance;

      setState(
        L.transform(
          L.seq([
            'dragging',
            L.seq(
              ['to', L.setOp({ x, y })],
              ['distance', L.setOp(draggedDistance)],
              ['overThreshold', L.setOp(overThreshold)],
            ),
          ]),
        ),
      );

      if (onDragMove) {
        onDragMove(e, currentObj.current);
      }
    },
    [state.dragging, minimumDragDistance, onDragMove],
  );

  const dragStop = useCallback(
    e => {
      if (state.dragging === null) return;

      const oldPos = L.get('from', state.dragging);
      const newPos = L.get('to', state.dragging);

      currentObj.current = L.set('pos', newPos, currentObj.current);
      const { id, pos } = L.get(L.props('id', 'pos'), currentObj.current);

      logger.log(
        'info',
        'stop drag for object `%s` (%s, %s) to (%s, %s)',
        id,
        oldPos.x,
        oldPos.y,
        newPos.x,
        newPos.y,
      );

      setState(
        L.transform(
          L.seq(
            ['dragging', L.setOp(null)],
            ['current', L.setOp(null)],
            ['objects', L.find(o => o.id === id), 'pos', L.setOp(pos)],
          ),
        ),
      );

      if (onDragStop) {
        onDragStop(e, currentObj.current);
      }

      currentObj.current = null;
    },
    [state.dragging, onDragStop],
  );

  // #endregion

  const children = useMemo(
    () =>
      objects.map((o, i) => {
        const { id, pos } = o;
        // console.log('o', o);

        if (!o.entity?.size) {
          return null;
        }
        const size = o.entity.size;
        const style = {
          ...size,
          transform: `translateX(${pos.x}px) translateY(${pos.y}px)`,
        };

        return (
          <div key={id} id={id} className={clsx('canvas__card')} style={style}>
            <Entity object={o} actions={entityActions} />
          </div>
        );
      }),
    [objects, entityActions],
  );

  const ghostStyle = useMemo(
    () => ({
      width: state.dragging?.size?.width,
      height: state.dragging?.size?.height,
      transform: `translateX(${state.dragging?.to?.x}px) translateY(${state.dragging?.to?.y}px)`,
    }),
    [state.dragging?.size, state.dragging?.to],
  );

  return (
    <>
      <div
        className={clsx('canvas', flags.isAddingNew && 'canvas--adding-new')}
        {...{
          onMouseDownCapture: dragStart,
          onMouseMove: dragMove,
          onMouseUp: dragStop,
        }}
      >
        {children}
      </div>

      {/* Dragging placeholder for element being dragged */}
      {state.dragging && (
        <div className="canvas__card-ghost absolute" style={ghostStyle} />
      )}

      {/* Dev placeholder */}
      <div
        className="canvas-debug absolute top-right text-01"
        style={{ width: 300 }}
      >
        <fieldset>
          <legend>State</legend>
          <div>
            <pre>{inspect(state, { colors: false, depth: Infinity })}</pre>
          </div>
        </fieldset>
      </div>

      <AutosizeUnderlay isAddingNew={flags.isAddingNew} />
    </>
  );
}

export const AutosizeCanvas = withParentSizeModern(Canvas);
