import { Group } from '@visx/group';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import './EntityObject.css';
import { GameIcon, Icon } from 'components';
import { actions } from 'common/util';
import { Fragment } from 'react';

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
          <GameIcon name={module.id} className="entity-object__icon" />

          <div className="w-full px-4 text-center font-bold">
            <span className="bg-white shadow-sm">
              {t(`game:module.${module.id}`)
                .split(' ')
                .map((x, xʼ) => (
                  <Fragment key={xʼ}>
                    {x} <wbr />
                  </Fragment>
                ))}
            </span>
          </div>
        </div>
      </foreignObject>

      <foreignObject className="entity-object__handle">
        <div className="h-full w-full flex items-center justify-center">
          <Icon name="drag_indicator" />
        </div>
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
 * @prop {IModule} module
 * @prop {boolean} selected
 * @prop {function} onSelect
 */
