import { useTranslation } from 'react-i18next';

import { Delete } from 'components/icon';

/**
 * @param {object} props
 * @param {Data.PopulatedCanvasObject} props.object
 */
export function Entity(props) {
  const { t } = useTranslation();
  const { object, onDelete } = props;

  return (
    <>
      <svg
        width={object.entity.width}
        height={object.entity.height}
        className="absolute"
      >
        <rect x={0} y={0} fill="url(#diagonal)" />
      </svg>
      <div className="entity">
        <div className="entity__label">
          {t(`game:entity.${object.entity?.id}`)}
        </div>
        <div className="entity__stats">
          {t('ui:unit.perSec', { value: object.entity?.power })}
        </div>
        <div className="entity__power-type">
          {t(`ui:powerType.${object.entity?.powerType}`)}
        </div>
        <div className="entity__controls">
          <button className="button button--small" onClick={onDelete}>
            {t('ui:delete')}
          </button>
        </div>
      </div>
    </>
  );
}
