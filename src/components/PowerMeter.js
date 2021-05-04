import React, { useContext } from 'react';
import { ParentSizeModern as ParentSize } from '@visx/responsive';
import { AxisBottom } from '@visx/axis';
import { scaleLinear } from '@visx/scale';
import { Polygon } from '@visx/shape';
import { interpolateRdYlGn } from 'd3-scale-chromatic';
import * as L from 'partial.lenses';

import { State } from '../state_';
import css from './PowerMeter.module.css';

const defaultMargin = {
  left: 0,
  top: 5,
  right: 0,
  bottom: 25,
};

function PowerMeter({ margin = defaultMargin }) {
  const { state } = useContext(State);

  const modules = state.entities.map(it => state.modules[it.type]);

  const powerState = L.collect([L.elems, 'power'], modules);
  const usage = L.sum([L.elems, L.when(x => x < 0)], powerState);
  const production = L.sum([L.elems, L.when(x => x > 0)], powerState);
  const sum = L.sum(L.elems, powerState);

  const powerMax = Math.max(Math.abs(production), Math.abs(usage));
  const powerMin = -powerMax;

  const offsetColor = scaleLinear({
    domain: [powerMin, powerMax],
    range: [0, 1],
  });

  return (
    <div className={css.root}>
      <ParentSize>
        {({ width, height }) => {
          const powerOffset = scaleLinear({
            domain: [powerMin, powerMax],
            range: [0 + margin.left, width - margin.right],
          });

          const xOffset = powerOffset(sum);
          const xMid = powerOffset(0);

          return (
            <>
              <svg width={width} height={height}>
                <rect width={width} height={height} stroke="#000" fill="#fff" />

                {/* Draw how much power we're using vs. producing */}
                <Polygon
                  points={[
                    [powerOffset(0), margin.top ?? 0],
                    [powerOffset(sum), margin.top ?? 0],
                    [powerOffset(sum), height - margin.bottom],
                    [powerOffset(0), height - margin.bottom],
                  ]}
                  fill={interpolateRdYlGn(offsetColor(sum))}
                />

                <text
                  x={xOffset}
                  y={(height - margin.top - margin.bottom) / 2}
                  dx={xOffset < xMid ? 10 : -10}
                  dy={margin.top}
                  style={{
                    alignmentBaseline: 'middle',
                    textAnchor: xOffset < xMid ? 'end' : 'start',
                  }}
                  className="text-xs"
                >
                  {sum}
                </text>

                <line
                  x1={powerOffset(0)}
                  y1={0}
                  x2={powerOffset(0)}
                  y2={height - margin.bottom}
                  stroke="#f00"
                />

                <AxisBottom scale={powerOffset} top={height - margin.bottom} />
              </svg>
            </>
          );
        }}
      </ParentSize>
    </div>
  );
}

export default PowerMeter;
