import { Group } from '@visx/group';
import { Line } from '@visx/shape';

function Crosshair({ grid, parent }) {
  return (
    <Group className="pointer-events-none">
      <Line
        from={{ x: grid.pos.x, y: 0 }}
        to={{ x: grid.pos.x, y: parent.height }}
        className="stroke-black"
      />

      <Line
        from={{ x: 0, y: grid.pos.y }}
        to={{ x: parent.width, y: grid.pos.y }}
        className="stroke-black"
      />
    </Group>
  );
}

export default Crosshair;
