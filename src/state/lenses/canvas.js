import * as L from 'partial.lenses';

export const stateL = L.pickIn({
  current: L.define(null),
  adding: L.define(null),
  drag: L.define(null),
  external: L.define(null),
  move: L.define(null),
});

export const currentObject = ['current', L.define(null)];
export const addingNewObject = ['adding', L.required(null)];
export const draggedObject = ['drag', L.required(null)];
export const externalObject = ['external', L.required(null)];
