import * as P from 'prop-types';
import { Fragment } from 'react';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { AxisBottom } from '@visx/axis';
import { GridColumns } from '@visx/grid';

import { LabeledPowerBar } from './PowerBar';

const defaults = {
  margin: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
};

export function PowerBars(props) {
  const {
    width,
    height,
    bars,
    padX = 1.05,
    showAxis,
    showGrid,
    contentClassName,
    margin = defaults.margin,
    as,
    wrapperProps,
  } = props;

  const Wrapper = as;

  const { left: ml, top: mt, right: mr, bottom: mb } = margin;

  const vals = bars.map(it => Math.max(it.raw, it.adjusted));
  const valMax = Math.max(...vals);

  // X axis

  const scale = scaleLinear({
    domain: [0, valMax * padX],
    range: [ml, width - ml - mr],
  });

  // Y axis

  const domain = bars.map(it => it.label);

  const band = scaleBand({
    domain,
    range: [mt, height - mt - mb],
    padding: 0.4,
  });

  //

  const powerBarProps = it => ({
    ...it,
    top: band(it.label),
    left: ml,
    height: band.bandwidth(),
    scale,
  });

  //

  return (
    <Wrapper {...wrapperProps}>
      {showGrid && <GridColumns height={height} scale={scale} />}
      {showAxis && <AxisBottom scale={scale} top={height - mb} />}

      <Group className={contentClassName}>
        {bars.map((it, ix) => (
          <LabeledPowerBar key={ix} {...powerBarProps(it)} />
        ))}
      </Group>
    </Wrapper>
  );
}

PowerBars.propTypes = {
  as: P.oneOfType([P.node, P.elementType, P.string]),
  barHeight: P.number,
  bars: P.arrayOf(
    P.shape({
      label: P.string.isRequired,
      raw: P.number.isRequired,
      adjusted: P.number.isRequired,
    }),
  ),
  showAxis: P.bool,
  showGrid: P.bool,
  wrapperProps: P.object,
};

PowerBars.defaultProps = {
  as: Fragment,
  gap: 10,
  showAxis: true,
  showGrid: true,
  wrapperProps: {},
};
