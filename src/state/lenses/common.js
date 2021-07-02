import * as L from 'partial.lenses';

export const sizeL = L.pickIn({
  width: L.valueOr(null),
  height: L.valueOr(null),
});

export const posL = L.pickIn({
  x: L.valueOr(null),
  y: L.valueOr(null),
});
