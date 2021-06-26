import * as L from 'partial.lenses';
import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { withParentSizeModern } from '@visx/responsive';

import { Point } from 'common/algebra';
import { getLogger } from 'common/logger';
import { getCanvasObjectStyle } from 'common/canvas';
import { useUsageObjectThings } from 'common/hooks/derived';

import { AutosizeUnderlay, Entity, Ghost, State } from 'components/canvas';

import { updateObject } from 'state/objects';
import { show } from 'common/util';

const logger = getLogger('CanvasElement');

/**
 * Current "mouse mode" of the canvas
 */
const Action = {
  /**
   * Default, no action happening
   */
  NONE: null,
  /**
   * Dragging an existing element
   */
  DRAG: 'drag',
  /**
   * Adding a new element onto the canvas
   */
  ADD_NEW: 'addNew',
};

const posL = L.props('x', 'y');
const sizeL = L.props('width', 'height');

const stateL = L.pickIn({
  action: L.define(Action.NONE),
  id: L.define(null),
  x: L.define(0),
  y: L.define(0),
  width: L.define(0),
  height: L.define(0),
  origin: [L.props('x', 'y')],
});

const posIn = L.get(posL);
const sizeIn = L.get(sizeL);
const stateIn = L.get(stateL);

export function CanvasElement(props) {
  const width = props.parentWidth ?? props.width;
  const height = props.parentHeight ?? props.height;
  const update = useDispatch();

  const objects = useUsageObjectThings();
  const objectList = useMemo(
    () => Object.values(objects.entities),
    [objects.entities],
  );

  // eslint-disable-next-line
  const [state, setState] = useState(L.get(stateL, {}));

  // eslint-disable-next-line
  const statePos = useMemo(() => posIn(state), [state]);

  // eslint-disable-next-line
  const stateSize = useMemo(() => sizeIn(state), [state]);

  const children = useMemo(
    () =>
      objectList.map((o, i) => (
        <div
          key={o.id}
          id={o.id}
          className="canvas-el__object"
          style={getCanvasObjectStyle(o)}
        >
          <Entity object={o} />
        </div>
      )),
    [objectList],
  );

  // #region Event handlers
  /** @param {MouseEvent} */
  const onMouseDown = e => {
    /** @type {HTMLDivElement} */
    const t = e.target;
    const id = t.getAttribute('id');

    // If we don't have an ID, bail out immediately
    // TODO: This type of handling is probably just relevant when dragging elements
    //       and will require some additional conditions if we're adding a new element
    //       onto the canvas
    if (!id) {
      logger.info('clicked element does not have ID, bailing out');
      return null;
    }

    logger.info('got element with ID `%s`', id);

    const object = objects.entities[id];
    const pos = L.get('pos', object);
    const size = L.get(['entity', 'size'], object);

    setState(
      L.set(
        [
          stateL,
          L.pick({
            action: 'action',
            id: 'id',
            pos: posL,
            size: sizeL,
            origin: 'origin',
          }),
        ],
        { action: Action.DRAG, id, pos, size, origin: pos },
      ),
    );
  };

  /** @param {MouseEvent} e */
  const onMouseMove = e => {
    // eslint-disable-next-line
    const { action, id } = state;

    if (!id) {
      const pos = { x: e.clientX, y: e.clientY };
      setState(L.set(L.props('x', 'y'), pos));
      return;
    }

    const { devicePixelRatio } = window;
    const { movementX: x, movementY: y } = e;
    // const pos = L.get(posL, state);
    // const size = L.get(sizeL, state);

    setState(
      L.modify(
        [stateL, posL],
        Point.add.concat({ x: x / devicePixelRatio, y: y / devicePixelRatio }),
      ),
    );
  };

  const onMouseUp = e => {
    const { id } = state;
    if (!id) {
      logger.info('no current ID, bailing out');
      return;
    }

    update(updateObject({ id, pos: { x: state.x, y: state.y } }));

    setState(L.remove([stateL]));
  };
  // #endregion

  return (
    <>
      <section
        className="canvas-el"
        style={{ width, height }}
        {...{ onMouseDown, onMouseMove, onMouseUp }}
      >
        <pre className="absolute" style={{ left: 400 }}>
          {show(state)}
        </pre>
        <State state={state} />
        {state.action === 'drag' && (
          <Ghost
            pos={{ x: state.x, y: state.y }}
            size={{ width: state.width, height: state.height }}
          />
        )}
        <div className="canvas-el__body">{children}</div>
        <AutosizeUnderlay pos={statePos} />
      </section>
    </>
  );
}

export const AutosizeCanvasElement = withParentSizeModern(CanvasElement);
