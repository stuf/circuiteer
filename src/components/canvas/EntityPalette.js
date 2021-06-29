import * as R from 'ramda';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addingNew } from 'state/canvas';

import { Tier } from 'common/constants';
import { actions } from 'common/util';

/**
 *
 * @param {React.DragEvent<HTMLDivElement>} e
 * @param {Data.GameEntityObject} o
 */
// eslint-disable-next-line
const onDragStart = (e, o, fn) => {
  e.dataTransfer.setData('application/json', JSON.stringify(o));
  e.dataTransfer.dropEffect = 'copy';
  fn(o);
};

/**
 *
 * @param {import('components/canvas/EntityPalette').Props} props
 * @returns
 */
export function EntityPalette(props) {
  const { t } = useTranslation();
  const { gameObjects } = props;

  const update = useDispatch();
  const objects = Object.values(gameObjects.entities);

  const uneven = objects.length % 2 === 1;

  return (
    <div className={clsx('entity-palette')}>
      <header className="entity-palette__head">
        {t('ui:entityPalette.title')}
      </header>

      <div
        className={clsx(
          'entity-palette__list',
          props.isAdding && 'entity-palette--adding-new',
        )}
      >
        {objects.map((o, i) => (
          <div
            key={i}
            className="entity-palette__list-item"
            onClick={actions(R.compose(update, addingNew, R.always(o)))}
          >
            <div className="nowrap">{t(`game:entity.${o.id}`)}</div>
            <div className="entity-palette__list-item-stats">
              <span>{o.power}</span>
              <span>{t(`game:tier.${Tier[o.tier]}`)}</span>
            </div>
          </div>
        ))}
        {uneven && <div className="entity-palette__list-item" />}
      </div>
    </div>
  );
}
