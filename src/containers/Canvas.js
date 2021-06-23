import clsx from 'clsx';
import * as L from 'partial.lenses';
import React, { useCallback, useState, useMemo, useRef } from 'react';
import { withParentSizeModern } from '@visx/responsive';
import { inspect } from 'util';

import { euclideanDistance } from 'common/util';

export function Canvas(props) {
  const { width, height, objects, options } = props;

  const {
    minimumDragDistance = 10,
    onDragStart,
    onDragMove,
    onDragStop,
  } = options ?? {};

  const currentObj = useRef(null);

  const [state, setState] = useState({
    dragging: null,
    current: null,
    objects,
  });

  const distance = useMemo(() => {
    if (!state.dragging) return;

    return euclideanDistance(state.dragging.from, state.dragging.to);
  }, [state.dragging]);

  // #region Dragging handlers

  const dragStart = useCallback(
    e => {
      const id = e.target.getAttribute('id');
      if (!id) return;

      console.log('drag start', id);

      const obj = state.objects.find(o => o.id === id);
      currentObj.current = obj;

      setState(
        L.set(L.pick({ pos: ['dragging'], current: 'current' }), {
          pos: { from: obj.pos, to: obj.pos, size: obj.size },
          current: id,
        }),
      );

      if (onDragStart) {
        onDragStart(e, currentObj.current);
      }
    },
    [state.objects, onDragStart],
  );

  const dragMove = useCallback(
    e => {
      if (state.dragging === null) return;

      const { movementX: dx, movementY: dy } = e;
      const x = dx + state.dragging.to.x;
      const y = dy + state.dragging.to.y;

      setState(L.transform(['dragging', 'to', L.setOp({ x, y })]));

      if (onDragMove) {
        onDragMove(e, currentObj.current);
      }
    },
    [state.dragging, onDragMove],
  );

  const dragStop = useCallback(
    e => {
      if (state.dragging === null) return;

      console.log('drag stop');
      const newPos = L.get('to', state.dragging);

      currentObj.current = L.set('pos', newPos, currentObj.current);
      const { id, pos } = L.get(L.props('id', 'pos'), currentObj.current);

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
      state.objects.map((o, i) => {
        const { id, pos, size } = o;
        const style = {
          ...size,
          transform: `translateX(${pos.x}px) translateY(${pos.y}px)`,
        };

        return (
          <div key={id} id={id} className={clsx('canvas__card')} style={style}>
            {JSON.stringify(o)}
          </div>
        );
      }),
    [state.objects],
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
        className="canvas"
        {...{
          onMouseDown: dragStart,
          onMouseMove: dragMove,
          onMouseUp: dragStop,
        }}
      >
        {children}
      </div>

      {state.dragging && (
        <div className="canvas__card-ghost absolute" style={ghostStyle}>
          asd
        </div>
      )}

      <div className="absolute top-right">
        <fieldset>
          <legend>Dragging</legend>

          <div>
            <dl className="pairs">
              <dt>Distance</dt>
              <dd>{distance}</dd>
            </dl>
          </div>
        </fieldset>
        <fieldset>
          <legend>State</legend>
          <div>
            <pre>{inspect(state, { colors: false, depth: Infinity })}</pre>
          </div>
        </fieldset>
      </div>
    </>
  );
}

export const AutosizeCanvas = withParentSizeModern(Canvas);
