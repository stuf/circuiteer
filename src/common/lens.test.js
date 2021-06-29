import * as L from 'partial.lenses';
import {
  asNormalized,
  canvasObject,
  gameEntities,
  posL,
  sizeL,
  stateL,
} from './lens';

test('asNormalized', () => {
  const r = L.get(asNormalized, {});
  const e = { ids: [], entities: {} };

  expect(r).toEqual(e);
});

test('canvasObject', () => {
  const r = L.get(canvasObject, {});
  const e = {
    pos: { x: 0, y: 0 },
    size: { width: 0, height: 0 },
    entity: 'undefined',
    disabled: false,
    locked: false,
  };

  const r2 = L.get(canvasObject, { asd: true, sdf: false });
  const e2 = { ...e };

  expect(r).toEqual(e);
  expect(r2).toEqual(e2);
});

test('gameEntities', () => {
  const r = L.get(gameEntities, {});
  const e = [];

  expect(r).toEqual(e);
});

test('posL', () => {
  const r = L.get(posL, {});
  const r2 = L.get(posL, { a: 1, x: 2, y: 2 });

  const e = undefined;
  const e2 = { x: 2, y: 2 };

  expect(r).toEqual(e);
  expect(r2).toEqual(e2);
});

test('sizeL', () => {
  const r = L.get(sizeL, {});
  const r2 = L.get(sizeL, { asd: true, width: 1, height: 2 });

  const e = undefined;
  const e2 = { width: 1, height: 2 };

  expect(r).toEqual(e);
  expect(r2).toEqual(e2);
});
