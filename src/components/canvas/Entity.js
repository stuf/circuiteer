import clsx from 'clsx';

import { actions } from 'common/util';

/**
 * @param {object} props
 * @param {Data.PopulatedCanvasObject} props.object
 * @param {Object.<string, Function>} props.entityActions
 * @returns
 */
export function Entity(props) {
  const { object, actions: entityActions } = props;

  const cns = {
    locked: ['button', object.locked && 'button--pressed'],
    disabled: ['button', object.disabled && 'button--pressed'],
  };

  return (
    <div className="entity">
      <div className="entity__label">{object.entity?.id}</div>
      <div className="entity__stats">{object.entity?.power} U/s</div>
      <div className="entity__power-type">{object.entity?.powerType}</div>
      <div className="entity__toggles">
        <button
          className={clsx(cns.disabled)}
          onClick={actions(entityActions?.toggleObjectDisabled)}
        >
          D
        </button>
        <button
          className={clsx(cns.locked)}
          onClick={actions(entityActions?.toggleObjectLock)}
        >
          L
        </button>
      </div>
    </div>
  );
}
