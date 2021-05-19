import * as R from 'ramda';
import * as L from 'partial.lenses';
import { PowerBars } from './PowerBars';
import { ParentSizeModern } from '@visx/responsive';
import { Icon, Details } from 'components';

import { usePowerWithEfficiency } from './hooks';

const color = {
  production: '#10B981',
};

/**
 *
 * @param {Props} props
 * @returns
 */
export function PowerStatus() {
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
      <header className="font-bold px-4 pt-2 py-1 border-b-2 relative overflow-hidden flex items-center justify-between">
        <div className="">Power Status</div>
        {/* <div className="absolute inset-y-0 right-2 flex items-center">
          <Icon name="unfold_more" className="w-5 h-5" />
        </div> */}
        <div className="font-normal text-xs">
          raw {rawSum}U/s / adjusted {adjustedSum}U/s
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
                    label: 'Constant',
                    ...effByCat.always.meta,
                  },
                  {
                    label: 'Wind',
                    ...effByCat.wind.meta,
                  },
                  {
                    label: 'Solar',
                    ...effByCat.sun.meta,
                  },
                  {
                    label: 'Powered',
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
