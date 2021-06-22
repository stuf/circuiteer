export function CanvasUnderlay(props) {
  const { width, height } = props;

  return (
    <>
      <svg className="canvas-underlay" {...{ width, height }}>
        {/* <rect x={0} y={0} width={width / 2} height={height} fill="#f00" /> */}
      </svg>
    </>
  );
}

export default CanvasUnderlay;
