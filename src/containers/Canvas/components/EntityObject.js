import { Group } from '@visx/group';
import { ArrowsExpandIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import './EntityObject.css';
import { GameIcon } from 'components';
import { actions } from 'common/util';

/**
 * @param {Props} props
 */
export function EntityObject(props) {
  const { x, y, width, height, object, module, selected, onSelect } = props;
  const elProps = { width, height };

  const { t } = useTranslation();

  return (
    <Group
      left={x}
      top={y}
      className={cx(
        'entity-object',
        !object.enabled && 'entity-object--disabled',
        selected && 'entity-object--selected',
      )}
    >
      <rect
        {...elProps}
        className="entity-object__shape module-object"
        onClick={actions(onSelect)}
      />

      <rect
        {...elProps}
        fill="url('#lines-diagonal')"
        className="entity-object__disabled-overlay pointer-events-none"
      />

      <foreignObject
        {...{ x: 0, y: 0, width, height }}
        className="entity-object__fo-body"
      >
        <div className="entity-object__fo-body-content">
          <div className="grid grid-cols-2 gap-2">
            <GameIcon name={module.powerType} className="entity-object__icon" />
            {/* <TierIcon tier={module.tier} className="entity-object__icon" /> */}
          </div>

          <div className="w-full px-4 text-center font-bold">
            {t(`game:module.${module.id}`)}
          </div>
        </div>
      </foreignObject>

      <foreignObject className="entity-object__controls handle">
        <span className="entity-object__controls-icon-wrapper" title="Move">
          <ArrowsExpandIcon className="w-full h-full p-1" />
        </span>
      </foreignObject>
    </Group>
  );
}

/**
 * @typedef {object} Props
 * @prop {number} x
 * @prop {number} y
 * @prop {number} width
 * @prop {number} height
 * @prop {IEntity} object
 * @prop {boolean} selected
 * @prop {function} onSelect
 */
