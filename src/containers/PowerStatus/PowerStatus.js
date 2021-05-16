import * as L from 'partial.lenses';
import { useMemo } from 'react';

import { Line } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { usePopulatedEntities } from 'common/hooks';

const allConsumers = [L.elems, L.when(x => x.module && x.module.power < 0)];
const allProducers = [L.elems, L.when(x => x.module && x.module.power > 0)];

const powerTotal = [L.elems, L.orElse(L.zero, ['module', 'power'])];
const powerActive = [
  L.elems,
  L.orElse(L.zero, [L.when(x => x.enabled), 'module', 'power']),
];

const allConsumersIn = L.collect(allConsumers);
const allProducersIn = L.collect(allProducers);

export function PowerStatus() {
  const entities = usePopulatedEntities();
  // const entities = useSelector(L.get(['editor', 'entities']));

  const consumers = useMemo(() => allConsumersIn(entities), [entities]);
  const producers = useMemo(() => allProducersIn(entities), [entities]);

  const producersTotal = L.sum(powerTotal, producers);
  const producersActive = L.sum(powerActive, producers);
  const consumersTotal = L.sum(powerTotal, consumers);
  const consumersActive = L.sum(powerActive, consumers);

  // console.log({ consumers, producers });
  // console.log({
  //   producersTotal,
  //   producersActive,
  //   consumersTotal,
  //   consumersActive,
  // });

  const wrapProps = {
    width: 320,
  };

  const svgProps = {
    width: 320,
    height: 30,
  };

  const powerSumTotal = consumersTotal + producersTotal;
  const powerSumActive = consumersActive + producersActive;

  const extentMax = Math.max(
    Math.abs(producersTotal),
    Math.abs(consumersTotal),
  );

  const extentPad = 1.2;
  const extent = [-extentMax * extentPad, extentMax * extentPad];

  const x = scaleLinear({
    domain: extent,
    range: [0, svgProps.width],
    nice: true,
  });

  const xZero = x(0);
  const xTotalSum = x(powerSumTotal);
  const xActiveSum = x(powerSumActive);

  const xActiveUse = x(consumersActive);
  const xTotalUse = x(consumersTotal);
  const xActiveProd = x(producersActive);
  const xTotalProd = x(producersTotal);

  const m = {
    active: { y: 2.5 },
    total: { y: 5 },
  };

  //

  return (
    <>
      <div
        {...wrapProps}
        className="bg-white border-2 transform -translate-x-1/2 rounded-md"
      >
        <svg {...svgProps}>
          <Line
            from={{ x: xZero, y: 0 }}
            to={{ x: xZero, y: svgProps.height }}
            stroke="#000"
          />

          <rect
            x={xActiveUse}
            y={m.active.y}
            width={xZero - xActiveUse}
            height={svgProps.height - m.active.y * 2}
            className="fill-red"
            opacity={0.3}
          />

          <rect
            x={xTotalUse}
            y={m.total.y}
            width={xZero - xTotalUse}
            height={svgProps.height - m.total.y * 2}
            className="fill-red"
            opacity={0.1}
          />

          <Line
            from={{ x: xActiveUse, y: m.active.y }}
            to={{ x: xActiveUse, y: svgProps.height - m.active.y }}
            className="stroke-red stroke-2"
          />

          <Line
            from={{ x: xTotalUse, y: m.total.y }}
            to={{ x: xTotalUse, y: svgProps.height - m.total.y }}
            className="stroke-red stroke-2"
            strokeDasharray="2 2"
          />

          <rect
            x={xZero}
            y={m.active.y}
            width={xActiveProd - xZero}
            height={svgProps.height - m.active.y * 2}
            className="fill-green"
            opacity={0.3}
          />

          <rect
            x={xZero}
            y={m.total.y}
            width={xTotalProd - xZero}
            height={svgProps.height - m.total.y * 2}
            className="fill-green"
            opacity={0.1}
          />
          <Line
            from={{ x: xActiveProd, y: m.active.y }}
            to={{ x: xActiveProd, y: svgProps.height - m.active.y }}
            className="stroke-green stroke-2"
          />

          <Line
            from={{ x: xTotalProd, y: m.total.y }}
            to={{ x: xTotalProd, y: svgProps.height - m.total.y }}
            className="stroke-green stroke-2"
            strokeDasharray="2 2"
          />

          <Line
            from={{ x: xActiveSum, y: m.active.y }}
            to={{ x: xActiveSum, y: svgProps.height - m.active.y }}
            className="stroke-black"
            strokeWidth={2}
          />

          <Line
            from={{ x: xTotalSum, y: m.total.y }}
            to={{ x: xTotalSum, y: svgProps.height - m.total.y }}
            className="stroke-black"
            strokeWidth={2}
          />
        </svg>
      </div>
    </>
  );
}
