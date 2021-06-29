import * as L from 'partial.lenses';
import { nanoid } from '@reduxjs/toolkit';
import { useState, useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { withParentSizeModern } from '@visx/responsive';

import { Point } from 'common/algebra';
import { Action } from 'common/constants';
import { posL, sizeL, stateL } from 'common/lens';
import { getLogger } from 'common/logger';
import { getCanvasObjectStyle } from 'common/canvas';
import { useUsageObjectThings } from 'common/hooks/derived';
import { useCanvasState } from 'common/hooks/canvas';

import { AutosizeUnderlay, Entity, Ghost, State } from 'components/canvas';

import { addObject, updateObject, deleteObject } from 'state/objects';
import { setCurrentEntity, clearCurrentEntity, addedNew } from 'state/canvas';
import { useOptionFlags } from 'common/hooks/options';

const logger = getLogger('CanvasElement');

const posIn = L.get(posL);
const sizeIn = L.get(sizeL);
const stateIn = L.get(stateL); // eslint-disable-line

export function CanvasElement(props) {
  const width = props.parentWidth ?? props.width;
  const height = props.parentHeight ?? props.height;
  const update = useDispatch();

  const { flags } = useOptionFlags();
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

  const cs = useCanvasState();
  useEffect(() => {
    if (cs.flags.isAddingNew) {
      const o = cs.adding.entity;
      setState(
        L.set([stateL, L.pick({ action: 'action', size: sizeL })], {
          action: Action.ADD_NEW,
          size: o.size,
        }),
      );
    }

    if (!cs.flags.isAddingNew && state.action === Action.ADD_NEW) {
      setState(L.remove([stateL, L.propsExcept('x', 'y')]));
    }
  }, [cs.flags.isAddingNew, cs.adding?.entity, state.action]);

  const children = useMemo(
    () =>
      objectList.map((o, i) => (
        <div
          key={o.id}
          id={o.id}
          className="canvas-el__object"
          style={getCanvasObjectStyle(o)}
        >
          <Entity object={o} onDelete={() => update(deleteObject(o))} />
        </div>
      )),
    [objectList, update],
  );

  const showGhost = useMemo(
    () => state.action === Action.ADD_NEW || state.action === Action.DRAG,
    [state.action],
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
    if (!id && state.action !== Action.ADD_NEW) {
      logger.info('clicked element does not have ID, bailing out');
      return null;
    }

    if (state.action === Action.ADD_NEW) {
      const o = cs.adding.entity;
      const pos = { x: state.x, y: state.y };
      const newId = nanoid();

      logger.info('add new element at %s, %s', pos.x, pos.y);

      update(setCurrentEntity({ id: newId, entity: o.id }));
      update(addObject({ id: newId, pos, size: o.size, entity: o.id }));
      update(addedNew());
      return;
    }

    logger.info('got element with ID `%s`', id);

    const object = objects.entities[id];
    const pos = L.get('pos', object);
    const size = L.get(['entity', 'size'], object);
    const entity = L.get(['entity', 'id'], object);

    update(setCurrentEntity({ id, entity }));

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

    setState(
      L.modify(
        [stateL, posL],
        Point.add.concat({ x: x / devicePixelRatio, y: y / devicePixelRatio }),
      ),
    );
  };

  const onMouseUp = e => {
    const { id } = state;
    if (!id && state.action === Action.ADD_NEW) return;
    else if (!id) {
      logger.info('no current ID, bailing out');
      return;
    } else {
      update(updateObject({ id, pos: { x: state.x, y: state.y } }));
      update(clearCurrentEntity());

      setState(L.remove([stateL]));
    }
  };
  // #endregion

  return (
    <>
      <section
        className="canvas-el"
        style={{ width, height }}
        {...{ onMouseDown, onMouseMove, onMouseUp }}
      >
        {flags.stateDebug && <State state={state} />}
        {showGhost && (
          <Ghost
            pos={{ x: state.x, y: state.y }}
            size={{ width: state.width, height: state.height }}
            id={cs.adding?.entity?.id}
          />
        )}
        <div className="canvas-el__body">{children}</div>
        <AutosizeUnderlay pos={statePos} size={stateSize} />
      </section>
    </>
  );
}

export const AutosizeCanvasElement = withParentSizeModern(CanvasElement);
