import * as R from 'ramda';
import * as L from 'partial.lenses';
import { PowerBars } from './PowerBars';
import { ParentSizeModern } from '@visx/responsive';
import { Details } from 'components';

import { usePowerWithEfficiency } from './hooks';

const color = {
  production: '#10B981',
};

/**
 *
 * @param {Props} props
 * @returns
 */
export function PowerStatus(props) {
  const { entities, efficiency } = props;

  const effByCat = usePowerWithEfficiency();

  // const producers = entities.filter(e => e.module.power > 0);
  // const usage = entities.filter(e => e.module.power < 0);

  // const grouped = R.groupBy(L.get(['module', 'powerType']), producers);

  // const constant = L.collect(['always', L.valueOr([]), L.elems], grouped);
  // const occasional = L.collect(
  //   [L.props('sun', 'wind'), L.values, L.elems],
  //   grouped,
  // );
  // const wind = L.collect(['wind', L.elems], grouped);
  // const sun = L.collect(['sun', L.elems], grouped);
  // const powered = L.collect(['powered', L.valueOr([]), L.elems], grouped);

  // const getSum = L.sum([L.elems, 'module', 'power']);

  // const constantSum = getSum(constant);
  // const occasionalSum = getSum(occasional);
  // const envPowerSum = {
  //   raw: {
  //     wind: getSum(wind),
  //     sun: getSum(sun),
  //   },
  //   adjusted: {
  //     wind: getSum(wind) * efficiency.wind,
  //     sun: getSum(sun) * efficiency.sun,
  //   },
  // };
  // const poweredSum = getSum(powered);

  return (
    <section style={{ width: 300 }}>
      <header className="font-bold px-4 py-2">Power Status</header>

      <div style={{ height: 100 }}>
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
                    raw: effByCat.always.meta.raw,
                    adjusted: effByCat.always.meta.adjusted,
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
