import clsx from 'clsx';
import * as P from 'prop-types';
import { Group } from '@visx/group';
import { PatternLines } from '@visx/pattern';
import { withParentSizeModern } from '@visx/responsive';
import { Pattern } from 'common/constants';

export function Underlay(props) {
  const width = props.parentWidth ?? props.width;
  const height = props.parentHeight ?? props.height;
  const pos = props.pos ?? {};

  const { isAddingNew } = props;

  const margin = 20;

  const x = pos.x;
  const y = pos.y;

  const tick = { className: 'stroke-light', strokeWidth: 2 };
  const h1 = height - margin;
  const h2 = height;
  const w1 = width - margin;
  const w2 = width;

  const xTickBase = { x1: x, x2: x, ...tick };
  const xTicks = [
    { ...xTickBase, y1: 0, y2: margin },
    { ...xTickBase, y1: h1, y2: h2 },
  ];

  const yTickBase = { y1: y, y2: y, ...tick };
  const yTicks = [
    { ...yTickBase, x1: 0, x2: margin },
    { ...yTickBase, x1: w1, x2: w2 },
  ];

  const xline = { x1: margin, x2: width - margin };
  const yline = { y1: margin, y2: height - margin };

  const crossBase = {
    className: 'stroke-light',
    strokeDasharray: '2 2',
    strokeWidth: 1,
  };
  const crosshair = [
    { ...crossBase, ...xline, y1: y, y2: y },
    { ...crossBase, ...yline, x1: x, x2: x },
  ];

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
          strokeDasharray="4 4"
          orientation={['horizontal', 'vertical']}
        />
        {xTicks.map((xt, i) => (
          <line key={`x-${i}`} {...xt} />
        ))}
        {yTicks.map((yt, i) => (
          <line key={`y-${i}`} {...yt} />
        ))}
        {crosshair.map((ch, i) => (
          <line key={`ch-${i}`} {...ch} />
        ))}

        <Group left={margin} top={margin}>
          <rect
            width={width - margin * 2}
            height={height - margin * 2}
            fill={`url(#${Pattern.DOTTED_GRID})`}
            stroke="#e4eaf6"
            strokeWidth={2}
          />
        </Group>
      </svg>
    </div>
  );
}

Underlay.propTypes = {
  width: P.number,
  height: P.number,
  pos: P.exact({
    x: P.number,
    y: P.number,
  }),
  isAddingNew: P.bool,
};

export const AutosizeUnderlay = withParentSizeModern(Underlay);

AutosizeUnderlay.propTypes = {
  parentWidth: P.number,
  parentHeight: P.number,
  pos: P.exact({
    x: P.number,
    y: P.number,
  }),
  isAddingNew: P.bool,
};
