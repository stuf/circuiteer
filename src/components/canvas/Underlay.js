import clsx from 'clsx';
import { Group } from '@visx/group';
import { PatternLines } from '@visx/pattern';
import { withParentSizeModern } from '@visx/responsive';

export function Underlay(props) {
  const width = props.parentWidth ?? props.width;
  const height = props.parentHeight ?? props.height;
  const { isAddingNew } = props;

  const margin = 20;

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
