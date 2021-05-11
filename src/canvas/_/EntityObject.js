import * as L from 'partial.lenses';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Group } from '@visx/group';
import cx from 'classnames';

import { selectEntity } from 'state/editor';
import TierIcon from '_/TierIcon';
import Invalid from './InvalidEntityObject';
import css from './EntityObject.module.css';

function EntityObject(props) {
  const {
    width,
    height,
    left,
    top,
    object,
    onMoveStart,
    onMoveStop,
    onMove,
  } = props;
  const update = useDispatch();
  const [state, setState] = useState({ dragging: false, pos: [0, 0] });

  const currentId = useSelector(L.get(['editor', 'current']));
  const isEnabled = L.get(['enabled', L.reread(x => !!x)], object);

  const _onMoveStart = e => {
    console.log('entity', object.id, 'move start');
    setState(s => ({ ...s, dragging: true }));
    onMoveStart(e);
  };

  const _onMoveStop = e => {
    setState(s => ({ ...s, dragging: false }));
    console.log('ON MOVE STOP', object.id);
    onMoveStop(e);
  };

  const _onMove = e => {
    if (state.dragging) {
      onMove(e);
    }
  };

  return (
    <>
      <Group
        {...{ left, top }}
        className={cx(
          css.root,
          !isEnabled && css.rootDisabled,
          currentId === object.id && css.selected,
        )}
      >
        {/* The main touch target for entities on canvas */}
        <rect
          className={cx(css.rect, 'module-object')}
          {...{ width, height }}
          onClick={e => {
            e.stopPropagation();
            // console.log('onclick', object.id, object);
            update(selectEntity(object.id));
          }}
          onMouseMove={_onMove}
          onMouseDown={_onMoveStart}
          onMouseUp={_onMoveStop}
        />

        <Group className="pointer-events-none">
          {!isEnabled && (
            <rect
              {...{ width, height }}
              fill="url('#diagonal')"
              className={cx(
                css.disabledOverlay,
                'pointer-events-none',
                'module-object',
              )}
            />
          )}

          <foreignObject {...{ x: 0, y: 0, width, height }}>
            <div className="pointer-events-none h-full w-full flex flex-col items-center text-xs space-y-2 justify-center">
              <div>
                <TierIcon
                  tier={object.module.tier}
                  className="w-8 h-8 rounded-lg border-2"
                />
              </div>

              <div className="w-full px-4 py-2 text-center">
                {object.module.name}
              </div>
            </div>
          </foreignObject>
        </Group>
      </Group>
    </>
  );
}

EntityObject.Invalid = Invalid;

export default EntityObject;
