import { useState, useMemo } from 'react';
import { localPoint } from '@visx/event';

const { floor, round } = Math;

export function useSnappingGrid(w, h, rounding = 'round') {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const updatePos = e => setPos(localPoint(e));
  const roundingFn = rounding === 'round' ? round : floor;

  const gridPos = useMemo(
    () => ({ x: roundingFn(pos.x / w), y: roundingFn(pos.y / h) }),
    [pos.x, pos.y, w, h, roundingFn],
  );

  const screenGridPos = useMemo(
    () => ({ x: gridPos.x * w, y: gridPos.y * h }),
    [gridPos.x, gridPos.y, w, h],
  );

  return [{ pos: screenGridPos, gridPos }, updatePos];
}
