import { PatternLines } from '@visx/pattern';
import { withParentSizeModern } from '@visx/responsive';

export function Underlay(props) {
  const width = props.parentWidth ?? props.width;
  const height = props.parentHeight ?? props.height;

  const margin = 10;

  return (
    <div className="canvas-underlay">
      <svg {...{ width, height }}>
        <PatternLines
          id="grid"
          width={32}
          height={32}
          strokeDasharray="4 2"
          stroke="#fff"
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
        <rect
          x={margin}
          y={margin}
          width={width - margin * 2}
          height={height - margin * 2}
          fill="url(#grid)"
          stroke="#e4eaf6"
          strokeWidth={2}
        />
      </svg>
    </div>
  );
}

export const AutosizeUnderlay = withParentSizeModern(Underlay);
