import { getCanvasObjectStyle } from './canvas';

test('getCanvasObjectStyle', () => {
  const o = {
    pos: { x: 12, y: 12 },
    entity: {
      size: { width: 100, height: 100 },
    },
  };

  const r = getCanvasObjectStyle(o);
  const e = {
    width: 100,
    height: 100,
    transform: 'translateX(12px) translateY(12px)',
  };

  expect(r).toEqual(e);
});
