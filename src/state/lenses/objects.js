import * as L from 'partial.lenses';

export const stateL = L.pickIn({
  entities: L.define([]),
});

export const objectL = L.pickIn({
  id: [],
  pos: [],
  size: [],
  entity: [],
  disabled: L.define(false),
  locked: L.define(false),
});

export const findObjectL = id => [
  'entities',
  L.define([]),
  L.find(o => o.id === id),
];
