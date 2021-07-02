import { useMemo } from 'react';
import { Group } from '@visx/group';
import { withParentSizeModern } from '@visx/responsive';

const getCurrentObjectBounds = o => ({
  left: o.pos.x,
  right: o.pos.x + o.entity.size.width,
  top: o.pos.y,
  bottom: o.pos.y + o.entity.size.height,
  xCenter: o.pos.x + o.entity.size.width / 2,
  yCenter: o.pos.y + o.entity.size.height / 2,
  width: o.entity.size.width,
  height: o.entity.size.height,
});

export function GuideLayer(props) {
  const width = props.parentWidth ?? props.width;
  const height = props.parentHeight ?? props.height;

  const { object } = props;

  const hasObject = useMemo(() => !!object?.id, [object?.id]);
  const bounds = useMemo(
    () => (hasObject ? getCurrentObjectBounds(object) : {}),
    [object, hasObject],
  );

  const yFull = { y1: 0, y2: height };
  const xFull = { x1: 0, x2: width };

  let guides;
  if (hasObject) {
    guides = [
      { x1: bounds.left - 0.5, x2: bounds.left - 0.5, ...yFull },
      { x1: bounds.right + 0.5, x2: bounds.right + 0.5, ...yFull },
      { y1: bounds.top - 0.5, y2: bounds.top - 0.5, ...xFull },
      { y1: bounds.bottom + 0.5, y2: bounds.bottom + 0.5, ...xFull },
    ];
  } else {
    guides = [];
  }

  if (!hasObject) return null;

  const ruler = {
    size: 20,
    margin: 8,
  };

  const xRuler = {
    left: bounds.left,
    right: bounds.right,
    top: bounds.top - ruler.size - ruler.margin,
    bottom: bounds.top - ruler.margin,
    center: bounds.xCenter - 0.5,
  };

  const yRuler = {
    left: bounds.left - ruler.size - ruler.margin,
    right: bounds.left - ruler.margin,
    top: bounds.top,
    bottom: bounds.bottom,
    center: bounds.yCenter - 0.5,
  };

  return (
    <div className="guide-layer" style={{ width, height }}>
      <svg {...{ width, height }}>
        <mask id="content">
          <rect
            x={ruler.margin}
            y={ruler.margin}
            width={bounds.width - ruler.margin * 2}
            height={bounds.height - ruler.margin * 2}
            fill="#fff"
          />
        </mask>
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
            className="guide-layer__arrow-marker"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>

        {guides.map((l, i) => (
          <line key={i} {...l} className="guide-layer__guide-line" />
        ))}

        <Group
          top={xRuler.bottom - 0.5}
          left={xRuler.left}
          className="guide-layer__ruler"
        >
          <line
            markerStart="url(#arrow)"
            markerEnd="url(#arrow)"
            x1={0}
            x2={bounds.width}
          />
        </Group>

        {/* Centerlines */}
        <Group
          left={xRuler.center}
          className="guide-layer__guide-line --center"
        >
          <line y1={0} y2={height} />
        </Group>

        <Group top={yRuler.center} className="guide-layer__guide-line --center">
          <line x1={0} x2={width} />
        </Group>

        {/* Rulers */}
        <Group
          top={yRuler.top}
          left={yRuler.right - 0.5}
          className="guide-layer__ruler"
        >
          <line
            markerStart="url(#arrow)"
            markerEnd="url(#arrow)"
            y1={0}
            y2={bounds.height}
          />
        </Group>

        <Group
          left={yRuler.right - ruler.margin}
          top={yRuler.center}
          className="guide-layer__label"
        >
          <g transform="rotate(-90)">
            <text fill="#fff" textAnchor="middle">
              <tspan alignmentBaseline="center">{bounds.height}</tspan>
            </text>
          </g>
        </Group>

        <Group
          left={xRuler.center}
          top={xRuler.bottom - ruler.margin}
          className="guide-layer__label"
        >
          <g>
            <text textAnchor="middle">
              <tspan alignmentBaseline="center">{bounds.width}</tspan>
            </text>
          </g>
        </Group>
      </svg>
    </div>
  );
}

export const AutosizeGuideLayer = withParentSizeModern(GuideLayer);
