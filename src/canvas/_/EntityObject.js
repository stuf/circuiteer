import * as L from 'partial.lenses';
import { useDispatch, useSelector } from 'react-redux';
import { Group } from '@visx/group';
import cx from 'classnames';

import css from './EntityObject.module.css';
import { selectEntity } from 'state/editor';
import Invalid from './InvalidEntityObject';

function EntityObject(props) {
  const { width, height, left, top, object } = props;
  const update = useDispatch();

  const currentId = useSelector(L.get(['editor', 'current']));
  const isEnabled = L.get(['enabled', L.reread(x => !!x)], object);

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
        <rect
          className={cx(css.rect, 'module-object')}
          {...{ width, height }}
          onClick={() => {
            console.log('onclick', object.id, object);
            update(selectEntity(object.id));
          }}
        />

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

        <text
          x={width / 2}
          y={height / 2}
          className="text-sm font-bold uppercase pointer-events-none"
          style={{ alignmentBaseline: 'middle', textAnchor: 'middle' }}
        >
          {object.module.shortId}
        </text>
      </Group>
    </>
  );
}

EntityObject.Invalid = Invalid;

export default EntityObject;
