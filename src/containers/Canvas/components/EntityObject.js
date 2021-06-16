import * as P from 'prop-types';
import { Group } from '@visx/group';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import './EntityObject.css';
import { actions } from 'common/util';
import { Fragment } from 'react';
import { Icon } from 'components';

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
          {/* <GameIcon name={module.id} className="entity-object__icon" /> */}

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

          <div className="absolute right-2 bottom-2">
            <span
              className={`
              inline-block px-1 text-white font-bold shadow
              ${module.power < 0 ? 'bg-red-500' : 'bg-green-500'}
            `}
            >
              {module.power}
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

EntityObject.propTypes = {
  x: P.number,
  y: P.number,
  width: P.number,
  height: P.number,
  object: P.object,
  module: P.object,
  selected: P.bool,
  onSelect: P.func,
  onDelete: P.func,
};

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
