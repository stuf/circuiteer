import * as L from 'partial.lenses';
import { ParentSizeModern } from '@visx/responsive';
import { useTranslation } from 'react-i18next';

import { Icon } from 'components';
import { PowerBars } from './PowerBars';
import { usePowerWithEfficiency } from './hooks';

import './PowerStatus.css';

/**
 *
 * @param {Props} props
 * @returns
 */
export function PowerStatus() {
  const { t } = useTranslation();
  const effByCat = usePowerWithEfficiency();

  const rawSum = L.sum([L.values, 'meta', 'raw'], effByCat);
  const adjustedSum = L.sum([L.values, 'meta', 'adjusted'], effByCat);

  return (
    <section
      className={`
        absolute right-2 bottom-2 z-10
        border-2
        rounded-md
        shadow-md
        bg-white
      `}
    >
      <header className="font-bold px-4 py-2 border-b-2 relative overflow-hidden flex items-center justify-between">
        <div>{t('ui:section.powerStatus.title')}</div>
        <div className="font-normal text-xs flex space-x-2">
          <div className="flex items-center space-x-1">
            <Icon name="error_outline" size={16} />
            <div>{rawSum}U/s</div>
          </div>

          <div className="flex items-center space-x-1">
            <Icon name="error" size={16} />
            <div>{adjustedSum}U/s</div>
          </div>
        </div>
      </header>

      <div style={{ height: 250, width: 300 }} className="px-4 py-2 pt-1">
        <ParentSizeModern>
          {({ width, height }) => (
            <svg width={width} height={height}>
              <PowerBars
                margin={{ left: 0, bottom: 20, top: 0, right: 0 }}
                width={width}
                height={height}
                contentClassName="text-xs"
                bars={[
                  {
                    label: t('game:powerType.always'),
                    ...effByCat.always.meta,
                  },
                  {
                    label: t('game:powerType.wind'),
                    ...effByCat.wind.meta,
                  },
                  {
                    label: t('game:powerType.sun'),
                    ...effByCat.sun.meta,
                  },
                  {
                    label: t('game:powerType.powered'),
                    ...effByCat.powered.meta,
                  },
                ]}
              />
            </svg>
          )}
        </ParentSizeModern>
      </div>
    </section>
  );
}

/**
 * @typedef {object} Props
 * @prop {IPopulatedEntity[]} entities
 */
