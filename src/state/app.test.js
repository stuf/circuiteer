import * as L from 'partial.lenses';
import reducer, { setGridSize, toggleMenu } from './app';
import { stateL } from './lenses/app';

test('identity', () => {
  const a = { type: 'asd' };
  const r = reducer({}, a);
  const e = L.get(stateL, {
    grid: {
      size: {
        width: null,
        height: null,
      },
    },
  });

  expect(r).toEqual(e);
});

describe('actions', () => {
  test('toggleMenu', () => {
    const a = toggleMenu();
    const r = reducer({}, a);
    const e = L.get(stateL, { menu: { visible: true } });

    expect(r).toEqual(e);
  });

  test('setGridSize', () => {
    const a = setGridSize({ width: 1, height: 1 });
    const r = reducer({}, a);
    const e = L.get(stateL, { grid: { size: { width: 1, height: 1 } } });

    expect(r).toEqual(e);
  });
});
