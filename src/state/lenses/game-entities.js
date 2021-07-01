import * as L from 'partial.lenses';

export const stateL = L.pickIn({
  entities: L.define([]),
});

export const entitiesL = [
  'entities',
  L.define([]), // This is probably not needed as base case used should enforce this
];
