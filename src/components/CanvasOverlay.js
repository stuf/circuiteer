export function CanvasOverlay(props) {
  const { width, height } = props;

  const wh = width / 2;
  const hh = height / 2;

  const crossline = {
    stroke: '#00f',
    strokeWidth: 1,
    strokeDasharray: '5 5',
  };

  const centerOffset = 10;
  const centerArrowLength = 20;
  const centerline = {
    stroke: '#000',
    markerEnd: 'url(#arrowhead)',
  };

  return (
    <>
      <svg className="canvas-overlay" {...{ width, height }}>
        <defs>
          <marker
            id="arrowhead"
            markerWidth={10}
            markerHeight={7}
            refX={0}
            refY={3.5}
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" />
          </marker>
        </defs>

        <line x1={wh} x2={wh} y1={0} y2={height} {...crossline} />
        <line x1={0} x2={width} y1={hh} y2={hh} {...crossline} />

        <line
          x1={wh - centerOffset}
          x2={wh - centerArrowLength - centerOffset}
          y1={hh - centerOffset}
          y2={hh - centerArrowLength - centerOffset}
          {...centerline}
        />

        <line />
      </svg>
    </>
  );
}

export default CanvasOverlay;
