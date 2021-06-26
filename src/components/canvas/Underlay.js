import clsx from 'clsx';
import { useState } from 'react';
import { localPoint } from '@visx/event';
import { Group } from '@visx/group';
import { PatternLines } from '@visx/pattern';
import { withParentSizeModern } from '@visx/responsive';
import { clamp } from 'common/util';

export function Underlay(props) {
  const width = props.parentWidth ?? props.width;
  const height = props.parentHeight ?? props.height;
  const pos = props.pos ?? {};

  const { isAddingNew } = props;

  const margin = 20;

  const x = pos.x;
  const y = pos.y;

  const tick = { className: 'stroke-light', strokeWidth: 2 };
  const ext = { strokeDasharray: '2 2', strokeWidth: 1 };
  const xPosTick = { x1: x, x2: x, y1: 0, y2: margin, ...tick };
  const yPosTick = { x1: 0, x2: margin, y1: y, y2: y, ...tick };
  const xPosTickExt = { ...xPosTick, ...ext, y1: margin, y2: y };
  const yPosTickExt = { ...yPosTick, ...ext, x1: margin, x2: x };

  const ext1 = {
    x1: x,
    x2: x,
    y1: margin,
    y2: margin * 2,
    strokeWidth: 1,
    className: 'stroke-light',
  };

  return (
    <div
      className={clsx(
        'canvas-underlay',
        isAddingNew && 'canvas-underlay--adding-new',
      )}
    >
      <svg {...{ width, height }}>
        <PatternLines
          id="grid"
          width={32}
          height={32}
          strokeDasharray="4 2"
          orientation={['horizontal', 'vertical']}
        />
        <line {...xPosTick} />
        <line {...yPosTick} />
        <line {...xPosTickExt} />
        <line {...yPosTickExt} />

        {/* <text
          fill="none"
          stroke="#fff"
          x={24}
          y={64}
          strokeDasharray="4 3"
          style={{ fontSize: 64 }}
        >
          <tspan alignmentBaseline="text-bottom">Circuiteer</tspan>
          <tspan
            alignmentBaseline="central"
            stroke="none"
            fill="#fff"
            style={{ fontSize: 24 }}
          >
            Beta
          </tspan>
        </text> */}
        <Group left={margin} top={margin}>
          <rect
            width={width - margin * 2}
            height={height - margin * 2}
            fill="url(#grid)"
            stroke="#e4eaf6"
            strokeWidth={2}
          />
        </Group>
      </svg>
    </div>
  );
}

export const AutosizeUnderlay = withParentSizeModern(Underlay);
