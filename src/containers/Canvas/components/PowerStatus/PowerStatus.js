import * as R from 'ramda';
import * as L from 'partial.lenses';
import { AxisBottom } from '@visx/axis';
import { scaleLinear } from '@visx/scale';
import { PatternLines, PatternCircles } from '@visx/pattern';
import { Fragment } from 'react';

const color = {
  production: '#10B981',
};

const RectOne = ({ x, width, y = 0, height = 32 }) => (
  <rect {...{ x, y, width, height }} fill={color.production} />
);

const RectTwo = ({ x, width, y = 0, height = 32 }) => (
  <>
    <rect {...{ x, y, width, height }} fill={color.production} />
    <rect {...{ x, y, width, height }} fill="url('#dots')" />
  </>
);

const RectThree = ({ x, width, y = 0, height = 32 }) => (
  <>
    <rect {...{ x, y, width, height }} fill={color.production} />
    <rect {...{ x, y, width, height }} fill="url('#lines')" />
  </>
);

/**
 *
 * @param {Props} props
 * @returns
 */
export function PowerStatus(props) {
  const { entities } = props;

  const producers = entities.filter(e => e.module.power > 0);
  const usage = entities.filter(e => e.module.power < 0);

  const grouped = R.groupBy(L.get(['module', 'powerType']), producers);

  const constant = L.collect(['always', L.valueOr([]), L.elems], grouped);
  const occasional = L.collect(
    [L.props('sun', 'wind'), L.values, L.elems],
    grouped,
  );
  const powered = L.collect(['powered', L.valueOr([]), L.elems], grouped);

  const getSum = L.sum([L.elems, 'module', 'power']);

  const constantSum = getSum(constant);
  const occasionalSum = getSum(occasional);
  const poweredSum = getSum(powered);

  const usageSum = getSum(usage);
  const produceSum = constantSum + occasionalSum + poweredSum;

  const scaleMaxima = Math.max(Math.abs(usageSum), produceSum);

  const scaleX = scaleLinear({
    domain: [0, scaleMaxima],
    range: [20, 270],
    nice: true,
  });

  const data = [
    { id: 'constant', value: constantSum, scaled: scaleX(constantSum) },
    { id: 'occasional', value: occasionalSum, scaled: scaleX(occasionalSum) },
    { id: 'powered', value: poweredSum, scaled: scaleX(poweredSum) },
  ];

  const dataStyles = [RectOne, RectTwo, RectThree];

  const dataX_ = data.reduce((xs, it) => {
    console.log({ xs, it });
    if (!xs.length) {
      return [{ x: scaleX(0), width: it.scaled }];
    }

    const { x, width } = R.last(xs);
    console.log({ x, width, it });

    return [...xs, { x: width + x, width: it.scaled }];
  }, []);

  const combined = R.zip(dataX_, dataStyles);
  console.log({ combined });

  return (
    <section className="absolute left-1 top-1 bg-white border-2 z-10 px-4 py-2 rounded-md space-y-2 shadow-md">
      <header className="font-bold">Power Status</header>

      <svg {...{ width: 300, height: 64 }}>
        <AxisBottom scale={scaleX} top={40} labelClassName={'font-mono'} />

        <PatternCircles
          id="dots"
          {...{ width: 8, height: 8 }}
          radius={1}
          complement
          fill="#fff"
        />
        <PatternLines
          id="lines"
          {...{ width: 8, height: 8 }}
          stroke="#fff"
          strokeWidth={3}
          orientation={['diagonal']}
        />

        {combined.map(([it, Comp], i) => (
          <Fragment key={i}>
            <Comp {...it} />
          </Fragment>
        ))}
      </svg>
    </section>
  );
}

/**
 * @typedef {object} Props
 * @prop {IPopulatedEntity[]} entities
 */
