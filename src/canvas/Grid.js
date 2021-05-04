import { PatternCircles } from '@visx/pattern';

function Grid(props) {
  const { grid = [0, 0], size = [0, 0] } = props;
  const [gw, gh] = grid;
  const [w, h] = size;

  return (
    <>
      <PatternCircles
        id="grid"
        {...{ width: gw, height: gh }}
        stroke="#000"
        fill="none"
        radius={2}
        strokeWidth={2}
      />

      <rect width={w} height={h} fill="url('#grid')" opacity={0.2} />
    </>
  );
}

export default Grid;
