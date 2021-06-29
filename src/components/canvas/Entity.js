import { useTranslation } from 'react-i18next';

/**
 * @param {object} props
 * @param {Data.PopulatedCanvasObject} props.object
 */
export function Entity(props) {
  const { t } = useTranslation();
  const { object } = props;

  return (
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
    </div>
  );
}
